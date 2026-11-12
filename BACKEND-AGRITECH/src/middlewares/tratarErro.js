export const tratarErro = (erro, req, res, next) => {
  console.error('Erro na API AgriTech:', erro.stack || erro.message);

  const status = erro.status || 500;
  res.status(status).json({
    sucesso: false,
    mensagem: erro.message || 'Erro interno no servidor.'
  });
};