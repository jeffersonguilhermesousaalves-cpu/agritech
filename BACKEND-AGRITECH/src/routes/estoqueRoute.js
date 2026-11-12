import { Router } from 'express';
import { EstoqueController } from '../controllers/estoqueController.js';

const router = Router();

router.get('/', EstoqueController.listarTodos);
router.get('/produto/:id_produto', EstoqueController.buscarPorProduto);
router.post('/', EstoqueController.criar);
router.put('/:id', EstoqueController.atualizar);
router.delete('/:id', EstoqueController.deletar);

export default router;