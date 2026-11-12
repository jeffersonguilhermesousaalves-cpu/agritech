import conexao from '../../db.js';

const db = conexao.promise();

export const CategoriaModel = {
  async listarTodos() {
    const [rows] = await db.query('SELECT * FROM categoria');
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.query('SELECT * FROM categoria WHERE id_categoria = ?', [id]);
    return rows[0];
  },

  async criar(dados) {
    const { nome, descricao } = dados;
    const [result] = await db.query(
      'INSERT INTO categoria (nome, descricao) VALUES (?, ?)',
      [nome, descricao]
    );
    return { id_categoria: result.insertId, ...dados };
  },

  async atualizar(id, dados) {
    const { nome, descricao } = dados;
    await db.query(
      'UPDATE categoria SET nome = ?, descricao = ? WHERE id_categoria = ?',
      [nome, descricao, id]
    );
    return { id_categoria: id, ...dados };
  },

  async deletar(id) {
    await db.query('DELETE FROM categoria WHERE id_categoria = ?', [id]);
    return true;
  }
};
