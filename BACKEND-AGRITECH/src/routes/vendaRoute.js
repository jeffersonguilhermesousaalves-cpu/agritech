import { Router } from 'express';
import { VendaController } from '../controllers/vendaController.js';

const router = Router();

router.get('/', VendaController.listarTodas);
router.get('/:id', VendaController.buscarPorId);
router.post('/', VendaController.criar);
router.patch('/:id/status', VendaController.atualizarStatus);

export default router;