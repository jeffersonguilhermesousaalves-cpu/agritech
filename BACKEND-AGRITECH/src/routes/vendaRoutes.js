import { Router } from "express";
import * as vendaController from "../controllers/vendaController.js";
import { validarId } from "../middlewares/middlewares.js";


const router = Router();

router.get("/", vendaController.listar);
router.get("/:id", validarId, vendaController.buscarPorId);
router.post("/", vendaController.criar);
router.put("/:id", validarId, vendaController.atualizar);
router.delete("/:id", validarId, vendaController.excluir);

export default router;