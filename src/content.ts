// Todos los textos del embudo están aquí para facilitar la edición.

export const DISCLAIMER =
  "Este contenido es educativo. Los resultados varían de persona a persona y dependen del esfuerzo, del producto elegido y del mercado. No garantizamos ingresos específicos.";

export const intro = {
  brand: "Tienda en el Celular 45+",
  headline: "Después de los 45, el celular en tu mano puede convertirse en tu propio negocio.",
  sub: "Responde 8 preguntas rápidas (2 minutos) y descubre cuál es tu perfil de vendedor(a) online y por dónde empezar.",
  button: "EMPEZAR AHORA",
  trust: [
    "Sin necesidad de computadora",
    "Empieza con poca inversión",
    "Explicado paso a paso, sin vueltas",
  ],
};

export type QuestionId = "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7" | "q8";
export type Option = { value: string; label: string };
export type Question = { id: QuestionId; title: string; options: Option[] };

export const questions: Question[] = [
  { id: "q1", title: "¿Cuál es tu rango de edad?", options: [
    { value: "45-49", label: "45 a 49 años" },
    { value: "50-59", label: "50 a 59 años" },
    { value: "60+", label: "60 años o más" },
    { value: "<45", label: "Menos de 45 años" },
  ]},
  { id: "q2", title: "Hoy, ¿cómo usas el celular?", options: [
    { value: "social", label: "Solo WhatsApp y redes sociales" },
    { value: "some_online", label: "Ya compro o vendo algo online a veces" },
    { value: "skilled", label: "Lo uso bien, aprendo rápido con apps" },
    { value: "difficulty", label: "Me cuesta, necesito ayuda paso a paso" },
  ]},
  { id: "q3", title: "¿Ya intentaste ganar dinero por internet?", options: [
    { value: "never", label: "Nunca lo intenté" },
    { value: "failed", label: "Lo intenté y no funcionó" },
    { value: "sold", label: "Ya vendí algunas cosas" },
    { value: "business", label: "Ya tengo un pequeño negocio" },
  ]},
  { id: "q4", title: "¿Cuánto tiempo al día tendrías para esto?", options: [
    { value: "1h", label: "Hasta 1 hora" },
    { value: "1-2h", label: "1 a 2 horas" },
    { value: "3h+", label: "3 horas o más" },
  ]},
  { id: "q5", title: "¿Cuánto te sentirías cómodo(a) invirtiendo para empezar?", options: [
    { value: "zero", label: "Casi nada, quiero empezar desde cero" },
    { value: "20", label: "Hasta 20 USD" },
    { value: "20-100", label: "De 20 a 100 USD" },
    { value: "100+", label: "Más de 100 USD" },
  ]},
  { id: "q6", title: "¿Qué te describe mejor?", options: [
    { value: "talk", label: "Me gusta conversar y atender personas" },
    { value: "organize", label: "Me gusta organizar e investigar" },
    { value: "create", label: "Me gusta crear y mostrar cosas lindas" },
    { value: "numbers", label: "Me gustan los números y la estrategia" },
  ]},
  { id: "q7", title: "¿Cuál es tu objetivo principal?", options: [
    { value: "extra", label: "Un ingreso extra a fin de mes" },
    { value: "bills", label: "Ayudar a pagar las cuentas de la casa" },
    { value: "main", label: "Convertirlo en mi fuente principal de ingresos" },
    { value: "hobby", label: "Tener un pasatiempo que también genere dinero" },
  ]},
  { id: "q8", title: "¿Qué es lo que más te frena hoy?", options: [
    { value: "scam", label: "Miedo a caer en una estafa" },
    { value: "product", label: "No sé qué producto vender" },
    { value: "store", label: "No sé crear una tienda o un anuncio" },
    { value: "time", label: "Falta de tiempo" },
  ]},
];

export const quizUi = {
  progress: (n: number, total: number) => `Pregunta ${n} de ${total}`,
  back: "Volver",
};

export const analyzing = {
  title: "Analizando tus respuestas...",
  lines: [
    "Estamos armando tu perfil con calma.",
    "Tus datos están protegidos.",
    "¡Ya falta poquito!",
  ],
};

export const leadForm = {
  title: "¡Tu perfil está listo!",
  sub: "Para ver el resultado y recibir tu mapa personalizado, completa:",
  name: "Nombre",
  whatsapp: "WhatsApp",
  email: "Correo electrónico",
  consent: "Acepto recibir información sobre el curso.",
  privacy: "Usamos tus datos solo para hablar sobre el curso. Puedes pedir salir en cualquier momento.",
  submit: "VER MI RESULTADO",
  sending: "Enviando...",
  errors: {
    name: "Escribe tu nombre",
    whatsapp: "Escribe un número de WhatsApp válido",
    email: "Escribe un correo electrónico válido",
    consent: "Marca la casilla para continuar",
    generic: "No pudimos enviar ahora. Inténtalo de nuevo en unos instantes.",
  },
};

