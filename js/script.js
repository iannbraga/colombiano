// js/script.js
$(document).ready(function () {
    $.getJSON('produtos.json', function (data) {
        console.log(data);

        let produtosPorCategoria = {};

        data.forEach(function (produto) {
            if (!produtosPorCategoria[produto.categoria]) {
                produtosPorCategoria[produto.categoria] = [];
            }
            produtosPorCategoria[produto.categoria].push(produto);
        });

        console.log(produtosPorCategoria);

        let container = $('#produtos-por-categoria');
        container.empty();

        let categoriasProdutos = $('.categorias-produtos');
        categoriasProdutos.empty();

        for (let categoria in produtosPorCategoria) {
            let categoriaNavItem = `
            <a class="nav-link text-black-50" href="#${categoria.replace(/\s+/g, '-')}">
            ${categoria}
            </a>`
            categoriasProdutos.append(categoriaNavItem);

            let categoriaDiv = $('<div id="' + categoria.replace(/\s+/g, '-') + '" class="col-12"></div>');
            
            let categoriaHeader = $('<h2 class="my-4 text-center display-6"></h2>').text(categoria);
            categoriaDiv.append(categoriaHeader);
            categoriaDiv.append(`<hr class="p-3">`)

            let produtosRow = $('<div class="row pt-3"></div>');

            produtosPorCategoria[categoria].forEach(function (produto) {
                let produtoCard = `
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body text-center">
                                <i class="${produto.icone} fa-3x mb-3"></i>
                                <h5 class="card-title">${produto.nome}</h5>
                                <p class="card-text">R$ ${produto.preco}</p>
                            </div>
                        </div>
                    </div>
                `;
                produtosRow.append(produtoCard);
            });

            categoriaDiv.append(produtosRow);
            container.append(categoriaDiv);
        }

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Erro ao carregar o arquivo JSON: ' + textStatus, errorThrown);
    });
});