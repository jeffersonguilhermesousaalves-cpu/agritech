import { Router } from "express";
import * as estoqueController from "../controllers/estoqueController.js";
import { validarId } from "../middlewares/middlewares.js";


const router = Router();

router.get("/", estoqueController.listar);
router.get("/:id", validarId, estoqueController.buscarPorId);
router.post("/", estoqueController.criar);
router.put("/:id", validarId, estoqueController.atualizar);
router.delete("/:id", validarId, estoqueController.excluir);

export default router;