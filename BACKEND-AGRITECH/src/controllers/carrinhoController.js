import { CarrinhoModel } from '../models/carrinhoModel.js';

export const CarrinhoController = {
  async obterCarrinho(req, res) {
    try {
      const carrinho = await CarrinhoModel.buscarOuCriarCarrinho(req.params.id_usuario);
      const itens = await CarrinhoModel.listarItens(carrinho.id_carrinho);
      res.json({ ...carrinho, itens });
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao procurar carrinho', erro: erro.message });
    }
  },

  async adicionarItem(req, res) {
    try {
      const itemAdicionado = await CarrinhoModel.adicionarItem(req.body);
      res.status(201).json(itemAdicionado);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao adicionar item ao carrinho', erro: erro.message });
    }
  },

  async removerItem(req, res) {
    try {
      await CarrinhoModel.removerItem(req.params.id_item);
      res.json({ mensagem: 'Item removido do carrinho com sucesso' });
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao remover item do carrinho', erro: erro.message });
    }
  }
};
