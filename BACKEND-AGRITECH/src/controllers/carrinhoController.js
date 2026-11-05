import * as carrinhoModel from "../models/carrinhoModel.js";


export function listar(req, res, next){
    carrinhoModel.listar((erro, resultado)=>{
        if(erro) return next(erro);
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

