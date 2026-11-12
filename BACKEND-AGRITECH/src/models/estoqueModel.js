import conexao from '../../db.js';

const db = conexao.promise();

export const EstoqueModel = {
  async listarTodos() {
    const [rows] = await db.query('SELECT * FROM estoque');
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.query('SELECT * FROM estoque WHERE id_estoque = ?', [id]);
    return rows[0];
  },

  async buscarPorProduto(id_produto) {
    const [rows] = await db.query('SELECT * FROM estoque WHERE id_produto = ?', [id_produto]);
    return rows;
  },

  async criar(dados) {
    const { id_produto, quantidade, localizacao, lote } = dados;
    const [result] = await db.query(
      'INSERT INTO estoque (id_produto, quantidade, localizacao, lote) VALUES (?, ?, ?, ?)',
      [id_produto, quantidade, localizacao, lote]
    );
    return { id_estoque: result.insertId, ...dados };
  },

  async atualizar(id, dados) {
    const { quantidade, localizacao, lote } = dados;
    await db.query(
      'UPDATE estoque SET quantidade = ?, localizacao = ?, lote = ? WHERE id_estoque = ?',
      [quantidade, localizacao, lote, id]
    );
    return { id_estoque: id, ...dados };
  },

  async deletar(id) {
    await db.query('DELETE FROM estoque WHERE id_estoque = ?', [id]);
    return true;
  }
};