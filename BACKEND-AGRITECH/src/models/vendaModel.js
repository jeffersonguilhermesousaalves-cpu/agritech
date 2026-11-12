import conexao from "../config/database.js";

export function listar(callback) {
    const sql = "SELECT * FROM venda";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM venda WHERE id_venda = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO venda SET ?";
    conexao.query(sql, [dados], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE venda SET ? WHERE id_venda = ?";
    conexao.query(sql, [dados, id], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM venda WHERE id_venda = ?";
    conexao.query(sql, [id], callback);
}