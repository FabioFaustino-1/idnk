const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// --- CRUD DE MATÉRIAS ---

// Criar uma nova matéria
router.post('/', async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todas as matérias
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obter uma matéria específica por ID (opcional, mas útil)
router.get('/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: "Matéria não encontrada" });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar uma matéria (título, descrição, cor)
router.put('/:id', async (req, res) => {
  try {
    const { name, description, color } = req.body;
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, description, color },
      { new: true, runValidators: true } // 'new: true' retorna o documento atualizado, 'runValidators' executa as validações do schema
    );
    if (!subject) return res.status(404).json({ message: "Matéria não encontrada" });
    res.json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Excluir uma matéria
router.delete('/:id', async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ message: "Matéria não encontrada" });
    res.json({ message: "Matéria removida com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;