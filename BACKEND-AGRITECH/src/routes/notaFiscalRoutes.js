import { Router } from "express";
import * as notaFiscalController from "../controllers/notaFiscalController.js";
import { validarId } from "../middlewares/middlewares.js";


const router = Router();

router.get("/", notaFiscalController.listar);
router.get("/:id", validarId, notaFiscalController.buscarPorId);
router.post("/", notaFiscalController.criar);
router.put("/:id", validarId, notaFiscalController.atualizar);
router.delete("/:id", validarId, notaFiscalController.excluir);

export default router;