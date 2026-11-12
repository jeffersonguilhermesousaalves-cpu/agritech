import conexao from "../config/database.js";

export function listar(callback) {
    const sql = "SELECT * FROM endereco";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM endereco WHERE id_endereco = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO endereco SET ?";
    conexao.query(sql, [dados], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE endereco SET ? WHERE id_endereco = ?";
    conexao.query(sql, [dados, id], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM endereco WHERE id_endereco = ?";
    conexao.query(sql, [id], callback);
}