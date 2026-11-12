DROP DATABASE IF EXISTS agritech;
CREATE DATABASE agritech;
USE agritech;

-- 1. Tabela de Usuários / Clientes
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cpf_cnpj VARCHAR(20) NOT NULL UNIQUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Endereços (depende de usuario)
CREATE TABLE endereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    rua VARCHAR(150) NOT NULL,
    cidade VARCHAR(80) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    CONSTRAINT fk_endereco_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- 3. Tabela de Categorias
CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT
);

-- 4. Tabela de Produtos (depende de categoria)
CREATE TABLE produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_produto_categoria FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

-- 5. Tabela de Estoque (depende de produto)
CREATE TABLE estoque (
    id_estoque INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT NOT NULL UNIQUE,
    quantidade INT NOT NULL DEFAULT 0,
    localizacao VARCHAR(100) DEFAULT 'Galpão Principal',
    lote VARCHAR(50),
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_estoque_produto FOREIGN KEY (id_produto) REFERENCES produto(id_produto) ON DELETE CASCADE
);

-- 6. Tabela de Carrinho 
CREATE TABLE carrinho (
    id_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_carrinho_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- 7. Tabela Associativa: Itens do Carrinho
CREATE TABLE item_carrinho (
    id_item_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    id_carrinho INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    CONSTRAINT fk_item_carrinho FOREIGN KEY (id_carrinho) REFERENCES carrinho(id_carrinho) ON DELETE CASCADE,
    CONSTRAINT fk_item_produto FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);

-- 8. Tabela de Vendas 
CREATE TABLE venda (
    id_venda INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
    valor_total DECIMAL(10, 2) NOT NULL,
    status_venda VARCHAR(30) DEFAULT 'Pendente',
    CONSTRAINT fk_venda_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- 9. Tabela de Nota Fiscal
CREATE TABLE nota_fiscal (
    id_nota_fiscal INT AUTO_INCREMENT PRIMARY KEY,
    id_venda INT NOT NULL UNIQUE,
    chave_acesso VARCHAR(44) NOT NULL UNIQUE,
    data_emissao DATETIME DEFAULT CURRENT_TIMESTAMP,
    valor_imposto DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_nota_venda FOREIGN KEY (id_venda) REFERENCES venda(id_venda) ON DELETE CASCADE
);

-- =========================================================
-- POVOAMENTO INICIAL (DML)
-- =========================================================

INSERT INTO categoria (nome, descricao) VALUES 
('Sementes Modificadas', 'Sementes geneticamente melhoradas para maior produtividade'),
('Insumos Biologicos', 'Biofertilizantes, defensivos biologicos e inoculantes');

INSERT INTO produto (id_categoria, nome, descricao, preco) VALUES 
(1, 'Semente de Milho BT', 'Resistente a pragas e seca', 450.00),
(1, 'Semente de Soja RR', 'Tolerante a herbicidas', 380.00),
(2, 'Biofertilizante NPK Vivo', 'Acelerador de absorção de nutrientes', 120.00);

INSERT INTO estoque (id_produto, quantidade, localizacao, lote) VALUES
(1, 100, 'Galpão A - Setor Sementes', 'LOT-MILHO-2026'),
(2, 150, 'Galpão A - Setor Sementes', 'LOT-SOJA-2026'),
(3, 200, 'Galpão B - Setor Biológicos', 'LOT-BIO-2026');