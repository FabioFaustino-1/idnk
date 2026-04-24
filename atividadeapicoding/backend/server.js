require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const subjectRoutes = require('./routes/subjectRoutes'); // Importação movida para o topo

const app = express();


// middlewares
app.use(cors());
app.use(express.json());

// conexão com MongoDB
console.log('URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB conectado');
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar no MongoDB:', err);
  });

// rota teste
app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

// Registro das rotas de matérias
app.use('/subjects', subjectRoutes);

// iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
