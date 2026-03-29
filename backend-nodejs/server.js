require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.DB_NAME
})
.then(() => console.log('✅ MongoDB conectado com sucesso'))
.catch(err => console.error('❌ Erro ao conectar MongoDB:', err));

// Routes
const chatbotRoutes = require('./routes/chatbot');
const paymentRoutes = require('./routes/payment');
const servicesRoutes = require('./routes/services');

app.use('/api/chatbot', chatbotRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/services', servicesRoutes);

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'SMSCorvo API - Online!' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
