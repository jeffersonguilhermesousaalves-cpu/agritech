import conexao from '../../db.js';

const db = conexao.promise();

export const NotaFiscalModel = {
  async buscarPorVenda(id_venda) {
    const [rows] = await db.query('SELECT * FROM nota_fiscal WHERE id_venda = ?', [id_venda]);
    return rows[0];
  },

  async gerarNota(dados) {
    const { id_venda, chave_acesso, valor_imposto } = dados;
    const [result] = await db.query(
      'INSERT INTO nota_fiscal (id_venda, chave_acesso, valor_imposto) VALUES (?, ?, ?)',
      [id_venda, chave_acesso, valor_imposto]
    );
    return { id_nota_fiscal: result.insertId, ...dados };
  }
};