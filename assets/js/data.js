/* =====================================================================
   CONTEÚDO DO SITE — CEIAS
   ---------------------------------------------------------------------
   Este arquivo concentra notícias, eventos, projetos, professores,
   galeria, vídeos, documentos, avisos e infraestrutura.
   Para adicionar um item, copie um bloco existente e edite os campos.
   Datas sempre no formato AAAA-MM-DD. Imagens em assets/images/.
   Os itens abaixo são EXEMPLOS e devem ser substituídos pelo conteúdo oficial.
   ===================================================================== */
window.CEIAS_DATA = {

  /* ------------------------------------------------------------------
     NOTÍCIAS — categorias: escola | educacao | projetos | cultura | esportes | eventos
     ------------------------------------------------------------------ */
  news: [
    {
      id: "portal-oficial-no-ar",
      title: "Colégio Estadual do Campo Irmã Ambrósia Sabatovich lança seu portal oficial",
      date: "2026-09-05",
      category: "escola",
      image: "assets/images/placeholders/noticia-1.svg",
      summary: "O CEIAS passa a contar com um site institucional que reúne informações sobre ensino, vida escolar, projetos, avisos, eventos e a história da comunidade.",
      featured: true,
      content: [
        "O Colégio Estadual do Campo Irmã Ambrósia Sabatovich apresenta à comunidade da Colônia Marcelino seu portal institucional. O objetivo é reunir, em um único endereço, as informações que estudantes e famílias procuram no dia a dia: etapas de ensino, horários, transporte escolar, alimentação, documentos, calendário e avisos da secretaria.",
        "O portal também abre espaço para a memória da comunidade. A história de Irmã Ambrósia Sabatovich, a trajetória da imigração ucraniana na Colônia Marcelino e a identidade de Escola do Campo ganham páginas próprias, com o objetivo de registrar e transmitir esse patrimônio às novas gerações.",
        "As seções de notícias, eventos, projetos e galeria serão alimentadas pela equipe do colégio ao longo do ano letivo. Estudantes e famílias podem colaborar enviando fotos das atividades pela página Enviar fotos."
      ]
    },
    {
      id: "sobre-a-educacao-do-campo",
      title: "O que significa ser uma Escola do Campo",
      date: "2026-09-05",
      category: "educacao",
      image: "assets/images/placeholders/campo-1.svg",
      summary: "A classificação de Escola do Campo orienta o projeto pedagógico do CEIAS e reconhece o direito das populações rurais a uma educação construída a partir da sua realidade.",
      content: [
        "O CEIAS é classificado pela Secretaria de Estado da Educação do Paraná como Escola do Campo. Essa não é apenas uma designação administrativa: ela define uma forma de pensar o currículo, o calendário e a relação da escola com a comunidade.",
        "A Educação do Campo é uma política pública que reconhece que as populações rurais têm direito a uma educação pensada a partir da sua realidade, e não simplesmente transportada da cidade para o campo. Isso significa valorizar o trabalho das famílias agricultoras, os saberes transmitidos entre gerações e a cultura local como ponto de partida do conhecimento escolar.",
        "Na prática, esse princípio aparece na horta escolar, nas pesquisas sobre a história da Colônia Marcelino, nas atividades que envolvem as famílias e na organização do calendário, que considera os ciclos e as necessidades da comunidade rural."
      ]
    },
    {
      id: "memoria-irma-ambrosia",
      title: "Irmã Ambrósia Sabatovich: a história que dá nome ao colégio",
      date: "2026-09-05",
      category: "cultura",
      image: "assets/images/placeholders/irma-ambrosia.svg",
      summary: "Professora, catequista e enfermeira, a religiosa ucraniana dedicou a vida à comunidade da Colônia Marcelino e é lembrada por seu gesto de coragem em 1943.",
      content: [
        "Ana Sabatovycz nasceu na Ucrânia em 1894 e chegou ao Brasil ainda bebê, com sua família, durante o movimento de imigração ucraniana para o Paraná. Em 1911 ingressou na congregação das Irmãs Servas de Maria Imaculada, passando a ser conhecida como Irmã Ambrósia.",
        "Em 1931 chegou à Colônia Marcelino ao lado de outras duas irmãs. Atuou como professora, catequista, enfermeira e cuidadora da comunidade, em uma região que não contava com atendimento médico regular nem com escola organizada.",
        "Em 28 de fevereiro de 1943 deu a própria vida para proteger uma jovem sob seus cuidados. Seu gesto é lembrado com respeito pela comunidade, e há um processo de beatificação relacionado à sua história. O colégio carrega seu nome e procura honrar, no trabalho pedagógico, o mesmo compromisso com o cuidado e com a educação.",
        "A história completa está na página Nossa história."
      ]
    }
  ],

  /* ------------------------------------------------------------------
     EVENTOS — inclua futuros e passados. Horário livre (texto).
     ------------------------------------------------------------------ */
  events: [
    {
      id: "calendario-em-atualizacao",
      title: "Calendário escolar 2026",
      date: "2026-12-18",
      time: "Conforme calendário oficial",
      location: "Colégio Estadual do Campo Irmã Ambrósia Sabatovich",
      image: "assets/images/placeholders/colegio-patio.svg",
      category: "Calendário",
      description: "As datas de conselhos de classe, reuniões de pais, recessos e eventos do ano letivo seguem o calendário oficial da SEED/PR. O calendário completo é divulgado pela secretaria e publicado na página de documentos."
    }
  ],

  /* ------------------------------------------------------------------
     PROJETOS — categorias: cultura | tecnologia | esportes | ciencia |
                meio-ambiente | arte | comunidade | educacao
     ------------------------------------------------------------------ */
  projects: [
    {
      id: "raizes-da-colonia",
      title: "Raízes da Colônia",
      category: "cultura",
      image: "assets/images/placeholders/projeto-1.svg",
      participants: "Anos Finais · área de Ciências Humanas e Arte",
      summary: "Pesquisa sobre a história das famílias imigrantes da Colônia Marcelino, com entrevistas, fotografias antigas e produção de um acervo digital.",
      content: [
        "O projeto Raízes da Colônia convida os estudantes a se tornarem pesquisadores da própria história. Em grupos, eles entrevistam moradores, coletam fotografias antigas, registram receitas e canções, e organizam esse material em um acervo digital que ficará disponível para a comunidade.",
        "O trabalho integra História, Língua Portuguesa, Arte e Geografia, e culmina em uma exposição aberta ao público durante a Semana da Cultura Ucraniana."
      ]
    },
    {
      id: "horta-agroecologica",
      title: "Horta Agroecológica",
      category: "meio-ambiente",
      image: "assets/images/placeholders/projeto-2.svg",
      participants: "Anos Finais · área de Ciências da Natureza",
      summary: "Cultivo de hortaliças sem agrotóxicos, compostagem e estudo do solo, integrando ciência e alimentação saudável.",
      content: [
        "A horta é um laboratório a céu aberto. Os estudantes preparam os canteiros, fazem compostagem com resíduos do refeitório, acompanham o crescimento das plantas e registram dados em planilhas.",
        "A produção complementa a alimentação escolar e aproxima os estudantes do conhecimento tradicional das famílias agricultoras da região."
      ]
    },
    {
      id: "robotica-e-programacao",
      title: "Robótica e Programação no Campo",
      category: "tecnologia",
      image: "assets/images/placeholders/projeto-3.svg",
      participants: "Ensino Médio · área de Matemática e Ciências da Natureza",
      summary: "Oficinas de lógica, programação em blocos e automação com foco em soluções para a realidade rural.",
      content: [
        "Utilizando os computadores e tablets do laboratório, os estudantes aprendem lógica de programação e desenvolvem pequenos protótipos: sensores de umidade para a horta, sistemas de irrigação automatizados e aplicativos simples.",
        "O projeto mostra que tecnologia e campo caminham juntos."
      ]
    },
    {
      id: "jogos-e-movimento",
      title: "Jogos e Movimento",
      category: "esportes",
      image: "assets/images/placeholders/projeto-4.svg",
      participants: "Todas as turmas · Educação Física",
      summary: "Treinamentos, torneios internos e preparação para os Jogos Escolares do Paraná.",
      content: [
        "O projeto organiza treinos no contraturno, torneios interclasses e a preparação das equipes que representam o colégio nas competições estudantis.",
        "Além do esporte, trabalha cooperação, respeito às regras e cuidado com a saúde."
      ]
    },
    {
      id: "feira-de-ciencias",
      title: "Feira de Ciências",
      category: "ciencia",
      image: "assets/images/placeholders/projeto-5.svg",
      participants: "Anos Finais e Ensino Médio · Ciências da Natureza",
      summary: "Experimentos e pesquisas científicas apresentados à comunidade, com temas ligados à água, solo, energia e biodiversidade.",
      content: [
        "Ao longo do semestre, os estudantes escolhem um problema real da comunidade, formulam hipóteses, realizam experimentos no laboratório e apresentam os resultados em estandes abertos ao público."
      ]
    },
    {
      id: "arte-na-escola",
      title: "Arte na Escola: Pêssankas e Cores da Colônia",
      category: "arte",
      image: "assets/images/placeholders/projeto-6.svg",
      participants: "Anos Finais · Arte",
      summary: "Oficinas de pêssanka (ovo decorado ucraniano), pintura e bordado inspirados nas tradições locais.",
      content: [
        "As oficinas resgatam técnicas artísticas tradicionais da comunidade e as reinterpretam com a linguagem dos jovens. As obras produzidas decoram os corredores do colégio e participam de exposições."
      ]
    },
    {
      id: "escola-e-comunidade",
      title: "Escola e Comunidade",
      category: "comunidade",
      image: "assets/images/placeholders/projeto-7.svg",
      participants: "Toda a comunidade escolar",
      summary: "Ações de integração com as famílias, mutirões, festas e encontros que fortalecem o vínculo entre escola e Colônia Marcelino.",
      content: [
        "O projeto organiza o calendário de ações comunitárias do colégio: Festa da Família, mutirões de conservação, encontros com produtores rurais e rodas de conversa com moradores."
      ]
    },
    {
      id: "leitura-em-rede",
      title: "Leitura em Rede",
      category: "educacao",
      image: "assets/images/placeholders/projeto-8.svg",
      participants: "Todas as turmas · Linguagens e Biblioteca",
      summary: "Clube de leitura, saraus, produção de textos e circulação de livros entre estudantes e famílias.",
      content: [
        "O projeto incentiva a leitura como prática cotidiana, com encontros na biblioteca, saraus literários e uma biblioteca itinerante que leva livros às famílias da comunidade."
      ]
    }
  ],

  /* ------------------------------------------------------------------
     EQUIPE — áreas: linguagens | matematica | natureza | humanas |
              educacao-fisica | outros
     Preencha nome, formação e foto quando disponíveis.
     ------------------------------------------------------------------ */
  teachers: [],

  /* Enquanto os dados individuais da equipe não forem publicados, o site exibe a
     composição do quadro por área do conhecimento. Para publicar os profissionais,
     preencha a lista `teachers` acima (nome, função, área, disciplina, formação, foto). */
  teamAreas: [
    { area: "linguagens", label: "Linguagens", subjects: "Língua Portuguesa · Língua Inglesa · Arte · Educação Física", desc: "Leitura, produção textual, expressão artística e corporal." },
    { area: "matematica", label: "Matemática", subjects: "Matemática", desc: "Raciocínio lógico, resolução de problemas e pensamento quantitativo." },
    { area: "natureza", label: "Ciências da Natureza", subjects: "Ciências · Biologia · Física · Química", desc: "Investigação científica, laboratório e estudo do meio ambiente." },
    { area: "humanas", label: "Ciências Humanas", subjects: "História · Geografia · Filosofia · Sociologia · Ensino Religioso", desc: "Território, memória, cidadania e pensamento crítico." },
    { area: "gestao", label: "Equipe gestora e pedagógica", subjects: "Direção · Direção auxiliar · Pedagogos", desc: "Coordenação do projeto pedagógico e acompanhamento das turmas." },
    { area: "apoio", label: "Agentes educacionais", subjects: "Secretaria · Biblioteca · Alimentação · Limpeza e manutenção", desc: "Estrutura e atendimento que sustentam o dia a dia da escola." }
  ],

  /* ------------------------------------------------------------------
     INFRAESTRUTURA
     ------------------------------------------------------------------ */
  infrastructure: [
    { id: "biblioteca", title: "Biblioteca", icon: "book", image: "assets/images/placeholders/biblioteca.svg", description: "Espaço destinado à leitura, pesquisa e aprendizagem." },
    { id: "lab-informatica", title: "Laboratório de Informática", icon: "laptop", image: "assets/images/placeholders/lab-informatica.svg", description: "Ambiente destinado às atividades pedagógicas e ao desenvolvimento tecnológico." },
    { id: "lab-ciencias", title: "Laboratório de Ciências", icon: "flask", image: "assets/images/placeholders/lab-ciencias.svg", description: "Espaço para experiências e aprendizagem prática." },
    { id: "quadra", title: "Quadra Coberta", icon: "trophy", image: "assets/images/placeholders/quadra.svg", description: "Área destinada às atividades esportivas e eventos." },
    { id: "refeitorio", title: "Refeitório", icon: "utensils", image: "assets/images/placeholders/refeitorio.svg", description: "Espaço destinado à alimentação escolar." },
    { id: "tecnologia", title: "Tecnologia", icon: "tablet", image: "assets/images/placeholders/tecnologia.svg", description: "36 computadores e 30 tablets disponíveis para utilização pedagógica." },
    { id: "acessibilidade", title: "Acessibilidade", icon: "accessibility", image: "assets/images/placeholders/acessibilidade.svg", description: "Estrutura com rampas de acesso." },
    { id: "agua", title: "Água Potável", icon: "droplet", image: "assets/images/placeholders/agua.svg", description: "Abastecimento de água potável." }
  ],

  /* ------------------------------------------------------------------
     GALERIA — categorias: colegio | alunos | professores | eventos |
               esportes | projetos | cultura. type: "image" | "video"
     ------------------------------------------------------------------ */
  gallery: [
    { type: "image", category: "alunos", src: "assets/images/uniforme.jpg", caption: "Uniforme oficial do CEIAS: camiseta azul-claro e calça azul-marinho" },
    { type: "image", category: "colegio", src: "assets/images/logo-uniforme.jpg", caption: "Logotipo do C.E.I.A.S. estampado no uniforme" },
    { type: "image", category: "colegio", src: "assets/images/placeholders/colegio-fachada.svg", caption: "Fachada do Colégio Estadual do Campo Irmã Ambrósia Sabatovich" },
    { type: "image", category: "colegio", src: "assets/images/placeholders/colegio-patio.svg", caption: "Pátio central do colégio" },
    { type: "image", category: "colegio", src: "assets/images/placeholders/quadra.svg", caption: "Quadra coberta" },
    { type: "image", category: "colegio", src: "assets/images/placeholders/biblioteca.svg", caption: "Biblioteca" },
    { type: "image", category: "alunos", src: "assets/images/placeholders/galeria-1.svg", caption: "Estudantes em atividade no laboratório de informática" },
    { type: "image", category: "alunos", src: "assets/images/placeholders/galeria-2.svg", caption: "Aula prática na horta escolar" },
    { type: "image", category: "alunos", src: "assets/images/placeholders/galeria-3.svg", caption: "Roda de leitura na biblioteca" },
    { type: "image", category: "professores", src: "assets/images/placeholders/galeria-4.svg", caption: "Equipe docente em formação continuada" },
    { type: "image", category: "professores", src: "assets/images/placeholders/galeria-5.svg", caption: "Planejamento pedagógico" },
    { type: "image", category: "eventos", src: "assets/images/placeholders/galeria-6.svg", caption: "Festa da Família" },
    { type: "image", category: "eventos", src: "assets/images/placeholders/galeria-7.svg", caption: "Formatura do Ensino Médio" },
    { type: "video", category: "eventos", youtubeId: "", src: "assets/images/placeholders/video-3.svg", caption: "Apresentação cultural — vídeo (cadastre o ID do YouTube em data.js)" },
    { type: "image", category: "esportes", src: "assets/images/placeholders/galeria-8.svg", caption: "Jogos Escolares — equipe de futsal" },
    { type: "image", category: "esportes", src: "assets/images/placeholders/galeria-9.svg", caption: "Torneio interclasses de vôlei" },
    { type: "image", category: "projetos", src: "assets/images/placeholders/galeria-10.svg", caption: "Feira de Ciências" },
    { type: "image", category: "projetos", src: "assets/images/placeholders/galeria-11.svg", caption: "Oficina de robótica" },
    { type: "image", category: "cultura", src: "assets/images/placeholders/cultura-1.svg", caption: "Dança tradicional ucraniana" },
    { type: "image", category: "cultura", src: "assets/images/placeholders/cultura-3.svg", caption: "Pêssankas produzidas pelos estudantes" },
    { type: "image", category: "cultura", src: "assets/images/placeholders/galeria-12.svg", caption: "Semana da Cultura Ucraniana" },
    { type: "image", category: "colegio", src: "assets/images/placeholders/campo-1.svg", caption: "Paisagem da Colônia Marcelino" }
  ],

  /* ------------------------------------------------------------------
     VÍDEOS — informe o ID do vídeo do YouTube (parte após "v=" na URL)
     ------------------------------------------------------------------ */
  videos: [
    { id: "institucional", youtubeId: "", title: "Conheça o CEIAS", description: "Vídeo institucional do colégio (adicione o ID do YouTube em data.js).", date: "2026-08-01", thumb: "assets/images/placeholders/video-1.svg" },
    { id: "feira", youtubeId: "", title: "Feira de Ciências 2026", description: "Os melhores momentos da Feira de Ciências.", date: "2026-08-22", thumb: "assets/images/placeholders/video-2.svg" },
    { id: "cultura", youtubeId: "", title: "Semana da Cultura Ucraniana", description: "Apresentações e tradições da Colônia Marcelino.", date: "2026-08-14", thumb: "assets/images/placeholders/video-3.svg" },
    { id: "campo", youtubeId: "", title: "O que é Educação do Campo?", description: "Professores e estudantes explicam a identidade do CEIAS.", date: "2026-06-10", thumb: "assets/images/placeholders/video-4.svg" }
  ],

  /* ------------------------------------------------------------------
     DOCUMENTOS — categorias: calendario | regimento | comunicados |
                  documentos | formularios | academico | materiais
     file vazio = documento ainda não disponível (botões desativados)
     ------------------------------------------------------------------ */
  documents: [
    { id: "calendario-2026", title: "Calendário Escolar 2026", category: "calendario", file: "", size: "PDF", date: "2026-02-01", description: "Datas de início e término dos bimestres, recessos e feriados." },
    { id: "regimento", title: "Regimento Escolar", category: "regimento", file: "", size: "PDF", date: "2026-02-01", description: "Normas de funcionamento, direitos e deveres da comunidade escolar." },
    { id: "ppp", title: "Projeto Político-Pedagógico (PPP)", category: "documentos", file: "", size: "PDF", date: "2026-02-01", description: "Documento que orienta a proposta pedagógica do colégio como Escola do Campo." },
    { id: "comunicado-reuniao", title: "Comunicado — Reunião de pais 3º bimestre", category: "comunicados", file: "", size: "PDF", date: "2026-07-01", description: "Convocação e pauta da reunião de pais e responsáveis." },
    { id: "form-matricula", title: "Formulário de Matrícula / Rematrícula", category: "formularios", file: "", size: "PDF", date: "2026-01-15", description: "Ficha para preenchimento e entrega na secretaria." },
    { id: "form-transporte", title: "Solicitação de Transporte Escolar", category: "formularios", file: "", size: "PDF", date: "2026-01-15", description: "Formulário de cadastro no transporte escolar rural." },
    { id: "horarios", title: "Horário das Aulas por Turma", category: "academico", file: "", size: "PDF", date: "2026-02-09", description: "Grade horária de todas as turmas." },
    { id: "lista-materiais", title: "Lista de Materiais 2026", category: "materiais", file: "", size: "PDF", date: "2026-01-20", description: "Materiais necessários por etapa de ensino." },
    { id: "cardapio", title: "Cardápio da Alimentação Escolar", category: "materiais", file: "", size: "PDF", date: "2026-08-01", description: "Cardápio mensal elaborado pela nutricionista da rede." }
  ],

  /* ------------------------------------------------------------------
     AVISOS (Área do Aluno / Vida Escolar) — type: info | urgent | default
     ------------------------------------------------------------------ */
  notices: [
    { date: "2026-09-05", type: "info", title: "Canal oficial de avisos", text: "Comunicados da direção, da secretaria e da equipe pedagógica são publicados no mural de avisos do site. Avisos urgentes aparecem em destaque no topo das páginas." },
    { date: "2026-09-05", type: "default", title: "Atendimento da secretaria", text: "Declarações, históricos e transferências devem ser solicitados com antecedência. Para assuntos pedagógicos, agende atendimento com a equipe." }
  ],

  /* ------------------------------------------------------------------
     DEPOIMENTOS — publique apenas depoimentos reais, com autorização
     { text, author, role }
     ------------------------------------------------------------------ */
  testimonials: [],

  /* ------------------------------------------------------------------
     TRANSPORTE ESCOLAR
     As linhas são definidas pela Prefeitura de São José dos Pinhais e podem
     mudar a cada ano letivo. Para publicá-las, acrescente itens aqui:
     { line, route, morning, afternoon, night, contact }
     ------------------------------------------------------------------ */
  transport: [],

  /* ------------------------------------------------------------------
     HORÁRIOS DAS TURMAS
     Para publicar a grade de uma turma, acrescente um item em `classes`:
     { turma: "6º ano A", shift: "manha", days: { Segunda: [5 aulas], ... } }
     ------------------------------------------------------------------ */
  schedule: {
    periods: {
      manha: ["7h30–8h20", "8h20–9h10", "9h10–10h00", "10h20–11h10", "11h10–11h50"],
      tarde: ["13h00–13h50", "13h50–14h40", "14h40–15h30", "15h50–16h40", "16h40–17h20"],
      noite: ["18h30–19h15", "19h15–20h00", "20h00–20h45", "21h00–21h35", "21h35–22h00"]
    },
    classes: []
  },

  /* ------------------------------------------------------------------
     CARDÁPIO DA ALIMENTAÇÃO ESCOLAR
     Elaborado pela nutricionista da rede estadual. { day, meal, extra }
     ------------------------------------------------------------------ */
  menu: [],

  /* ------------------------------------------------------------------
     PERGUNTAS FREQUENTES
     categorias: matricula | documentos | rotina | transporte | ensino | tecnologia
     ------------------------------------------------------------------ */
  faq: [
    { cat: "matricula", q: "Como faço a matrícula ou a rematrícula?", a: "A matrícula e a rematrícula são feitas na secretaria do colégio, no período definido pelo calendário da Secretaria de Estado da Educação do Paraná. Leve RG ou certidão de nascimento do estudante, CPF, comprovante de residência atualizado e documento com foto do responsável. Estudantes vindos de outra escola devem apresentar também o histórico escolar ou a declaração de transferência." },
    { cat: "matricula", q: "Meu filho estuda em outra escola. Como faço a transferência?", a: "Solicite na escola de origem a declaração de transferência e o histórico escolar. Com esses documentos, procure a secretaria do CEIAS junto com os documentos do estudante e do responsável. A vaga fica condicionada à disponibilidade na turma correspondente." },
    { cat: "matricula", q: "Quem pode estudar no colégio?", a: "O colégio atende estudantes dos Anos Finais do Ensino Fundamental (6º ao 9º ano), do Ensino Médio (1º ao 3º ano), da Educação de Jovens e Adultos e da Classe Especial. Como Escola do Campo, atende prioritariamente a comunidade da Colônia Marcelino e região." },
    { cat: "documentos", q: "Como solicito uma declaração de matrícula ou o histórico escolar?", a: "O pedido é feito na secretaria, pessoalmente ou por telefone, informando o nome completo do estudante e a turma. Declarações costumam ficar prontas em poucos dias úteis; o histórico escolar pode levar mais tempo por exigir conferência de registros." },
    { cat: "documentos", q: "Como justifico uma falta?", a: "Entregue a justificativa por escrito, assinada pelo responsável, ou o atestado médico, na secretaria ou ao professor regente, assim que o estudante retornar às aulas." },
    { cat: "rotina", q: "Quais são os horários de aula?", a: "As aulas acontecem nos períodos da manhã, da tarde e da noite, conforme a etapa de ensino e a turma. A grade de cada turma é divulgada pela secretaria no início do ano letivo e fica disponível na página Horários das turmas." },
    { cat: "rotina", q: "O uso do uniforme é obrigatório?", a: "O uniforme, composto pela camiseta azul-claro com o logotipo do colégio e pela calça azul-marinho, é recomendado para a identificação e a segurança dos estudantes. Informações sobre aquisição estão com a secretaria. Famílias em situação de vulnerabilidade podem procurar a direção." },
    { cat: "rotina", q: "A escola oferece alimentação?", a: "Sim. O colégio serve alimentação escolar diariamente, com cardápio elaborado por nutricionista da rede estadual e produtos da agricultura familiar, conforme o Programa Nacional de Alimentação Escolar. Estudantes com restrições alimentares devem apresentar laudo médico na secretaria." },
    { cat: "transporte", q: "Como funciona o transporte escolar?", a: "O transporte escolar rural é oferecido em parceria com a Prefeitura de São José dos Pinhais. O cadastro é feito na secretaria, com comprovante de residência, e renovado a cada ano letivo. As linhas e os horários são divulgados pela secretaria." },
    { cat: "ensino", q: "Quais etapas de ensino o colégio oferece?", a: "Anos Finais do Ensino Fundamental (6º ao 9º ano), Ensino Médio (1º ao 3º ano), Educação de Jovens e Adultos e Classe Especial, com atendimento educacional especializado." },
    { cat: "ensino", q: "O que significa ser uma Escola do Campo?", a: "Significa que o projeto pedagógico parte da realidade rural da comunidade, valorizando o trabalho, a cultura e os saberes das famílias. A Educação do Campo é uma política pública que reconhece o direito das populações rurais a uma educação construída a partir do seu contexto." },
    { cat: "tecnologia", q: "Como acesso o boletim e a frequência do estudante?", a: "Pelos sistemas oficiais da rede estadual: o portal e o aplicativo Escola Digital Paraná e a Área do Aluno da SEED/PR. Os endereços estão reunidos na página Área do Aluno. Em caso de dúvida no primeiro acesso, a secretaria orienta." },
    { cat: "tecnologia", q: "Como envio fotos das atividades para o site?", a: "Pela página Enviar fotos. Você pode mandar as imagens por e-mail, WhatsApp ou formulário, conforme os canais disponíveis. A equipe do colégio revisa o material antes de publicar na galeria." }
  ],

  /* ------------------------------------------------------------------
     JOGOS ESCOLARES
     Resultados e agenda são publicados pela escola durante a temporada:
     results: { date, modality, home, away, score, place, phase, outcome: "win"|"loss" }
     schedule: { date, time, modality, opponent, place, phase }
     ------------------------------------------------------------------ */
  games: {
    season: "Jogos Escolares do Paraná",
    intro: "O CEIAS participa dos Jogos Escolares do Paraná, promovidos pelo Governo do Estado. As equipes são formadas entre os estudantes matriculados e treinam no contraturno com os professores de Educação Física.",
    modalities: [
      { name: "Futsal", icon: "trophy", categories: "Categorias A e B · masculino e feminino", coach: "Professores de Educação Física" },
      { name: "Voleibol", icon: "trophy", categories: "Categorias A e B · masculino e feminino", coach: "Professores de Educação Física" },
      { name: "Handebol", icon: "trophy", categories: "Categorias A e B", coach: "Professores de Educação Física" },
      { name: "Atletismo", icon: "sun", categories: "Provas de pista e de campo", coach: "Professores de Educação Física" },
      { name: "Xadrez", icon: "lightbulb", categories: "Individual", coach: "Professores de Educação Física" },
      { name: "Tênis de mesa", icon: "star", categories: "Individual e duplas", coach: "Professores de Educação Física" }
    ],
    results: [],
    schedule: [],
    rules: [
      "Podem participar estudantes regularmente matriculados, dentro das faixas etárias definidas pelo regulamento oficial dos Jogos Escolares do Paraná.",
      "É obrigatória a autorização assinada pelo responsável para estudantes menores de 18 anos, entregue na secretaria antes da primeira competição.",
      "Os treinos acontecem no contraturno, na quadra coberta, conforme cronograma divulgado pelos professores de Educação Física.",
      "Nos dias de competição, a saída e o retorno são organizados pela escola. Leve documento com foto, garrafa de água e o uniforme do colégio.",
      "Datas, locais e resultados são divulgados no mural de avisos assim que confirmados pela organização."
    ],
    officialUrl: "https://www.jogosescolares.pr.gov.br/"
  },

  /* ------------------------------------------------------------------
     COMUNIDADE ESCOLAR — órgãos colegiados e representação
     ------------------------------------------------------------------ */
  community: [
    { name: "APMF", full: "Associação de Pais, Mestres e Funcionários", desc: "Entidade que reúne famílias, professores e funcionários para apoiar a escola, acompanhar a aplicação de recursos e organizar ações e melhorias. A APMF do colégio está registrada sob o CNPJ 03.233.821/0001-66.", icon: "users", how: "As reuniões são abertas à comunidade escolar. Procure a direção para saber as datas." },
    { name: "Conselho Escolar", full: "Órgão colegiado de gestão democrática", desc: "Composto por representantes da direção, dos professores, dos funcionários, dos estudantes e das famílias. Delibera sobre o projeto pedagógico, o calendário escolar e a aplicação de recursos.", icon: "handshake", how: "A composição é definida por eleição, conforme as normas da SEED/PR." },
    { name: "Grêmio Estudantil", full: "Representação dos estudantes", desc: "Espaço de organização dos próprios estudantes para propor atividades culturais e esportivas, encaminhar demandas e dialogar com a direção.", icon: "star", how: "As chapas são formadas pelos estudantes, com eleição entre os matriculados." },
    { name: "Conselho de Classe", full: "Avaliação coletiva do processo de ensino", desc: "Reúne a equipe pedagógica e os professores de cada turma para avaliar o desempenho dos estudantes e planejar intervenções ao longo do ano letivo.", icon: "school", how: "Acontece ao final de cada período avaliativo, conforme o calendário escolar." }
  ],

  /* ------------------------------------------------------------------
     LINKS ÚTEIS — portais oficiais
     ------------------------------------------------------------------ */
  usefulLinks: [
    { title: "Secretaria de Estado da Educação (SEED/PR)", url: "https://www.educacao.pr.gov.br/", desc: "Portal oficial da rede estadual de ensino" },
    { title: "Escola Digital Paraná", url: "https://www.escoladigital.pr.gov.br/", desc: "Portal e aplicativo do estudante" },
    { title: "Área do Aluno — SEED/PR", url: "https://www.areadoaluno.seed.pr.gov.br/", desc: "Boletim, frequência e informações acadêmicas" },
    { title: "NRE Área Metropolitana Sul", url: "https://nreams.educacao.pr.gov.br/", desc: "Núcleo Regional de Educação ao qual o colégio pertence" },
    { title: "Consulta Escolas — SEED/PR", url: "https://www.consultaescolas.pr.gov.br/", desc: "Dados oficiais e cadastrais da escola" },
    { title: "Prefeitura de São José dos Pinhais", url: "https://www.sjp.pr.gov.br/", desc: "Transporte escolar e serviços municipais" },
    { title: "Jogos Escolares do Paraná", url: "https://www.jogosescolares.pr.gov.br/", desc: "Regulamentos, calendário e resultados oficiais" },
    { title: "ENEM — INEP", url: "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem", desc: "Inscrições, provas e resultados" }
  ]
};
