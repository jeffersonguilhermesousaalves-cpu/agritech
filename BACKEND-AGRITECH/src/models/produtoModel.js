import conexao from "../config/database.js";

export function listar(callback) {
    const sql = "SELECT * FROM produto";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM produto WHERE id_produto = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO produto SET ?";
    conexao.query(sql, [dados], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE produto SET ? WHERE id_produto = ?";
    conexao.query(sql, [dados, id], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM produto WHERE id_produto = ?";
    conexao.query(sql, [id], callback);
}