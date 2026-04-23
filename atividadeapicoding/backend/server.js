require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const subjectRoutes = require('./routes/subjectRoutes');


// middlewares
app.use(cors());
app.use(express.json());
app.use('/subjects', subjectRoutes);
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

const Subject = require('./models/Subject');

app.get('/test', async (req, res) => {
  const subject = new Subject({ name: 'Matemática' });
  await subject.save();
  res.json(subject);
});

// iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});



