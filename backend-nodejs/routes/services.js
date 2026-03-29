const express = require('express');
const router = express.Router();

const services = [
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

const countryPrices = {
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

router.get('/', (req, res) => {
  const country = req.query.country || 'BR';
  const servicesWithCountryPrice = services.map(service => ({
    ...service,
    finalPrice: (service.price * (countryPrices[country]?.multiplier || 1.0)).toFixed(2)
  }));
  res.json(servicesWithCountryPrice);
});

router.get('/countries', (req, res) => {
  res.json(countryPrices);
});

router.get('/:id', (req, res) => {
  const service = services.find(s => s.id === parseInt(req.params.id));
  if (!service) {
    return res.status(404).json({ error: 'Serviço não encontrado' });
  }
  res.json(service);
});

module.exports = router;
