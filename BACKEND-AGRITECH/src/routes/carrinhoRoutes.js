import { Router } from "express";
import * as carrinhoController from "../controllers/carrinhoController.js";
import { validarId } from "../middlewares/middlewares.js";


const router = Router();

router.get("/", carrinhoController.listar);
router.get("/:id", validarId, carrinhoController.buscarPorId);
router.post("/", carrinhoController.criar);
router.put("/:id", validarId, carrinhoController.atualizar);
router.delete("/:id", validarId, carrinhoController.excluir);

export default router;