import conexao from "../config/database.js";

export function listar(callback) {
    const sql = "SELECT * FROM estoque";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM estoque WHERE id_estoque = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO estoque SET ?";
    conexao.query(sql, [dados], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE estoque SET ? WHERE id_estoque = ?";
    conexao.query(sql, [dados, id], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM estoque WHERE id_estoque = ?";
    conexao.query(sql, [id], callback);
}