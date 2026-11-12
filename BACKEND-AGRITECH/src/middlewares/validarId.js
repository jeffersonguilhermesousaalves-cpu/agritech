export const validarId = (req, res, next) => {
  const id =
    req.params.id ||
    req.params.id_usuario ||
    req.params.id_produto ||
    req.params.id_venda ||
    req.params.id_item;

  if (id !== undefined && (!Number.isInteger(Number(id)) || Number(id) <= 0)) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'ID inválido. Deve ser um número inteiro positivo.'
    });
  }

  next();
};