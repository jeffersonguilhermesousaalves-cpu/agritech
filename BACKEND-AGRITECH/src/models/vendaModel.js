import conexao from '../../db.js';

const db = conexao.promise();

export const VendaModel = {
  async listarTodas() {
    const [rows] = await db.query('SELECT * FROM venda');
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await db.query('SELECT * FROM venda WHERE id_venda = ?', [id]);
    return rows[0];
  },

  async criar(dados) {
    const { id_usuario, valor_total, status_venda } = dados;
    const [result] = await db.query(
      'INSERT INTO venda (id_usuario, valor_total, status_venda) VALUES (?, ?, ?)',
      [id_usuario, valor_total, status_venda || 'Pendente']
    );
    return { id_venda: result.insertId, ...dados };
  },

  async atualizarStatus(id_venda, status_venda) {
    await db.query('UPDATE venda SET status_venda = ? WHERE id_venda = ?', [status_venda, id_venda]);
    return { id_venda, status_venda };
  }
};