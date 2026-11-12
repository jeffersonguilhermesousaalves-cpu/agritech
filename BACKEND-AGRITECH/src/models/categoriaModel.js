import conexao from "../config/database.js";

export function listar(callback) {
    const sql = "SELECT * FROM categoria";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM categoria WHERE id_categoria = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO categoria SET ?";
    conexao.query(sql, [dados], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE categoria SET ? WHERE id_categoria = ?";
    conexao.query(sql, [dados, id], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM categoria WHERE id_categoria = ?";
    conexao.query(sql, [id], callback);
}