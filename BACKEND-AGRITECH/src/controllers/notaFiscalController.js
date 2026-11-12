import { NotaFiscalModel } from '../models/notaFiscalModel.js';

export const NotaFiscalController = {
  async buscarPorVenda(req, res) {
    try {
      const nota = await NotaFiscalModel.buscarPorVenda(req.params.id_venda);
      if (!nota) return res.status(404).json({ mensagem: 'Nota fiscal não encontrada para esta venda' });
      res.json(nota);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao buscar nota fiscal', erro: erro.message });
    }
  },

  async gerarNota(req, res) {
    try {
      const novaNota = await NotaFiscalModel.gerarNota(req.body);
      res.status(201).json(novaNota);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao gerar nota fiscal', erro: erro.message });
    }
  }
};