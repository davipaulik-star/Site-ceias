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
    phone: "",            // Ex.: "(41) 3000-0000" — deixe vazio se ainda não houver
    email: "",            // Ex.: "contato@ceias.pr.gov.br"
    whatsapp: "",         // Somente números com DDI/DDD. Ex.: "5541999999999". Vazio = botão oculto.
    whatsappMessage: "Olá! Gostaria de mais informações sobre o CEIAS.",
    hours: "Segunda a sexta-feira, das 7h30 às 17h30",
  },

  social: {
    instagram: "",        // Ex.: "https://instagram.com/ceias"
    facebook: "",
    youtube: "",
    tiktok: "",
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
      { label: "Anos Finais (6º ao 9º ano)", value: 305, color: "#1b5e3f" },
      { label: "Ensino Médio", value: 169, color: "#c9a227" },
      { label: "EJA / Classe Especial", value: 31, color: "#1f4e79" },
    ],
  },
};
