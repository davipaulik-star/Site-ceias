# Site oficial — Colégio Estadual do Campo Irmã Ambrósia Sabatovich (CEIAS)

Portal institucional estático (HTML5, CSS3 e JavaScript puro), sem frameworks, sem banco de dados e sem etapa de build.
Basta abrir `index.html` no navegador ou publicar a pasta em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel, servidor da escola).

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
area-do-aluno.html         Avisos, links, materiais e calendário (preparada para login futuro)
contato.html               Formulário, contatos, mapa e redes sociais

assets/css/style.css       Estilos (todas as cores em variáveis CSS no topo do arquivo)
assets/js/config.js        Contatos, endereço, redes sociais, WhatsApp, formulário e números
assets/js/data.js          Notícias, eventos, projetos, professores, galeria, vídeos, documentos e avisos
assets/js/script.js        Comportamentos (menu, slider, filtros, lightbox, modais, gráficos, calendário…)
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
| Notícias, eventos, projetos, professores, galeria, vídeos, documentos, avisos, depoimentos | `assets/js/data.js` (copie um bloco existente e edite) |
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
