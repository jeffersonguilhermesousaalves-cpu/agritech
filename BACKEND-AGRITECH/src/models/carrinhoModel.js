import conexao from '../../db.js';

const db = conexao.promise();

export const CarrinhoModel = {
  async buscarOuCriarCarrinho(id_usuario) {
    let [rows] = await db.query('SELECT * FROM carrinho WHERE id_usuario = ?', [id_usuario]);
    if (rows.length === 0) {
      const [result] = await db.query('INSERT INTO carrinho (id_usuario) VALUES (?)', [id_usuario]);
      return { id_carrinho: result.insertId, id_usuario };
    }
    return rows[0];
  },

  async listarItens(id_carrinho) {
    const [rows] = await db.query(`
      SELECT ic.*, p.nome, p.preco 
      FROM item_carrinho ic
      JOIN produto p ON ic.id_produto = p.id_produto
      WHERE ic.id_carrinho = ?
    `, [id_carrinho]);
    return rows;
  },

  async adicionarItem(dados) {
    const { id_carrinho, id_produto, quantidade } = dados;
    const [result] = await db.query(
      'INSERT INTO item_carrinho (id_carrinho, id_produto, quantidade) VALUES (?, ?, ?)',
      [id_carrinho, id_produto, quantidade]
    );
    return { id_item_carrinho: result.insertId, ...dados };
    // comentário
  },

  async removerItem(id_item_carrinho) {
    await db.query('DELETE FROM item_carrinho WHERE id_item_carrinho = ?', [id_item_carrinho]);
    return true;
  }
};