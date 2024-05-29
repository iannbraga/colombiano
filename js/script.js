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

        let categoriasProdutosFloatingBtn = $('.floating-btn-categorias')
        categoriasProdutosFloatingBtn.empty();

        for (let categoria in produtosPorCategoria) {
            let categoriaNavItem = `
            <a class="nav-link text-dark fs-5 font-monospace" href="#${categoria.replace(/\s+/g, '-')}">
            ${categoria}
            </a>`
            categoriasProdutos.append(categoriaNavItem);

            let categoriaFloatItem = `
            <li><a class="dropdown-item" href="#${categoria.replace(/\s+/g, '-')}">${categoria}</a></li>`
            categoriasProdutosFloatingBtn.append(categoriaFloatItem);

            let categoriaDiv = $('<div id="' + categoria.replace(/\s+/g, '-') + '" class="col-12"></div>');
            
            let categoriaHeader = $('<h2 class="my-4 text-center display-6"></h2>').text(categoria);
            categoriaDiv.append(categoriaHeader);

            let produtosRow = $('<div class="row pt-3"></div>');

            produtosPorCategoria[categoria].forEach(function (produto) {
                let produtoCard = `
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div class="card" style="">
                            <div class="card-body text-center">
                                ${produto.image ? 
                                    `<img src="${produto.image}" class="img-fluid mb-${produto.nome == 'Redbull' ? '0':'4'} "/>` 
                                    : 
                                    `<i class="${produto.icone} fa-3x mb-3 mt-5 pt-5"></i>`}
                                <h6 class="card-title ${produto.image ? '' : 'mt-5 pt-2'}">${produto.nome}</h6>
                                <p class="badge bg-success card-text">R$ ${produto.preco}</p>
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
