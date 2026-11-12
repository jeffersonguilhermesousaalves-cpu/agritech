import conexao from "../config/database.js";

export function listar(callback) {
    const sql = "SELECT * FROM nota_fiscal";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM nota_fiscal WHERE id_nota_fiscal = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO nota_fiscal SET ?";
    conexao.query(sql, [dados], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE nota_fiscal SET ? WHERE id_nota_fiscal = ?";
    conexao.query(sql, [dados, id], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM nota_fiscal WHERE id_nota_fiscal = ?";
    conexao.query(sql, [id], callback);
}