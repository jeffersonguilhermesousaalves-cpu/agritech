import * as estoqueModel from "../models/estoqueModel.js";
import { inteiroPositivo, textoValido } from "../utils/Utils.js";

export function listar(req, res, next) {
    estoqueModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    estoqueModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Registro de estoque não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { id_produto, quantidade = 0, localizacao, lote } = req.body ?? {};
    if (
        !inteiroPositivo(id_produto) ||
        !inteiroPositivo(quantidade) ||
        !textoValido(localizacao, 100) ||
        !textoValido(lote, 50)
    ) {
        return res.status(400).json({
            erro: "Informe id_produto válido, quantidade (>= 0), localizacao (até 100) e lote (até 50)"
        });
    }
    const dados = {
        id_produto: Number(id_produto),
        quantidade: Number(quantidade),
        localizacao: localizacao ? localizacao.trim() : null,
        lote: lote ? lote.trim() : null
    };

    estoqueModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Estoque cadastrado com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    const { id_produto, quantidade = 0, localizacao, lote } = req.body ?? {};
    if (
        !inteiroPositivo(id_produto) ||
        !inteiroPositivo(quantidade) ||
        !textoValido(localizacao, 100) ||
        !textoValido(lote, 50)
    ) {
        return res.status(400).json({
            erro: "Informe id_produto válido, quantidade (>= 0), localizacao (até 100) e lote (até 50)"
        });
    }
    const dados = {
        id_produto: Number(id_produto),
        quantidade: Number(quantidade),
        localizacao: localizacao ? localizacao.trim() : null,
        lote: lote ? lote.trim() : null
    };

    // Consulta didática para confirmar que o registro existe antes de editar.
    estoqueModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Registro de estoque não encontrado" });
        }
        estoqueModel.atualizar(req.id, dados, (erro, resultado) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Estoque atualizado com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    estoqueModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Registro de estoque não encontrado" });
        }
        return res.status(200).json({ mensagem: "Estoque excluído com sucesso" });
    });
}