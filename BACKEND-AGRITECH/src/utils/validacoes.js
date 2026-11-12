// Valida formato de e-mail
export const validarEmail = (email) => {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Valida se tem 11 dígitos (CPF) ou 14 dígitos (CNPJ)
export const validarCpfCnpj = (documento) => {
  if (!documento) return false;
  const apenasNumeros = String(documento).replace(/\D/g, '');
  return apenasNumeros.length === 11 || apenasNumeros.length === 14;
};

// Valida se o preço do produto/insumo é um número positivo
export const validarPreco = (preco) => {
  const valor = Number(preco);
  return !isNaN(valor) && valor > 0;
};

// Valida se a quantidade em estoque ou carrinho é válida
export const validarQuantidade = (quantidade) => {
  const qtd = Number(quantidade);
  return Number.isInteger(qtd) && qtd > 0;
};

// Valida CEP brasileiro (8 dígitos)
export const validarCep = (cep) => {
  if (!cep) return false;
  const apenasNumeros = String(cep).replace(/\D/g, '');
  return apenasNumeros.length === 8;
};