/** Códigos de país comunes en Sudamérica para el campo de WhatsApp. */
export const countryCodes = [
  { code: "54", label: "Argentina", iso: "AR" },
  { code: "57", label: "Colombia", iso: "CO" },
  { code: "56", label: "Chile", iso: "CL" },
  { code: "51", label: "Perú", iso: "PE" },
  { code: "593", label: "Ecuador", iso: "EC" },
  { code: "591", label: "Bolivia", iso: "BO" },
  { code: "595", label: "Paraguay", iso: "PY" },
  { code: "598", label: "Uruguay", iso: "UY" },
  { code: "58", label: "Venezuela", iso: "VE" },
  { code: "55", label: "Brasil", iso: "BR" },
] as const;

export type ProfileKey = "relacionamento" | "vitrine" | "estrategista" | "iniciante";

export const profiles: Record<ProfileKey, {
  name: string; path: string; description: string; firstStep: string; checklist: string[];
}> = {
  relacionamento: {
    name: "Vendedor(a) de Relaciones",
    path: "Instagram + WhatsApp + Facebook Marketplace",
    description:
      "Te gusta conversar y atender bien a las personas — y eso es una gran ventaja en las ventas por celular. Mucha gente compra a quien le transmite confianza. Tu camino es usar WhatsApp para atender, Instagram para mostrar quién eres y el Marketplace de Facebook para encontrar compradores cerca de ti.",
    firstStep: "Elegir un producto simple y anunciarlo en el Facebook Marketplace de tu ciudad.",
    checklist: [
      "Organizar tu WhatsApp con un mensaje de bienvenida",
      "Publicar tu primer anuncio en Marketplace con buenas fotos",
      "Responder a cada interesado con calma y simpatía",
    ],
  },
  vitrine: {
    name: "Creador(a) de Vitrina",
    path: "Instagram + tienda online simple",
    description:
      "Tienes buen gusto y te gusta mostrar cosas lindas. En el mundo online, una buena foto y una vitrina bien cuidada hacen la diferencia. Tu camino es armar un perfil de Instagram bien cuidado y una tienda online simple, hecha desde el propio celular, para que las personas compren con facilidad.",
    firstStep: "Crear un perfil de Instagram profesional con nombre, foto y descripción clara.",
    checklist: [
      "Elegir un estilo bonito para tu perfil",
      "Tomar fotos de los productos con luz natural",
      "Crear una tienda online simple con pocos productos",
    ],
  },
  estrategista: {
    name: "Estratega de Producto",
    path: "Elección de los productos correctos + pequeños anuncios en Facebook e Instagram",
    description:
      "Te gusta investigar, organizar y pensar antes de actuar. Eso ayuda mucho en la parte más importante: elegir el producto correcto. Tu camino es aprender a evaluar productos con calma y probar pequeños anuncios en Facebook e Instagram, con valores bajos, siguiendo los números.",
    firstStep: "Hacer una lista de 5 productos y comparar precio, demanda y competencia.",
    checklist: [
      "Investigar qué se está buscando en tu región",
      "Anotar costos y precio de venta de cada producto",
      "Probar un anuncio pequeño, con un valor que no pese en el bolsillo",
    ],
  },
  iniciante: {
    name: "Principiante Protegido(a)",
    path: "Comienzo seguro, paso a paso, con inversión mínima",
    description:
      "Quieres empezar, pero con seguridad — y eso es muy sensato. En internet existen estafas, y saber protegerte es el primer paso. Tu camino es empezar despacio, aprendiendo cada etapa a tu ritmo, sin gastar casi nada, hasta ganar confianza para ir más lejos.",
    firstStep: "Aprender a reconocer señales de estafa y a vender con seguridad desde el celular.",
    checklist: [
      "Configurar la seguridad de tu WhatsApp y redes sociales",
      "Empezar vendiendo algo que ya tienes en casa",
      "Recibir pagos solo por medios seguros",
    ],
  },
};

export const result = {
  eyebrow: "Tu perfil es",
  pathLabel: "Mejor camino para ti",
  firstStepLabel: "Tu primer paso recomendado",
  checklistLabel: "Tus 3 primeros pasos",
  cta: "QUIERO EMPEZAR SEGÚN MI PERFIL",
  restart: "Rehacer el quiz",
};
