// Mock data for SMSBear clone

export const services = [
  { id: 1, name: 'Google', icon: 'G', color: '#4285F4', price: 2.50, countries: ['BR', 'US', 'UK'] },
  { id: 2, name: 'WhatsApp', icon: 'W', color: '#25D366', price: 5.00, countries: ['BR', 'US', 'UK', 'PT'] },
  { id: 3, name: 'Discord', icon: 'D', color: '#5865F2', price: 2.50, countries: ['BR', 'US'] },
  { id: 4, name: 'Telegram', icon: 'T', color: '#0088cc', price: 3.00, countries: ['BR', 'US', 'UK', 'RU'] },
  { id: 5, name: 'Instagram', icon: 'I', color: '#E4405F', price: 4.50, countries: ['BR', 'US', 'UK'] },
  { id: 6, name: 'Facebook', icon: 'F', color: '#1877F2', price: 3.50, countries: ['BR', 'US', 'UK'] },
  { id: 7, name: 'Twitter', icon: 'X', color: '#000000', price: 3.50, countries: ['BR', 'US'] },
  { id: 8, name: 'TikTok', icon: 'T', color: '#000000', price: 4.00, countries: ['BR', 'US', 'UK'] },
  { id: 9, name: 'LinkedIn', icon: 'L', color: '#0A66C2', price: 4.50, countries: ['BR', 'US'] },
  { id: 10, name: 'Microsoft', icon: 'M', color: '#00A4EF', price: 2.50, countries: ['BR', 'US', 'UK'] },
];

// Preços por país (multiplicadores)
export const countryPrices = {
  'BR': { name: 'Brasil', flag: '🇧🇷', multiplier: 1.0 },
  'US': { name: 'Estados Unidos', flag: '🇺🇸', multiplier: 1.2 },
  'UK': { name: 'Reino Unido', flag: '🇬🇧', multiplier: 1.3 },
  'PT': { name: 'Portugal', flag: '🇵🇹', multiplier: 1.1 },
  'RU': { name: 'Rússia', flag: '🇷🇺', multiplier: 0.8 },
  'CN': { name: 'China', flag: '🇨🇳', multiplier: 0.9 },
  'IN': { name: 'Índia', flag: '🇮🇳', multiplier: 0.7 },
  'DE': { name: 'Alemanha', flag: '🇩🇪', multiplier: 1.25 },
  'FR': { name: 'França', flag: '🇫🇷', multiplier: 1.2 },
  'ES': { name: 'Espanha', flag: '🇪🇸', multiplier: 1.1 },
};

export const pricingPlans = [
  {
    id: 'basic',
    name: 'Básico',
    subtitle: 'Para começar',
    price: 5,
    bonus: 0,
    features: [
      'Depósito rápido via PIX',
      'Crédito após confirmação do pagamento',
      '50+ serviços'
    ],
    popular: false
  },
  {
    id: 'popular',
    name: 'Popular',
    subtitle: 'Plano com bônus',
    price: 50,
    bonus: 10,
    bonusAmount: 55,
    features: [
      'Depósito via PIX',
      'Crédito após confirmação do pagamento',
      '+10% de bônus',
      '50+ serviços'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'Bônus maior',
    price: 250,
    bonus: 20,
    bonusAmount: 300,
    features: [
      'Depósito via PIX',
      'Crédito após confirmação do pagamento',
      '+20% de bônus',
      '50+ serviços'
    ],
    popular: false
  }
];

export const faqItems = [
  {
    id: 1,
    question: 'Quais plataformas e aplicativos são compatíveis com este serviço?',
    answer: 'Nosso serviço é compatível com mais de 150 plataformas populares, incluindo Google, WhatsApp, Discord, Telegram, Instagram, Facebook, Twitter, TikTok, LinkedIn e muitos outros.'
  },
  {
    id: 2,
    question: 'Os números são permanentes ou temporários?',
    answer: 'Os números são temporários e destinados apenas para receber códigos de verificação SMS. Eles ficam disponíveis por um período limitado após a ativação.'
  },
  {
    id: 3,
    question: 'Minha dúvida não está aqui. Como faço para entrar em contato com o suporte?',
    answer: 'Você pode entrar em contato com nosso suporte 24/7 através do chat ao vivo no canto inferior direito da tela, ou através do nosso e-mail de suporte.'
  },
  {
    id: 4,
    question: 'Quanto tempo leva para receber o código SMS?',
    answer: 'Geralmente, os códigos SMS são recebidos em segundos. Em casos raros, pode levar até 5 minutos dependendo da plataforma.'
  },
  {
    id: 5,
    question: 'Como funciona o sistema de créditos?',
    answer: 'Cada número virtual custa uma quantidade específica de créditos. Você compra créditos fazendo depósitos via PIX e usa esses créditos para adquirir números temporários.'
  }
];

export const mockMessages = [
  {
    id: 1,
    service: 'Google',
    icon: 'G',
    color: '#4285F4',
    message: 'G-123456 é seu código de verificação do Google',
    time: '9:41'
  },
  {
    id: 2,
    service: 'WhatsApp',
    icon: 'W',
    color: '#25D366',
    message: 'Seu código de verificação é 123-456',
    time: '9:38'
  },
  {
    id: 3,
    service: 'Discord',
    icon: 'D',
    color: '#5865F2',
    message: 'Seu código de segurança Discord é: 1234',
    time: '9:35'
  },
  {
    id: 4,
    service: 'Telegram',
    icon: 'T',
    color: '#0088cc',
    message: 'Código Telegram: 1234 Você também pode tocar...',
    time: '9:32'
  }
];

export const stats = [
  { value: '150+', label: 'Serviços compatíveis' },
  { value: '99.9%', label: 'Cobertura de serviço' },
  { value: '24/7', label: 'Suporte disponível' }
];

export const mockUserData = {
  balance: 15.50,
  transactions: [
    { id: 1, type: 'deposit', amount: 50, bonus: 10, date: '2025-07-10', status: 'completed' },
    { id: 2, type: 'purchase', service: 'Google', amount: -2.50, date: '2025-07-10', number: '+55 11 98765-4321', country: 'BR' },
    { id: 3, type: 'purchase', service: 'WhatsApp', amount: -5.00, date: '2025-07-09', number: '+55 11 98765-4322', country: 'BR' }
  ],
  activeNumbers: [
    { id: 1, service: 'Google', number: '+55 11 98765-4321', country: 'BR', expiresIn: '5 min', status: 'waiting' },
    { id: 2, service: 'WhatsApp', number: '+55 11 98765-4322', country: 'BR', code: '123-456', status: 'received' }
  ]
};
