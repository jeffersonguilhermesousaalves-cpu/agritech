import * as itemCarrinhoModel from "../models/itemCarrinhoModel.js";
import { inteiroPositivo } from "../utils/Utils.js";

export function listar(req, res, next) {
    itemCarrinhoModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    itemCarrinhoModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Item do carrinho não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { id_carrinho, id_produto, quantidade = 1 } = req.body ?? {};
    if (!inteiroPositivo(id_carrinho) || !inteiroPositivo(id_produto) || !inteiroPositivo(quantidade)) {
        return res.status(400).json({
            erro: "Informe id_carrinho, id_produto e quantidade inteiros maiores que 0"
        });
    }
    const dados = {
        id_carrinho: Number(id_carrinho),
        id_produto: Number(id_produto),
        quantidade: Number(quantidade)
    };

    itemCarrinhoModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Item adicionado ao carrinho com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    const { id_carrinho, id_produto, quantidade = 1 } = req.body ?? {};
    if (!inteiroPositivo(id_carrinho) || !inteiroPositivo(id_produto) || !inteiroPositivo(quantidade)) {
        return res.status(400).json({
            erro: "Informe id_carrinho, id_produto e quantidade inteiros maiores que 0"
        });
    }
    const dados = {
        id_carrinho: Number(id_carrinho),
        id_produto: Number(id_produto),
        quantidade: Number(quantidade)
    };

    // Consulta didática para confirmar que o registro existe antes de editar.
    itemCarrinhoModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Item do carrinho não encontrado" });
        }
        itemCarrinhoModel.atualizar(req.id, dados, (erro, resultado) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Item do carrinho atualizado com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    itemCarrinhoModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Item do carrinho não encontrado" });
        }
        return res.status(200).json({ mensagem: "Item do carrinho excluído com sucesso" });
    });
}