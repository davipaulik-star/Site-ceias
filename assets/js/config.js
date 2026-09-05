/* =====================================================================
   CONFIGURAÇÕES DO SITE — CEIAS
   ---------------------------------------------------------------------
   Edite este arquivo para atualizar telefone, e-mail, redes sociais,
   WhatsApp, mapa e integrações. Nenhum outro arquivo precisa ser alterado.
   ===================================================================== */
window.CEIAS_CONFIG = {
  school: {
    name: "Colégio Estadual do Campo Irmã Ambrósia Sabatovich",
    fullName: "Colégio Estadual do Campo Irmã Ambrósia Sabatovich – Ensino Fundamental e Médio",
    acronym: "CEIAS",
    inep: "41369270",
    classification: "Escola do Campo",
    motto: "Educando para a Comunidade",
    network: "Rede Estadual de Ensino do Paraná — SEED/PR",
    nre: "Núcleo Regional de Educação da Área Metropolitana Sul",
  },

  address: {
    street: "Estrada Vereador Domingos Benvenuto Moletta, 17173",
    district: "Colônia Marcelino",
    city: "São José dos Pinhais",
    state: "PR",
    zip: "CEP 83024-899",
    // Endereço usado no mapa e no botão "Como chegar"
    mapsQuery: "Estrada Vereador Domingos Benvenuto Moletta, 17173, Colônia Marcelino, São José dos Pinhais - PR, 83024-899",
  },

  contact: {
    phone: "(41) 3398-8768",   // Telefone do colégio (fonte: cadastros públicos da APMF/escola). Confirme na secretaria.
    phone2: "",                // Segundo telefone, se houver (ex.: "(41) 3382-7068" aparece em um cadastro antigo)
    email: "sjpambrosiasabatovich@escola.pr.gov.br", // Padrão de e-mail institucional da SEED/PR — CONFIRME com a secretaria
    whatsapp: "",         // Somente números com DDI/DDD. Ex.: "5541999999999". Vazio = botão oculto.
    whatsappMessage: "Olá! Gostaria de mais informações sobre o CEIAS.",
    hours: "Segunda a sexta-feira, das 7h30 às 17h30",
    secretaryHours: "Segunda a sexta-feira, das 8h às 12h e das 13h às 17h",
    director: "",              // Nome do(a) diretor(a) — preencha quando autorizado
    viceDirector: "",
    pedagogues: "",
  },

  social: {
    instagram: "",        // Ex.: "https://instagram.com/ceias"
    facebook: "https://www.facebook.com/pages/Col%C3%A9gio-Estadual-Do-Campo-Irm%C3%A3-Ambr%C3%B3sia-Sabatovich/913380898686655",
    youtube: "",
    tiktok: "",
  },

  // Painel restrito de avisos (admin.html). Os avisos ficam em assets/data/avisos.json e são
  // publicados diretamente no repositório do site via API do GitHub — só quem tem permissão
  // de escrita no repositório (criador do projeto e secretaria) consegue publicar.
  admin: {
    owner: "davipaulik-star",       // usuário/organização do GitHub dono do repositório
    repo: "Site-ceias",             // nome do repositório
    branch: "main",                 // branch publicada (GitHub Pages)
    file: "assets/data/avisos.json",
    maxUrgent: 3,
  },

  // Envio de fotos pela comunidade (Jogos Escolares, eventos). Preencha UM ou mais canais:
  photoUpload: {
    formUrl: "",            // Link de um Google Forms com "Upload de arquivo" (recomendado) — ex.: "https://forms.gle/xxxx"
    driveUrl: "",           // Link de uma pasta compartilhada do Google Drive/OneDrive com permissão de envio
    whatsapp: "",           // Número (ex.: "5541999999999") de um professor/secretaria que recebe as fotos
    email: "",              // E-mail que recebe as fotos (vazio = usa contact.email)
    maxSizeMb: 10,
  },

  // Dados institucionais adicionais
  details: {
    nre: "NRE Área Metropolitana Sul",
    dependency: "Estadual — Secretaria de Estado da Educação do Paraná (SEED/PR)",
    location: "Zona rural — Colônia Marcelino",
    stages: "Ensino Fundamental (Anos Finais), Ensino Médio, EJA e Classe Especial",
    shifts: "Manhã, tarde e noite",
    apmfCnpj: "03.233.821/0001-66",
    apmfName: "APMF — Associação de Pais, Mestres e Funcionários do Colégio Estadual do Campo Irmã Ambrósia Sabatovich",
    codigoSeed: "1890",
    municipioSeed: "2570",
  },

  // Endpoint para envio do formulário de contato (ex.: Formspree, Getform, Web3Forms).
  // Se vazio, o formulário abre o aplicativo de e-mail do visitante (mailto).
  formEndpoint: "",

  // Links da Área do Aluno (portais oficiais). Preencha quando disponíveis.
  studentLinks: [
    { title: "Escola Digital Paraná", desc: "Aplicativo e portal do estudante da rede estadual", url: "https://www.escoladigital.pr.gov.br/", icon: "laptop" },
    { title: "Área do Aluno — SEED/PR", desc: "Boletim, frequência e informações acadêmicas", url: "https://www.areadoaluno.seed.pr.gov.br/", icon: "user" },
    { title: "Livro Didático / Materiais", desc: "Materiais de apoio disponibilizados pela escola", url: "documentos.html", icon: "book" },
    { title: "Calendário Escolar", desc: "Datas letivas, recessos e eventos", url: "eventos.html", icon: "calendar" },
    { title: "Documentos", desc: "Regimento, comunicados e formulários", url: "documentos.html", icon: "file" },
    { title: "Fale com a escola", desc: "Dúvidas, sugestões e atendimento", url: "contato.html", icon: "mail" },
  ],

  // Avaliação informada pelo portal Melhor Escola
  rating: {
    score: 4.8,
    source: "Melhor Escola",
    criteria: [
      { label: "Estrutura Física", value: 5.0 },
      { label: "Desenvolvimento Socioemocional", value: 5.0 },
      { label: "Participação da Comunidade", value: 4.5 },
      { label: "Motivação dos Estudantes", value: 4.5 },
    ],
  },

  // Números institucionais
  stats: {
    students: 474,
    classes: 15,
    teachers: 20,
    computers: 36,
    tablets: 30,
    distribution: [
      { label: "Anos Finais (6º ao 9º ano)", value: 305, color: "#1b1c56" },
      { label: "Ensino Médio", value: 169, color: "#f2c318" },
      { label: "EJA / Classe Especial", value: 31, color: "#b3202b" },
    ],
  },
};
