import conexao from "../config/database.js";

export function listar(callback) {
    const sql = "SELECT * FROM item_carrinho";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM item_carrinho WHERE id_item_carrinho = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO item_carrinho SET ?";
    conexao.query(sql, [dados], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE item_carrinho SET ? WHERE id_item_carrinho = ?";
    conexao.query(sql, [dados, id], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM item_carrinho WHERE id_item_carrinho = ?";
    conexao.query(sql, [id], callback);
}