# Site oficial — Colégio Estadual do Campo Irmã Ambrósia Sabatovich (CEIAS)

Portal institucional estático (HTML5, CSS3 e JavaScript puro), sem frameworks e sem etapa de build.
Identidade visual a partir do logotipo oficial do CEIAS: **azul-marinho** das letras, **amarelo** das estrelas e **vermelho** das faixas,
com o lema *"Educando para a Comunidade"*.
Basta abrir `index.html` no navegador ou publicar a pasta em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel, servidor da escola).

## Logo

O logotipo (`assets/images/logo.svg`) foi redesenhado em vetor a partir da imagem oficial: letras "C.E.I.A.S." arqueadas,
seis estrelas amarelas e uma vermelha, faixas vermelhas com "Col. Est. do Campo Ir. Ambrósia Sabatovich" e
"Ensino Fundamental e Médio", e o lema "Educando para a Comunidade". Há uma versão clara (`logo-white.svg`) para fundos escuros
e um ícone quadrado (`assets/icons/favicon.svg`).

Se a escola tiver o arquivo original em alta resolução, basta substituir `logo.svg` (e, se quiser, `logo-white.svg`) mantendo os nomes.
O logotipo aparece no cabeçalho, no banner inicial, em "Quem somos", na seção "Nosso brasão", no rodapé, no loader, na página 404,
no painel restrito e como marca d'água nas seções azuis.

## Mural de avisos e painel restrito

Os avisos (jogos escolares, festas, prazos, datas importantes e recados da secretaria) ficam em `assets/data/avisos.json`
e aparecem em: faixa vermelha no topo de todas as páginas (avisos urgentes), ticker da página inicial, seção "Mural de avisos"
na página inicial, página `avisos.html` (com filtros e busca), "Datas importantes", Vida Escolar e Área do Aluno.
Avisos com data em `expires` somem automaticamente após essa data.

### Como publicar avisos (direção e secretaria)

O painel `admin.html` (link "Acesso restrito" no rodapé) publica os avisos diretamente no repositório do site pela API do GitHub.
Não existe senha guardada no site: só consegue publicar quem tiver **permissão de escrita no repositório**.

1. **Criador do projeto**: em *Settings → Collaborators* do repositório, adicione a conta do GitHub da secretaria como colaboradora.
2. **Cada pessoa autorizada** cria um token uma única vez: *Settings → Developer settings → Personal access tokens → Fine-grained tokens →
   Generate new token*, escolhendo apenas este repositório e a permissão **Contents: Read and write**.
3. Abra `admin.html`, cole o token e entre. Crie, edite, fixe, oculte ou exclua avisos; cada publicação vira um commit
   (`[avisos] Novo aviso: … (por usuário)`) e o GitHub Pages atualiza o site em 1–2 minutos.
4. O botão "Backup (.json)" baixa uma cópia de todos os avisos.

Configuração em `assets/js/config.js` → `admin` (`owner`, `repo`, `branch`, `file`). A branch padrão é `main`; ajuste se o site for
publicado a partir de outra branch. O painel tem `noindex` e está bloqueado no `robots.txt`.

## Funcionalidades

- Cabeçalho com barra superior (endereço, horário, redes sociais) que recolhe ao rolar; menu com dropdowns; menu lateral no celular.
- **Busca global** (botão de lupa ou `Ctrl+K`) em páginas, notícias, projetos, eventos, documentos, equipe e infraestrutura.
- **Acessibilidade**: aumentar/diminuir fonte, alto contraste (preferências salvas no navegador), tradutor **VLibras**, navegação por teclado, foco visível, `prefers-reduced-motion`.
- Banner com slider (setas, indicadores, swipe, pausa ao passar o mouse) e ticker de avisos e próximos eventos.
- Números com contagem animada, gráficos de distribuição, avaliação da comunidade.
- Notícias com destaque, filtros, busca e "carregar mais"; páginas de detalhe com compartilhamento.
- Eventos com contagem regressiva, calendário mensal, modal com **Google Agenda**, **arquivo .ics** e compartilhamento por WhatsApp; link direto `eventos.html?evento=ID`.
- Galeria com lightbox (teclado e toque), vídeos do YouTube em modal, infraestrutura com ampliação.
- Documentos com filtros e busca; Área do Aluno com abas; formulário de contato com validação e máscara de telefone.
- Loader de abertura com o brasão, barra de progresso de leitura, transição entre páginas, botão voltar ao topo, aviso de privacidade (LGPD), toasts.
- SEO: metadados, Open Graph, schema.org, `sitemap.xml`, `robots.txt`, `manifest.json`, página `404.html`.

