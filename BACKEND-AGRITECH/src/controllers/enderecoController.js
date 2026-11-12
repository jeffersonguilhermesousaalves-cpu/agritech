import * as enderecoModel from "../models/enderecoModel.js";
import { textoValido, inteiroPositivo } from "../utils/Utils.js";

export function listar(req, res, next) {
    enderecoModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    enderecoModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Endereço não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { id_usuario, rua, cidade, estado, cep } = req.body ?? {};
    if (
        !inteiroPositivo(id_usuario) ||
        !textoValido(rua, 200) ||
        !textoValido(cidade, 100) ||
        !textoValido(estado, 50) ||
        !textoValido(cep, 20)
    ) {
        return res.status(400).json({
            erro: "Informe id_usuario válido, rua (até 200), cidade (até 100), estado (até 50) e cep (até 20)"
        });
    }
    const dados = {
        id_usuario: Number(id_usuario),
        rua: rua.trim(),
        cidade: cidade.trim(),
        estado: estado.trim(),
        cep: cep.trim()
    };

    enderecoModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Endereço cadastrado com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    const { id_usuario, rua, cidade, estado, cep } = req.body ?? {};
    if (
        !inteiroPositivo(id_usuario) ||
        !textoValido(rua, 200) ||
        !textoValido(cidade, 100) ||
        !textoValido(estado, 50) ||
        !textoValido(cep, 20)
    ) {
        return res.status(400).json({
            erro: "Informe id_usuario válido, rua (até 200), cidade (até 100), estado (até 50) e cep (até 20)"
        });
    }
    const dados = {
        id_usuario: Number(id_usuario),
        rua: rua.trim(),
        cidade: cidade.trim(),
        estado: estado.trim(),
        cep: cep.trim()
    };

    // Consulta didática para confirmar que o registro existe antes de editar.
    enderecoModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Endereço não encontrado" });
        }
        enderecoModel.atualizar(req.id, dados, (erro, resultado) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Endereço atualizado com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    enderecoModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Endereço não encontrado" });
        }
        return res.status(200).json({ mensagem: "Endereço excluído com sucesso" });
    });
}