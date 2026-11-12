import * as carrinhoModel from "../models/carrinhoModel.js";
import { inteiroPositivo } from "../utils/Utils.js";

export function listar(req, res, next) {
    carrinhoModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    carrinhoModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Carrinho não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { id_usuario } = req.body ?? {};
    if (!inteiroPositivo(id_usuario)) {
        return res.status(400).json({ erro: "Informe um id_usuario válido" });
    }
    const dados = { id_usuario: Number(id_usuario) };

    carrinhoModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Carrinho cadastrado com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    const { id_usuario } = req.body ?? {};
    if (!inteiroPositivo(id_usuario)) {
        return res.status(400).json({ erro: "Informe um id_usuario válido" });
    }
    const dados = { id_usuario: Number(id_usuario) };

    // Consulta didática para confirmar que o registro existe antes de editar.
    carrinhoModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Carrinho não encontrado" });
        }
        carrinhoModel.atualizar(req.id, dados, (erro, resultado) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Carrinho atualizado com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    carrinhoModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Carrinho não encontrado" });
        }
        return res.status(200).json({ mensagem: "Carrinho excluído com sucesso" });
    });
}