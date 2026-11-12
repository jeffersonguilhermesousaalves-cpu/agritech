import * as produtoModel from "../models/produtoModel.js";
import { textoValido, inteiroPositivo } from "../utils/Utils.js";

export function listar(req, res, next) {
    produtoModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    produtoModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { id_categoria, nome, descricao, preco } = req.body ?? {};
    if (!inteiroPositivo(id_categoria) || !textoValido(nome, 150) || !inteiroPositivo(preco)) {
        return res.status(400).json({
            erro: "Informe id_categoria válido, nome (até 150 caracteres) e preco maior ou igual a 0"
        });
    }
    const dados = {
        id_categoria: Number(id_categoria),
        nome: nome.trim(),
        descricao: descricao ? String(descricao).trim() : null,
        preco: Number(preco)
    };

    produtoModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Produto cadastrado com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    const { id_categoria, nome, descricao, preco } = req.body ?? {};
    if (!inteiroPositivo(id_categoria) || !textoValido(nome, 150) || !inteiroPositivo(preco)) {
        return res.status(400).json({
            erro: "Informe id_categoria válido, nome (até 150 caracteres) e preco maior ou igual a 0"
        });
    }
    const dados = {
        id_categoria: Number(id_categoria),
        nome: nome.trim(),
        descricao: descricao ? String(descricao).trim() : null,
        preco: Number(preco)
    };

    // Consulta didática para confirmar que o registro existe antes de editar.
    produtoModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }
        produtoModel.atualizar(req.id, dados, (erro, resultado) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Produto atualizado com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    produtoModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }
        return res.status(200).json({ mensagem: "Produto excluído com sucesso" });
    });
}