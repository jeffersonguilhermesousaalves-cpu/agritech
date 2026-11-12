import conexao from "../config/database.js";

export function listar(callback) {
    const sql = "SELECT * FROM carrinho";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM carrinho WHERE id_carrinho = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO carrinho SET ?";
    conexao.query(sql, [dados], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE carrinho SET ? WHERE id_carrinho = ?";
    conexao.query(sql, [dados, id], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM carrinho WHERE id_carrinho = ?";
    conexao.query(sql, [id], callback);
}