## Estrutura

```
index.html                 Página inicial
o-colegio.html             Sobre o colégio (missão, valores, narrativa passado → presente → futuro)
historia.html              Irmã Ambrósia — história completa e linha do tempo
educacao-do-campo.html     Identidade de Escola do Campo
infraestrutura.html        Espaços do colégio + galeria
equipe.html                Corpo docente com filtros por área
cultura.html               Cultura da Colônia Marcelino
ensino.html                Visão geral do ensino + gráficos
ensino-anos-finais.html    6º ao 9º ano
ensino-medio.html          1º ao 3º ano
ensino-eja.html            EJA / Classe Especial
vida-escolar.html          Informações para famílias, avisos, documentos, calendário
projetos.html / projeto.html   Lista de projetos com filtros + página de detalhe (?id=)
noticias.html / noticia.html   Portal de notícias com destaque e filtros + página de detalhe (?id=)
eventos.html               Próximo evento, lista e calendário mensal
galeria.html               Galeria com lightbox e seção de vídeos
documentos.html            Documentos para visualizar/baixar
avisos.html                Mural de avisos e recados (filtros, busca, datas importantes)
admin.html                 Painel restrito para publicar avisos (direção/secretaria)
area-do-aluno.html         Avisos, links, materiais e calendário (preparada para login futuro)
contato.html               Formulário, contatos, mapa e redes sociais

assets/css/style.css       Estilos (todas as cores em variáveis CSS no topo do arquivo)
assets/js/config.js        Contatos, endereço, redes sociais, WhatsApp, formulário e números
assets/js/data.js          Notícias, eventos, projetos, professores, galeria, vídeos, documentos e avisos
assets/js/script.js        Comportamentos (menu, slider, filtros, lightbox, modais, gráficos, calendário…)
assets/js/admin.js         Painel restrito de avisos (API do GitHub)
assets/data/avisos.json    Avisos publicados pelo painel
assets/images/             Logo e imagens (placeholders em assets/images/placeholders/)
assets/icons/              Favicon
assets/videos/             Vídeos locais (opcional)
assets/documents/          PDFs publicados na página de documentos
```

## Como atualizar o conteúdo

| O que | Onde |
|---|---|
| Telefone, e-mail, WhatsApp, horário | `assets/js/config.js` → `contact` |
| Redes sociais | `assets/js/config.js` → `social` (links vazios ficam desativados) |
| Envio do formulário de contato | `assets/js/config.js` → `formEndpoint` (Formspree, Web3Forms etc.). Vazio = abre o e-mail do visitante |
| Links da Área do Aluno | `assets/js/config.js` → `studentLinks` |
| Números e distribuição de estudantes | `assets/js/config.js` → `stats` |
| Avisos e recados | Painel `admin.html` (ou edite `assets/data/avisos.json` diretamente) |
| Notícias, eventos, projetos, professores, galeria, vídeos, documentos, depoimentos | `assets/js/data.js` (copie um bloco existente e edite) |
| Cores, fontes, espaçamentos | `assets/css/style.css` → `:root` |
| Fotos | Salve em `assets/images/` e troque o caminho em `data.js` ou no HTML |
| Vídeos | Informe o `youtubeId` do vídeo em `data.js` → `videos` (ou `gallery` com `type: "video"`) |
| PDFs | Salve em `assets/documents/` e informe o caminho em `data.js` → `documents` |

O conteúdo atual de notícias, eventos, projetos e depoimentos é **exemplo** e deve ser substituído pelo material oficial.
As imagens em `assets/images/placeholders/` são ilustrativas: substitua pelas fotografias reais do colégio (o site aceita JPG, PNG, WebP ou SVG).

## Área do Aluno e login

Não existe backend nem sistema de login neste projeto. A página `area-do-aluno.html` reúne conteúdo público e links para os
sistemas oficiais da rede estadual e está preparada para receber, no futuro, um formulário de autenticação integrado ao serviço escolhido.

## Acessibilidade e SEO

Navegação por teclado, foco visível, `aria-label`/`aria-expanded`, textos alternativos, link "pular para o conteúdo",
`prefers-reduced-motion`, meta tags de descrição/Open Graph, dados estruturados (schema.org/School) e headings hierárquicos.
