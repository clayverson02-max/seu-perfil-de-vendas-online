// Todos os textos do funil ficam aqui para facilitar a edição.

export const DISCLAIMER =
  "Este conteúdo é educacional. Os resultados variam de pessoa para pessoa e dependem do esforço, do produto escolhido e do mercado. Não garantimos ganhos específicos.";

export const intro = {
  brand: "Loja no Celular 45+",
  headline: "Depois dos 45, o celular na sua mão pode virar o seu próprio negócio.",
  sub: "Responda 8 perguntas rápidas (2 minutos) e descubra qual é o seu perfil de vendedora/vendedor online e por onde começar.",
  button: "COMEÇAR AGORA",
  trust: [
    "Sem precisar de computador",
    "Comece com pouco investimento",
    "Explicado passo a passo, sem enrolação",
  ],
};

export type QuestionId = "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7" | "q8";
export type Option = { value: string; label: string };
export type Question = { id: QuestionId; title: string; options: Option[] };

export const questions: Question[] = [
  { id: "q1", title: "Qual é a sua faixa de idade?", options: [
    { value: "45-49", label: "45 a 49 anos" },
    { value: "50-59", label: "50 a 59 anos" },
    { value: "60+", label: "60 anos ou mais" },
    { value: "<45", label: "Menos de 45 anos" },
  ]},
  { id: "q2", title: "Hoje, como você usa o celular?", options: [
    { value: "social", label: "Só WhatsApp e redes sociais" },
    { value: "some_online", label: "Já compro e vendo algo online às vezes" },
    { value: "skilled", label: "Uso bem, aprendo rápido com apps" },
    { value: "difficulty", label: "Tenho dificuldade, preciso de ajuda passo a passo" },
  ]},
  { id: "q3", title: "Já tentou ganhar dinheiro pela internet?", options: [
    { value: "never", label: "Nunca tentei" },
    { value: "failed", label: "Tentei e não deu certo" },
    { value: "sold", label: "Já vendi algumas coisas" },
    { value: "business", label: "Já tenho um pequeno negócio" },
  ]},
  { id: "q4", title: "Quanto tempo por dia você teria para isso?", options: [
    { value: "1h", label: "Até 1 hora" },
    { value: "1-2h", label: "1 a 2 horas" },
    { value: "3h+", label: "3 horas ou mais" },
  ]},
  { id: "q5", title: "Quanto você se sentiria confortável em investir para começar?", options: [
    { value: "zero", label: "Quase nada, quero começar do zero" },
    { value: "100", label: "Até R$ 100" },
    { value: "100-500", label: "R$ 100 a R$ 500" },
    { value: "500+", label: "Mais de R$ 500" },
  ]},
  { id: "q6", title: "O que mais combina com você?", options: [
    { value: "talk", label: "Gosto de conversar e atender pessoas" },
    { value: "organize", label: "Gosto de organizar e pesquisar" },
    { value: "create", label: "Gosto de criar e mostrar coisas bonitas" },
    { value: "numbers", label: "Gosto de números e estratégia" },
  ]},
  { id: "q7", title: "Qual é o seu principal objetivo?", options: [
    { value: "extra", label: "Uma renda extra no fim do mês" },
    { value: "bills", label: "Ajudar a pagar as contas da casa" },
    { value: "main", label: "Transformar em minha principal fonte de renda" },
    { value: "hobby", label: "Ter um hobby que também gera dinheiro" },
  ]},
  { id: "q8", title: "O que mais te trava hoje?", options: [
    { value: "scam", label: "Medo de cair em golpe" },
    { value: "product", label: "Não sei qual produto vender" },
    { value: "store", label: "Não sei criar loja ou anúncio" },
    { value: "time", label: "Falta de tempo" },
  ]},
];

export const quizUi = {
  progress: (n: number, total: number) => `Pergunta ${n} de ${total}`,
  back: "Voltar",
};

export const analyzing = {
  title: "Analisando suas respostas...",
  lines: [
    "Estamos montando o seu perfil com calma.",
    "Seus dados estão protegidos.",
    "Falta pouquinho!",
  ],
};

