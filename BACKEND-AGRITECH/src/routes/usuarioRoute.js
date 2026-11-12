import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController.js';

const router = Router();

router.get('/', UsuarioController.listarTodos);
router.get('/:id', UsuarioController.buscarPorId);
router.post('/', UsuarioController.criar);
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.deletar);

export default router;