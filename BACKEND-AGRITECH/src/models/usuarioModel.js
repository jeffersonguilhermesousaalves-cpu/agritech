import conexao from "../config/database.js";

export function listar(callback) {
    const sql = "SELECT id_usuario, nome, email, cpf_cnpj, data_criacao FROM usuario";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT id_usuario, nome, email, cpf_cnpj, data_criacao FROM usuario WHERE id_usuario = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO usuario SET ?";
    conexao.query(sql, [dados], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE usuario SET ? WHERE id_usuario = ?";
    conexao.query(sql, [dados, id], callback);
}

export function excluir(id, callback) {
    const sql = "DELETE FROM usuario WHERE id_usuario = ?";
    conexao.query(sql, [id], callback);
}