export const leadForm = {
  title: "Seu perfil está pronto!",
  sub: "Para ver o resultado e receber seu mapa personalizado, informe:",
  name: "Nome",
  whatsapp: "WhatsApp (com DDD)",
  email: "E-mail",
  consent: "Concordo em receber contato sobre o curso.",
  privacy: "Usamos seus dados apenas para falar sobre o curso. Você pode pedir para sair a qualquer momento.",
  submit: "VER MEU RESULTADO",
  sending: "Enviando...",
  errors: {
    name: "Digite seu nome",
    whatsapp: "Digite um WhatsApp válido com DDD",
    email: "Digite um e-mail válido",
    consent: "Marque a caixa para continuar",
    generic: "Não conseguimos enviar agora. Tente de novo em instantes.",
  },
};

export type ProfileKey = "relacionamento" | "vitrine" | "estrategista" | "iniciante";

export const profiles: Record<ProfileKey, {
  name: string; path: string; description: string; firstStep: string; checklist: string[];
}> = {
  relacionamento: {
    name: "Vendedora(o) de Relacionamento",
    path: "Instagram + WhatsApp + Facebook Marketplace",
    description:
      "Você gosta de conversar e de atender bem as pessoas — e isso é uma grande vantagem nas vendas pelo celular. Muita gente compra de quem passa confiança. Seu caminho é usar o WhatsApp para atender, o Instagram para mostrar quem você é e o Marketplace do Facebook para encontrar compradores perto de você.",
    firstStep: "Escolher um produto simples e anunciá-lo no Facebook Marketplace da sua cidade.",
    checklist: [
      "Organizar seu WhatsApp com uma mensagem de boas-vindas",
      "Publicar seu primeiro anúncio no Marketplace com boas fotos",
      "Responder cada interessado com calma e simpatia",
    ],
  },
  vitrine: {
    name: "Criadora(or) de Vitrine",
    path: "Instagram + loja online simples",
    description:
      "Você tem bom gosto e gosta de mostrar coisas bonitas. No mundo online, uma boa foto e uma vitrine caprichada fazem diferença. Seu caminho é montar um perfil de Instagram bem cuidado e uma loja online simples, feita pelo próprio celular, para as pessoas comprarem com facilidade.",
    firstStep: "Montar um perfil de Instagram profissional com nome, foto e descrição clara.",
    checklist: [
      "Escolher um tema bonito para seu perfil",
      "Tirar fotos dos produtos com luz natural",
      "Criar uma loja online simples com poucos produtos",
    ],
  },
  estrategista: {
    name: "Estrategista de Produto",
    path: "Escolha de produtos certos + pequenos anúncios no Facebook e Instagram",
    description:
      "Você gosta de pesquisar, organizar e pensar antes de agir. Isso ajuda muito na parte mais importante: escolher o produto certo. Seu caminho é aprender a avaliar produtos com calma e testar pequenos anúncios no Facebook e Instagram, com valores baixos, acompanhando os números.",
    firstStep: "Fazer uma lista de 5 produtos e comparar preço, procura e concorrência.",
    checklist: [
      "Pesquisar o que já está sendo procurado na sua região",
      "Anotar custos e preço de venda de cada produto",
      "Testar um anúncio pequeno, com valor que não pese no bolso",
    ],
  },
  iniciante: {
    name: "Iniciante Protegida(o)",
    path: "Começo seguro, passo a passo, com investimento mínimo",
    description:
      "Você quer começar, mas com segurança — e isso é muito sensato. Na internet existem golpes, e saber se proteger é o primeiro passo. Seu caminho é começar devagar, aprendendo cada etapa no seu ritmo, sem gastar quase nada, até ganhar confiança para ir além.",
    firstStep: "Aprender a reconhecer sinais de golpe e a vender com segurança pelo celular.",
    checklist: [
      "Configurar a segurança do seu WhatsApp e redes sociais",
      "Começar vendendo algo que você já tem em casa",
      "Receber pagamentos só por meios seguros",
    ],
  },
};

export const result = {
  eyebrow: "Seu perfil é",
  pathLabel: "Melhor caminho para você",
  firstStepLabel: "Seu primeiro passo recomendado",
  checklistLabel: "Seus 3 primeiros passos",
  cta: "QUERO COMEÇAR PELO MEU PERFIL",
  restart: "Refazer o quiz",
};
