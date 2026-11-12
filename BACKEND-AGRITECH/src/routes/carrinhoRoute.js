import { Router } from 'express';
import { CarrinhoController } from '../controllers/carrinhoController.js';

const router = Router();

router.get('/usuario/:id_usuario', CarrinhoController.obterCarrinho);
router.post('/item', CarrinhoController.adicionarItem);
router.delete('/item/:id_item', CarrinhoController.removerItem);

export default router;