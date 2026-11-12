import { Router } from "express";
import * as itemCarrinhoController from "../controllers/itemCarrinhoController.js";
import { validarId } from "../middlewares/middlewares.js";


const router = Router();

router.get("/", itemCarrinhoController.listar);
router.get("/:id", validarId, itemCarrinhoController.buscarPorId);
router.post("/", itemCarrinhoController.criar);
router.put("/:id", validarId, itemCarrinhoController.atualizar);
router.delete("/:id", validarId, itemCarrinhoController.excluir);

export default router;