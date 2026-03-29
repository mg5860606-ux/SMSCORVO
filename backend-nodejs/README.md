# SMSCorvo Backend - Node.js

Backend em Node.js/Express para a plataforma SMSCorvo.

## Tecnologias
- Node.js 18+
- Express.js
- MongoDB (Mongoose)
- Stripe (pagamentos)
- Emergent LLM (chatbot)

## Instalação

```bash
npm install
```

## Variáveis de Ambiente

Crie um arquivo `.env`:

```
PORT=8001
MONGO_URL=mongodb://localhost:27017/smscorvo
DB_NAME=smscorvo
EMERGENT_LLM_KEY=sua-chave-aqui
STRIPE_SECRET_KEY=sua-chave-stripe
CORS_ORIGINS=*
```

## Desenvolvimento

```bash
npm run dev
```

## Produção

```bash
npm start
```

## Deploy na Render

1. Configure as variáveis de ambiente no painel da Render
2. Use o comando de build: `npm install`
3. Use o comando de start: `npm start`
4. Certifique-se de ter um MongoDB (recomendado: MongoDB Atlas)

## Endpoints

### Chatbot
- `POST /api/chatbot/chat` - Enviar mensagem
- `GET /api/chatbot/history/:session_id` - Histórico

### Pagamentos
- `POST /api/payment/create-payment-intent` - Criar pagamento
- `POST /api/payment/webhook` - Webhook Stripe
- `GET /api/payment/balance/:email` - Consultar saldo

### Serviços
- `GET /api/services` - Listar serviços
- `GET /api/services/:id` - Buscar serviço
