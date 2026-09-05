/* =====================================================================
   PAINEL RESTRITO DE AVISOS — CEIAS
   ---------------------------------------------------------------------
   Publica avisos em assets/data/avisos.json diretamente no repositório
   do site usando a API do GitHub. Só funciona para quem tem permissão
   de escrita no repositório (o criador do projeto e as pessoas que ele
   adicionar como colaboradoras, por exemplo a secretaria).
   Nenhuma senha é guardada no site: o acesso é feito com um token pessoal
   do GitHub, validado a cada uso.
   ===================================================================== */
(function () {
  "use strict";
  const CONFIG = window.CEIAS_CONFIG || {};
  const ADMIN = CONFIG.admin || {};
  const ICONS = window.CEIAS_ICONS || {};
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const API = "https://api.github.com";
  const CATS = { geral: "Geral", secretaria: "Secretaria", jogos: "Jogos escolares", festa: "Festas e eventos", "data-importante": "Data importante", pedagogico: "Pedagógico" };
  const PRIOS = { normal: "Normal", importante: "Importante", urgente: "Urgente" };
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const today = () => new Date().toISOString().slice(0, 10);
  const fmt = d => d ? d.split("-").reverse().join("/") : "—";
  const slug = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
  const b64encode = str => btoa(unescape(encodeURIComponent(str)));
  const b64decode = str => decodeURIComponent(escape(atob(str.replace(/\n/g, ""))));

  const state = { token: null, user: null, branch: ADMIN.branch || "main", sha: null, data: { updatedAt: "", items: [] }, editing: null };

  const store = {
    get() { try { return sessionStorage.getItem("ceias-admin-token") || localStorage.getItem("ceias-admin-token"); } catch (e) { return null; } },
    set(t, persist) { try { (persist ? localStorage : sessionStorage).setItem("ceias-admin-token", t); } catch (e) {} },
    clear() { try { sessionStorage.removeItem("ceias-admin-token"); localStorage.removeItem("ceias-admin-token"); } catch (e) {} },
  };

  async function gh(path, opts = {}) {
    const r = await fetch(API + path, { ...opts, headers: { Accept: "application/vnd.github+json", Authorization: "Bearer " + state.token, "X-GitHub-Api-Version": "2022-11-28", ...(opts.headers || {}) } });
    if (!r.ok) { const t = await r.text().catch(() => ""); const err = new Error(`${r.status} ${r.statusText} ${t.slice(0, 200)}`); err.status = r.status; throw err; }
    return r.status === 204 ? null : r.json();
  }

  function setStatus(msg, type) { const el = $("#adminStatus"); if (!el) return; el.className = "form-status admin__status " + (type === "error" ? "is-error" : "is-success"); el.textContent = msg; }

  /* ---------------- Login ---------------- */
  async function login(token, persist) {
    state.token = token.trim();
    const btn = $("#loginBtn"); btn.disabled = true; btn.textContent = "Verificando…";
    try {
      const user = await gh("/user");
      const repo = await gh(`/repos/${ADMIN.owner}/${ADMIN.repo}`);
      if (!repo.permissions || !repo.permissions.push) throw new Error("Este usuário não tem permissão de escrita no repositório do site. Peça ao criador do projeto para adicioná-lo como colaborador.");
      state.user = user;
      store.set(state.token, persist);
      await loadData();
      await loadGallery();
      showPanel();
    } catch (e) {
      state.token = null; store.clear();
      const el = $("#loginError"); el.textContent = e.status === 401 ? "Token inválido ou expirado." : e.message; el.style.display = "block";
    } finally { btn.disabled = false; btn.textContent = "Entrar no painel"; }
  }
  function logout() { store.clear(); state.token = null; state.user = null; location.reload(); }

  /* ---------------- Dados ---------------- */
  async function loadData() {
    try {
      const f = await gh(`/repos/${ADMIN.owner}/${ADMIN.repo}/contents/${ADMIN.file}?ref=${encodeURIComponent(state.branch)}`);
      state.sha = f.sha;
      state.data = JSON.parse(b64decode(f.content));
      if (!Array.isArray(state.data.items)) state.data.items = [];
    } catch (e) {
      if (e.status === 404) { state.sha = null; state.data = { updatedAt: today(), items: [] }; }
      else throw e;
    }
  }
  async function saveData(message) {
    state.data.updatedAt = today();
    const body = { message, content: b64encode(JSON.stringify(state.data, null, 2) + "\n"), branch: state.branch };
    if (state.sha) body.sha = state.sha;
    try {
      const r = await gh(`/repos/${ADMIN.owner}/${ADMIN.repo}/contents/${ADMIN.file}`, { method: "PUT", body: JSON.stringify(body) });
      state.sha = r.content.sha;
      return true;
    } catch (e) {
      if (e.status === 409 || e.status === 422) { // conflito: alguém publicou antes — recarrega e tenta de novo
        const mine = state.data.items;
        await loadData();
        const ids = new Set(state.data.items.map(i => i.id));
        mine.forEach(i => { if (!ids.has(i.id)) state.data.items.push(i); else state.data.items[state.data.items.findIndex(x => x.id === i.id)] = i; });
        const r = await gh(`/repos/${ADMIN.owner}/${ADMIN.repo}/contents/${ADMIN.file}`, { method: "PUT", body: JSON.stringify({ ...body, sha: state.sha, content: b64encode(JSON.stringify(state.data, null, 2) + "\n") }) });
        state.sha = r.content.sha;
        return true;
      }
      throw e;
    }
  }

  /* ---------------- Painel ---------------- */
  function showPanel() {
    $("#adminLogin").hidden = true;
    const panel = $("#adminPanel"); panel.hidden = false;
    $("#adminUser").innerHTML = `<img src="${state.user.avatar_url}" alt=""><span>${esc(state.user.name || state.user.login)}<br><small>${esc(ADMIN.owner)}/${esc(ADMIN.repo)} · ${esc(state.branch)}</small></span>`;
    renderList();
    resetForm();
    renderGallery();
    const pf = $("#photoForm"); if (pf) pf.elements.date.value = today();
  }

  function renderList() {
    const list = $("#adminList");
    const items = [...state.data.items].sort((a, b) => (b.pinned - a.pinned) || b.date.localeCompare(a.date));
    $("#adminCount").textContent = `${items.length} aviso${items.length === 1 ? "" : "s"} · ${items.filter(i => i.published).length} publicado(s)`;
    list.innerHTML = items.length ? items.map(i => `
      <article class="admin-item admin-item--${i.priority}${i.published ? "" : " admin-item--draft"}">
        <div>
          <div class="card__meta"><span class="tag tag--${i.category}">${esc(CATS[i.category] || i.category)}</span><span class="tag ${i.priority === "urgente" ? "tag--red" : i.priority === "importante" ? "tag--gold" : ""}">${esc(PRIOS[i.priority] || i.priority)}</span>${i.pinned ? '<span class="tag tag--gold">★ Fixado</span>' : ""}${i.ticker ? '<span class="tag">Ticker</span>' : ""}${i.published ? "" : '<span class="tag tag--red">Rascunho</span>'}</div>
          <h3>${esc(i.title)}</h3>
          <p>${esc(i.text).slice(0, 140)}${i.text.length > 140 ? "…" : ""}</p>
          <p style="margin-top:.3rem">Publicado em ${fmt(i.date)}${i.eventDate ? " · Data: " + fmt(i.eventDate) : ""}${i.expires ? " · Expira em " + fmt(i.expires) : ""} · ${esc(i.author || "")}</p>
        </div>
        <div class="admin-item__actions">
          <button type="button" class="btn btn--outline btn--sm" data-edit="${i.id}">Editar</button>
          <button type="button" class="btn btn--outline btn--sm" data-toggle="${i.id}">${i.published ? "Ocultar" : "Publicar"}</button>
          <button type="button" class="btn btn--sm" style="background:var(--red-100);color:var(--red-700)" data-del="${i.id}">Excluir</button>
        </div>
      </article>`).join("") : `<div class="empty-state">Nenhum aviso cadastrado ainda. Use o formulário ao lado para criar o primeiro.</div>`;
  }

  function resetForm(item) {
    const f = $("#avisoForm");
    f.reset();
    state.editing = item ? item.id : null;
    $("#formTitle").textContent = item ? "Editar aviso" : "Novo aviso";
    f.elements.title.value = item ? item.title : "";
    f.elements.text.value = item ? item.text : "";
    f.elements.category.value = item ? item.category : "geral";
    f.elements.priority.value = item ? item.priority : "normal";
    f.elements.date.value = item ? item.date : today();
    f.elements.eventDate.value = item ? item.eventDate || "" : "";
    f.elements.expires.value = item ? item.expires || "" : "";
    f.elements.author.value = item ? item.author || "" : "Secretaria";
    f.elements.pinned.checked = item ? !!item.pinned : false;
    f.elements.ticker.checked = item ? !!item.ticker : true;
    f.elements.published.checked = item ? !!item.published : true;
    $("#cancelEdit").hidden = !item;
    if (item) f.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submitForm(e) {
    e.preventDefault();
    const f = e.target;
    const item = {
      id: state.editing || (slug(f.elements.title.value) + "-" + Date.now().toString(36)),
      title: f.elements.title.value.trim(),
      text: f.elements.text.value.trim(),
      category: f.elements.category.value,
      priority: f.elements.priority.value,
      date: f.elements.date.value || today(),
      eventDate: f.elements.eventDate.value || "",
      expires: f.elements.expires.value || "",
      pinned: f.elements.pinned.checked,
      ticker: f.elements.ticker.checked,
      published: f.elements.published.checked,
      author: f.elements.author.value.trim() || (state.user.name || state.user.login),
    };
    if (item.title.length < 4 || item.text.length < 10) { setStatus("Informe um título e uma mensagem mais completos.", "error"); return; }
    const idx = state.data.items.findIndex(x => x.id === item.id);
    if (idx >= 0) state.data.items[idx] = item; else state.data.items.unshift(item);
    await publish(`${idx >= 0 ? "Atualiza" : "Novo"} aviso: ${item.title}`);
    resetForm();
  }

  async function publish(message) {
    const btn = $("#saveBtn"); btn.disabled = true; const old = btn.textContent; btn.textContent = "Publicando…";
    setStatus("Enviando para o site…");
    try {
      await saveData(`[avisos] ${message} (por ${state.user.login})`);
      renderList();
      setStatus("Publicado! O site é atualizado em até 1–2 minutos (tempo de publicação do GitHub Pages).");
    } catch (e) {
      setStatus("Não foi possível publicar: " + e.message, "error");
    } finally { btn.disabled = false; btn.textContent = old; }
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(state.data, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "avisos-backup.json"; a.click();
  }

  /* ---------------- Fotos (galeria) ---------------- */
  const GAL_FILE = "assets/data/galeria.json", GAL_DIR = "assets/images/galeria";
  const GAL_CATS = { esportes: "Esportes / Jogos Escolares", eventos: "Eventos", alunos: "Alunos", projetos: "Projetos", cultura: "Cultura", colegio: "Colégio", professores: "Professores" };
  const gal = { sha: null, data: { updatedAt: "", items: [] } };
  async function loadGallery() {
    try { const f = await gh(`/repos/${ADMIN.owner}/${ADMIN.repo}/contents/${GAL_FILE}?ref=${encodeURIComponent(state.branch)}`); gal.sha = f.sha; gal.data = JSON.parse(b64decode(f.content)); if (!Array.isArray(gal.data.items)) gal.data.items = []; }
    catch (e) { if (e.status === 404) { gal.sha = null; gal.data = { updatedAt: today(), items: [] }; } else throw e; }
  }
  async function saveGallery(message) {
    gal.data.updatedAt = today();
    const body = { message: `[galeria] ${message} (por ${state.user.login})`, content: b64encode(JSON.stringify(gal.data, null, 2) + "\n"), branch: state.branch };
    if (gal.sha) body.sha = gal.sha;
    const r = await gh(`/repos/${ADMIN.owner}/${ADMIN.repo}/contents/${GAL_FILE}`, { method: "PUT", body: JSON.stringify(body) });
    gal.sha = r.content.sha;
  }
  function renderGallery() {
    const w = $("#photoList"); if (!w) return;
    const items = [...gal.data.items].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    $("#photoCount").textContent = `${items.length} foto(s) publicada(s) pelo painel`;
    w.innerHTML = items.length ? items.map(i => `<div class="photo-admin"><img src="${i.src}" alt=""><div><strong>${esc(i.caption)}</strong><br>${esc(GAL_CATS[i.category] || i.category)} · ${fmt(i.date)}${i.author ? " · " + esc(i.author) : ""}</div><button type="button" data-delphoto="${esc(i.src)}">Excluir</button></div>`).join("") : `<div class="empty-state">Nenhuma foto publicada pelo painel ainda.</div>`;
  }
  const resizeImage = file => new Promise(res => {
    const img = new Image(); const url = URL.createObjectURL(file);
    img.onload = () => { const max = 1600; const sc = Math.min(1, max / Math.max(img.width, img.height)); const cv = document.createElement("canvas"); cv.width = Math.round(img.width * sc); cv.height = Math.round(img.height * sc); cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height); URL.revokeObjectURL(url); res(cv.toDataURL("image/jpeg", 0.82).split(",")[1]); };
    img.onerror = () => res(null); img.src = url;
  });
  async function uploadPhotos(e) {
    e.preventDefault();
    const f = e.target; const files = Array.from(f.elements.files.files || []);
    if (!files.length) { setStatus("Selecione pelo menos uma foto.", "error"); return; }
    const category = f.elements.category.value, caption = f.elements.caption.value.trim(), author = f.elements.author.value.trim(), date = f.elements.date.value || today();
    const btn = $("#photoBtn"); btn.disabled = true; const bar = $("#uploadBar");
    let done = 0;
    try {
      for (const file of files) {
        const b64 = await resizeImage(file);
        if (!b64) { done++; continue; }
        const name = `${date}-${slug(caption || file.name)}-${Math.random().toString(36).slice(2, 7)}.jpg`;
        const path = `${GAL_DIR}/${name}`;
        await gh(`/repos/${ADMIN.owner}/${ADMIN.repo}/contents/${path}`, { method: "PUT", body: JSON.stringify({ message: `[galeria] Nova foto: ${caption || file.name} (por ${state.user.login})`, content: b64, branch: state.branch }) });
        gal.data.items.unshift({ src: path, caption: caption || file.name.replace(/\.[^.]+$/, ""), category, date, author });
        done++; bar.style.width = Math.round(done / files.length * 100) + "%";
      }
      await saveGallery(`${done} foto(s) publicada(s): ${caption || category}`);
      renderGallery(); f.reset(); f.elements.date.value = today(); bar.style.width = "0";
      setStatus(`${done} foto(s) publicada(s) na galeria! O site atualiza em 1–2 minutos.`);
    } catch (err) { setStatus("Erro ao publicar fotos: " + err.message, "error"); }
    finally { btn.disabled = false; }
  }
  async function deletePhoto(src) {
    const item = gal.data.items.find(i => i.src === src); if (!item) return;
    if (!confirm(`Excluir a foto "${item.caption}" do site?`)) return;
    try {
      try { const f = await gh(`/repos/${ADMIN.owner}/${ADMIN.repo}/contents/${src}?ref=${encodeURIComponent(state.branch)}`); await gh(`/repos/${ADMIN.owner}/${ADMIN.repo}/contents/${src}`, { method: "DELETE", body: JSON.stringify({ message: `[galeria] Remove foto: ${item.caption} (por ${state.user.login})`, sha: f.sha, branch: state.branch }) }); } catch (e) { if (e.status !== 404) throw e; }
      gal.data.items = gal.data.items.filter(i => i !== item);
      await saveGallery(`Remove foto: ${item.caption}`); renderGallery(); setStatus("Foto removida.");
    } catch (err) { setStatus("Erro ao remover: " + err.message, "error"); }
  }

  /* ---------------- Init ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    if (!ADMIN.owner || !ADMIN.repo) { $("#loginError").textContent = "Configure owner/repo em assets/js/config.js (bloco admin)."; $("#loginError").style.display = "block"; }
    $("#branchInput").value = state.branch;
    $("#loginForm").addEventListener("submit", e => { e.preventDefault(); state.branch = $("#branchInput").value.trim() || state.branch; login($("#tokenInput").value, $("#rememberInput").checked); });
    // Link de acesso: admin.html#chave=TOKEN (gerado pelo criador do projeto para outra pessoa)
    const m = location.hash.match(/chave=([^&]+)/);
    if (m) { history.replaceState(null, "", location.pathname); $("#tokenInput").value = decodeURIComponent(m[1]); $("#rememberInput").checked = true; login(decodeURIComponent(m[1]), true); }
    else { const saved = store.get(); if (saved) { $("#tokenInput").value = saved; login(saved, !!localStorage.getItem("ceias-admin-token")); } }
    $("#logoutBtn").addEventListener("click", logout);
    $("#reloadBtn").addEventListener("click", async () => { await loadData(); renderList(); setStatus("Lista atualizada."); });
    $("#exportBtn").addEventListener("click", exportJson);
    $("#shareBtn").addEventListener("click", () => {
      const link = location.origin + location.pathname + "#chave=" + encodeURIComponent(state.token);
      const box = $("#shareBox"); box.hidden = false;
      $("#shareLink").value = link;
      navigator.clipboard?.writeText(link).then(() => setStatus("Link de acesso copiado. Envie apenas para a pessoa autorizada (secretaria/direção)."));
    });
    $("#shareClose").addEventListener("click", () => { $("#shareBox").hidden = true; });
    $("#avisoForm").addEventListener("submit", submitForm);
    $("#cancelEdit").addEventListener("click", () => resetForm());
    $("#adminList").addEventListener("click", async e => {
      const b = e.target.closest("button"); if (!b) return;
      const item = state.data.items.find(x => x.id === (b.dataset.edit || b.dataset.toggle || b.dataset.del));
      if (!item) return;
      if (b.dataset.edit) resetForm(item);
      if (b.dataset.toggle) { item.published = !item.published; await publish(`${item.published ? "Publica" : "Oculta"} aviso: ${item.title}`); }
      if (b.dataset.del && confirm(`Excluir o aviso "${item.title}"? Esta ação não pode ser desfeita.`)) { state.data.items = state.data.items.filter(x => x !== item); await publish(`Remove aviso: ${item.title}`); }
    });
    $("#photoForm")?.addEventListener("submit", uploadPhotos);
    $("#photoList")?.addEventListener("click", e => { const b = e.target.closest("[data-delphoto]"); b && deletePhoto(b.dataset.delphoto); });
    $$(".admin__tabs .tab").forEach(t => t.addEventListener("click", () => { $$(".admin__tabs .tab").forEach(x => x.classList.toggle("is-active", x === t)); $$(".admin__panel").forEach(p => p.hidden = p.id !== t.dataset.panel); }));
    $$("[data-icon]").forEach(el => { const svg = ICONS[el.dataset.icon]; if (svg) el.innerHTML = svg; });
  });
})();
