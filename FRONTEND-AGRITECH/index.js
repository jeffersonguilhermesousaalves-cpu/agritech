const produtos = [
    {
        id_produto: 1,
        id_categoria: 1,
        nome: "Argila Expandida",
        descricao: "Ideal para drenagem, decoração e cultivo de plantas.",
        caminho_imagem: "./assets/produtos/argilaexpandida.jpg",
        preco: 32.90
    },
    {
        id_produto: 2,
        id_categoria: 2,
        nome: "Sementes de Alface",
        descricao: "Sementes selecionadas para hortas e plantações.",
        caminho_imagem: "./assets/produtos/alface.jpg",
        preco: 8.50
    },
    {
        id_produto: 3,
        id_categoria: 1,
        nome: "Húmus de Minhoca",
        descricao: "Adubo orgânico para enriquecer o solo.",
        caminho_imagem: "./assets/produtos/humus.jpg",
        preco: 24.90
    },
    {
        id_produto: 4,
        id_categoria: 1,
        nome: "Terra Vegetal",
        descricao: "Terra rica em nutrientes para jardins e hortas.",
        caminho_imagem: "./assets/produtos/terra.jpg",
        preco: 18.90
    }
];

const container = document.getElementById("produtos");

container.innerHTML = produtos.map(produto => `
    <div class="produto">
        <h2>${produto.nome}</h2>
        <img src="${produto.caminho_imagem}" alt="${produto.nome}">
        <p>${produto.descricao}</p>
        <strong>R$ ${produto.preco.toFixed(2).replace(".", ",")}</strong>
    </div>
`).join("");