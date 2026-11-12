import conexao from '../../db.js';

const db = conexao.promise();

export const EnderecoModel = {
  async buscarPorUsuario(id_usuario) {
    const [rows] = await db.query('SELECT * FROM endereco WHERE id_usuario = ?', [id_usuario]);
    return rows;
  },

  async criar(dados) {
    const { id_usuario, rua, cidade, estado, cep } = dados;
    const [result] = await db.query(
      'INSERT INTO endereco (id_usuario, rua, cidade, estado, cep) VALUES (?, ?, ?, ?, ?)',
      [id_usuario, rua, cidade, estado, cep]
    );
    return { id_endereco: result.insertId, ...dados };
  },

  async atualizar(id, dados) {
    const { rua, cidade, estado, cep } = dados;
    await db.query(
      'UPDATE endereco SET rua = ?, cidade = ?, estado = ?, cep = ? WHERE id_endereco = ?',
      [rua, cidade, estado, cep, id]
    );
    return { id_endereco: id, ...dados };
  },

  async deletar(id) {
    await db.query('DELETE FROM endereco WHERE id_endereco = ?', [id]);
    return true;
  }
};