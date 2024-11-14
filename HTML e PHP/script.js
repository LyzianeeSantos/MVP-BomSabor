let cart = [];
let orders = [];

// Funções de modal
function toggleModal(modalId, show = true) {
    document.getElementById(modalId).style.display = show ? "flex" : "none";
}

function openAccount() {
    updateAccountInfo();
    toggleModal("account-modal", true);
}

function closeAccount() {
    toggleModal("account-modal", false);
}

function openCart() {
    updateCartDisplay();
    toggleModal("cart-modal", true);
}

function closeCart() {
    toggleModal("cart-modal", false);
}

// Exibir detalhes do produto
function showProductDetail(name, imgSrc, description, price) {
    const detailSection = document.getElementById("product-detail-content");
    detailSection.innerHTML = `
        <img src="${imgSrc}" alt="${name}" class="product-detail-img">
        <div class="product-detail-info">
            <h3>${name}</h3>
            <p>${description}</p>
            <span class="price">R$ ${price.toFixed(2)}</span>
            <button class="add-to-cart" onclick="addToCart('${name}', ${price})">Adicionar ao Carrinho</button>
        </div>
    `;
}

// Carrinho de compras
function addToCart(productName, price) {
    cart.push({ name: productName, price });
    alert(`${productName} foi adicionado ao carrinho!`);
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = cart.length
        ? cart.map(item => `<div class="cart-item"><span>${item.name}</span><span>R$ ${item.price.toFixed(2)}</span></div>`).join("")
        : "<p>Seu carrinho está vazio.</p>";

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("cart-total-price").textContent = `R$ ${total.toFixed(2)}`;
}

function finalizeOrder() {
    if (!cart.length) {
        alert("Seu carrinho está vazio! Adicione produtos antes de finalizar o pedido.");
        return;
    }

    orders.push([...cart]);
    cart = [];
    alert("Seu pedido foi finalizado com sucesso!");
    updateAccountInfo();
    closeCart();
}

// Informações da conta
function updateAccountInfo() {
    const accountInfoContainer = document.getElementById("account-info");
    accountInfoContainer.innerHTML = orders.length
        ? orders.map((order, index) => {
            const items = order.map(item => `<div class="order-item">${item.name} - R$ ${item.price.toFixed(2)}</div>`).join("");
            const total = order.reduce((sum, item) => sum + item.price, 0);
            return `<div class="order"><h4>Pedido ${index + 1}:</h4>${items}<div class="order-total"><strong>Total: R$ ${total.toFixed(2)}</strong></div></div>`;
        }).join("")
        : "<p>Nenhuma compra registrada.</p>";
}

// Chamar garçom com popup
function callWaiter() {
    toggleModal("popup", true);
    setTimeout(closePopup, 3000);
}

function closePopup() {
    toggleModal("popup", false);
}
