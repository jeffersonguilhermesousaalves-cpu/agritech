import conexao from '../../db.js';

const db = conexao.promise();

export const UsuarioModel = {
  async listarTodos() {
    const [rows] = await db.query('SELECT id_usuario, nome, email, cpf_cnpj, data_criacao FROM usuario');
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.query('SELECT id_usuario, nome, email, cpf_cnpj, data_criacao FROM usuario WHERE id_usuario = ?', [id]);
    return rows[0];
  },

  async criar(dados) {
    const { nome, email, senha, cpf_cnpj } = dados;
    const [result] = await db.query(
      'INSERT INTO usuario (nome, email, senha, cpf_cnpj) VALUES (?, ?, ?, ?)',
      [nome, email, senha, cpf_cnpj]
    );
    return { id_usuario: result.insertId, ...dados };
  },

  async atualizar(id, dados) {
    const { nome, email, senha, cpf_cnpj } = dados;
    await db.query(
      'UPDATE usuario SET nome = ?, email = ?, senha = ?, cpf_cnpj = ? WHERE id_usuario = ?',
      [nome, email, senha, cpf_cnpj, id]
    );
    return { id_usuario: id, ...dados };
  },

  async deletar(id) {
    await db.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
    return true;
  }
};