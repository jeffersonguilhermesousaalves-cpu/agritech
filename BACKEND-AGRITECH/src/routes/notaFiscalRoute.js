import { Router } from 'express';
import { NotaFiscalController } from '../controllers/notaFiscalController.js';

const router = Router();

router.get('/venda/:id_venda', NotaFiscalController.buscarPorVenda);
router.post('/', NotaFiscalController.gerarNota);

export default router;