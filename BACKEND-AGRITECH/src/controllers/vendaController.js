import * as vendaModel from "../models/vendaModel.js";
import { inteiroPositivo, textoValido } from "../utils/Utils.js";

export function listar(req, res, next) {
    vendaModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    vendaModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Venda não encontrada" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { id_usuario, valor_total = 0, status_venda } = req.body ?? {};
    if (!inteiroPositivo(id_usuario) || !inteiroPositivo(valor_total) || !textoValido(status_venda, 50)) {
        return res.status(400).json({
            erro: "Informe id_usuario válido, valor_total (>= 0) e status_venda (até 50 caracteres)"
        });
    }
    const dados = {
        id_usuario: Number(id_usuario),
        valor_total: Number(valor_total),
        status_venda: status_venda.trim()
    };

    vendaModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Venda cadastrada com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    const { id_usuario, valor_total = 0, status_venda } = req.body ?? {};
    if (!inteiroPositivo(id_usuario) || !inteiroPositivo(valor_total) || !textoValido(status_venda, 50)) {
        return res.status(400).json({
            erro: "Informe id_usuario válido, valor_total (>= 0) e status_venda (até 50 caracteres)"
        });
    }
    const dados = {
        id_usuario: Number(id_usuario),
        valor_total: Number(valor_total),
        status_venda: status_venda.trim()
    };

    // Consulta didática para confirmar que o registro existe antes de editar.
    vendaModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Venda não encontrada" });
        }
        vendaModel.atualizar(req.id, dados, (erro, resultado) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Venda atualizada com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    vendaModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Venda não encontrada" });
        }
        return res.status(200).json({ mensagem: "Venda excluída com sucesso" });
    });
}