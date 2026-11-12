import conexao from '../../db.js';

const db = conexao.promise();

export const ProdutoModel = {
  async listarTodos() {
    const [rows] = await db.query(`
      SELECT p.*, c.nome AS nome_categoria 
      FROM produto p 
      LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
    `);
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.query('SELECT * FROM produto WHERE id_produto = ?', [id]);
    return rows[0];
  },

  async criar(dados) {
    const { id_categoria, nome, descricao, preco } = dados;
    const [result] = await db.query(
      'INSERT INTO produto (id_categoria, nome, descricao, preco) VALUES (?, ?, ?, ?)',
      [id_categoria, nome, descricao, preco]
    );
    return { id_produto: result.insertId, ...dados };
  },

  async atualizar(id, dados) {
    const { id_categoria, nome, descricao, preco } = dados;
    await db.query(
      'UPDATE produto SET id_categoria = ?, nome = ?, descricao = ?, preco = ? WHERE id_produto = ?',
      [id_categoria, nome, descricao, preco, id]
    );
    return { id_produto: id, ...dados };
  },

  async deletar(id) {
    await db.query('DELETE FROM produto WHERE id_produto = ?', [id]);
    return true;
  }
};