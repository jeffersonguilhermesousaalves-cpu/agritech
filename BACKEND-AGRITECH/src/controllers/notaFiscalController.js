import * as notaFiscalModel from "../models/notaFiscalModel.js";
import { inteiroPositivo, textoValido } from "../utils/Utils.js";

export function listar(req, res, next) {
    notaFiscalModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    notaFiscalModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Nota fiscal não encontrada" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { id_venda, chave_acesso, valor_imposto = 0 } = req.body ?? {};
    if (!inteiroPositivo(id_venda) || !textoValido(chave_acesso, 100) || !inteiroPositivo(valor_imposto)) {
        return res.status(400).json({
            erro: "Informe id_venda válido, chave_acesso (até 100 caracteres) e valor_imposto (>= 0)"
        });
    }
    const dados = {
        id_venda: Number(id_venda),
        chave_acesso: chave_acesso.trim(),
        valor_imposto: Number(valor_imposto)
    };

    notaFiscalModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Nota fiscal cadastrada com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    const { id_venda, chave_acesso, valor_imposto = 0 } = req.body ?? {};
    if (!inteiroPositivo(id_venda) || !textoValido(chave_acesso, 100) || !inteiroPositivo(valor_imposto)) {
        return res.status(400).json({
            erro: "Informe id_venda válido, chave_acesso (até 100 caracteres) e valor_imposto (>= 0)"
        });
    }
    const dados = {
        id_venda: Number(id_venda),
        chave_acesso: chave_acesso.trim(),
        valor_imposto: Number(valor_imposto)
    };

    // Consulta didática para confirmar que o registro existe antes de editar.
    notaFiscalModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Nota fiscal não encontrada" });
        }
        notaFiscalModel.atualizar(req.id, dados, (erro, resultado) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Nota fiscal atualizada com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    notaFiscalModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Nota fiscal não encontrada" });
        }
        return res.status(200).json({ mensagem: "Nota fiscal excluída com sucesso" });
    });
}