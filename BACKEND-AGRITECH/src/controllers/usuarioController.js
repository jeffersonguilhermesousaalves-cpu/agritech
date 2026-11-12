import * as usuarioModel from "../models/usuarioModel.js";
import { textoValido } from "../utils/Utils.js";

export function listar(req, res, next) {
    usuarioModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    usuarioModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { nome, email, senha, cpf_cnpj } = req.body ?? {};
    if (
        !textoValido(nome, 150) ||
        !textoValido(email, 100) ||
        !textoValido(senha, 255) ||
        !textoValido(cpf_cnpj, 20)
    ) {
        return res.status(400).json({
            erro: "Informe nome (até 150), email (até 100), senha (até 255) e cpf_cnpj (até 20)"
        });
    }
    const dados = {
        nome: nome.trim(),
        email: email.trim(),
        senha: senha.trim(),
        cpf_cnpj: cpf_cnpj.trim()
    };

    usuarioModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    const { nome, email, senha, cpf_cnpj } = req.body ?? {};
    if (
        !textoValido(nome, 150) ||
        !textoValido(email, 100) ||
        !textoValido(senha, 255) ||
        !textoValido(cpf_cnpj, 20)
    ) {
        return res.status(400).json({
            erro: "Informe nome (até 150), email (até 100), senha (até 255) e cpf_cnpj (até 20)"
        });
    }
    const dados = {
        nome: nome.trim(),
        email: email.trim(),
        senha: senha.trim(),
        cpf_cnpj: cpf_cnpj.trim()
    };

    // Consulta didática para confirmar que o registro existe antes de editar.
    usuarioModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        usuarioModel.atualizar(req.id, dados, (erro, resultado) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    usuarioModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        return res.status(200).json({ mensagem: "Usuário excluído com sucesso" });
    });
}