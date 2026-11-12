import { Router } from 'express';
import { ProdutoController } from '../controllers/produtoController.js';

const router = Router();

router.get('/', ProdutoController.listarTodos);
router.get('/:id', ProdutoController.buscarPorId);
router.post('/', ProdutoController.criar);
router.put('/:id', ProdutoController.atualizar);
router.delete('/:id', ProdutoController.deletar);

export default router;