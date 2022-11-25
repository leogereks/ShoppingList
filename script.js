const listaProdutos = document.querySelector("#lista-produtos");
const addProduto = document.querySelector("#add-prod");
containerProdutos = document.querySelector (".container-produtos");

produtos = JSON.parse(localStorage.getItem("lista-produtos"));
let editId;
editedProduct = false;

//EVENTOS
listaProdutos.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputProduto = addProduto.value

    if (inputProduto) {
        if(!editedProduct){
            if(!produtos) {
                produtos = [];  
            }
            let prodInfo = {name: inputProduto, status: "listados"};
            produtos.push(prodInfo);
        } else {
            editedProduct = false;
            produtos[editId].name = inputProduto;
        }
        addProduto.value = "";

        localStorage.setItem("lista-produtos", JSON.stringify(produtos));
        showProduct();
    }
});


//EVENTOS

// FUNCOES
function showMenu(selectedProduct) {
    let produtoMenu = selectedProduct.parentElement.lastElementChild;

    produtoMenu.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target. tagName != "I" || e.target != selectedProduct) {
            produtoMenu.classList.remove("show");
        }
    })
};

function deleteProduct(deleteId){
    editedProduct = false;
    produtos.splice(deleteId,1);
    localStorage.setItem("lista-produtos", JSON.stringify(produtos));
    showProduct();
};

function editProduct(productId, productName){
    editId = productId;
    editedProduct = true;
    addProduto.value = productName;
    addProduto.focus ();
    addProduto.classList.add("active");
};

//FUNCOES

function showProduct() {
    let li = "";
    if (produtos) {
        produtos.forEach((itens,id) =>{
            let checked = itens.status == "comprados" ? "checked" : "";
                li += `<li class="produto">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" class="produto-listado" id="${id}" ${checked}>
                            <p class="${checked}">${itens.name}</p>
                        </label>
                        <div class="configs">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="prod_menu">
                                <li onclick="editProduct(${id}, '${itens.name}')"><i class="fa-solid fa-eraser"></i></li>
                                <li onclick="deleteProduct(${id})"><i class="fa-regular fa-trash-can"></i></li>
                            </ul>
                        </div>
                        </li>`;
        });
    }
    containerProdutos.innerHTML = li || `<h4>PRODUTOS</h4><br><span>Nenhum produto listado 😔</span>`;
};
showProduct();

function somarProdutos() {
    const showVal = document.querySelector('#showVal')
    let total = 0
    localStorage.getItem('lista-produtos');
    for (let i = 0; i < produtos.length; i++) {
        total = total + Number(produtos[i].preco)
    }

    localStorage.setItem("lista-produtos", JSON.stringify(produtos))
    let modificador = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    showVal.innerHTML = "TOTAL: "+modificador.format(total)  
}

function updateStatus(itens) {
    let produto = itens.parentElement.lastElementChild;
    if (itens.checked) {
        let preco = 0
        while (preco <= 0 || isNaN(preco)) {
            preco = prompt("Informe o preço do produto");
        }
        produto.classList.add("checked");
        produtos[itens.id].status = "comprados";
        produtos[itens.id].preco = preco
        somarProdutos()
    } else {
        produto.classList.remove("checked");
        produtos[itens.id].status = "pendente";
        produtos[itens.id].preco = 0
        somarProdutos()
    }
    localStorage.setItem("lista-produtos", JSON.stringify(produtos))
}


