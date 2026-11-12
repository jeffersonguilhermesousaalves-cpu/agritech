import { Router } from 'express';
import { EnderecoController } from '../controllers/enderecoController.js';

const router = Router();

router.get('/usuario/:id_usuario', EnderecoController.buscarPorUsuario);
router.post('/', EnderecoController.criar);
router.put('/:id', EnderecoController.atualizar);
router.delete('/:id', EnderecoController.deletar);

export default router;