import { Router } from 'express';
import { CategoriaController } from '../controllers/categoriaController.js';

const router = Router();

router.get('/', CategoriaController.listarTodos);
router.get('/:id', CategoriaController.buscarPorId);
router.post('/', CategoriaController.criar);
router.put('/:id', CategoriaController.atualizar);
router.delete('/:id', CategoriaController.deletar);

export default router;