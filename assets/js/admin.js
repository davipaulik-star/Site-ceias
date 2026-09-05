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

  /* ---------------- Init ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    if (!ADMIN.owner || !ADMIN.repo) { $("#loginError").textContent = "Configure owner/repo em assets/js/config.js (bloco admin)."; $("#loginError").style.display = "block"; }
    $("#branchInput").value = state.branch;
    $("#loginForm").addEventListener("submit", e => { e.preventDefault(); state.branch = $("#branchInput").value.trim() || state.branch; login($("#tokenInput").value, $("#rememberInput").checked); });
    const saved = store.get();
    if (saved) { $("#tokenInput").value = saved; login(saved, !!localStorage.getItem("ceias-admin-token")); }
    $("#logoutBtn").addEventListener("click", logout);
    $("#reloadBtn").addEventListener("click", async () => { await loadData(); renderList(); setStatus("Lista atualizada."); });
    $("#exportBtn").addEventListener("click", exportJson);
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
    $$("[data-icon]").forEach(el => { const svg = ICONS[el.dataset.icon]; if (svg) el.innerHTML = svg; });
  });
})();
