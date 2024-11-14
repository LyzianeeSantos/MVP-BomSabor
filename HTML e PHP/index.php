<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bom Sabor - Restaurante</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav class="top-bar">
            <div class="menu">
                <div class="logo">🍽️</div>
                <span class="table-info">Mesa 29</span>
                <div class="search-container">
                    <input type="text" placeholder="Buscar" class="search-bar">
                    <i class="fas fa-search search-icon"></i>
                </div>
                <button class="call-button"><i class="fas fa-bell"></i> Chamar Garçom</button>
                <button class="account-button"><i class="fas fa-user"></i> Minha Conta</button>
                <button class="cart-button" onclick="openCart()"><i class="fas fa-shopping-cart"></i> Carrinho de Compras</button>
            </div>
        </nav>
    </header>

    <main>
        <!-- Seção de Produtos -->
        <section class="products-section">
            <h2>Produtos</h2>
            <div class="products-container">
                <div class="product-card" onclick="showProductDetail('Hambúrguer Especial', 'hamburguer.webp', 'Hambúrguer suculento com queijo, alface e tomate', 24.90)">
                    <img src="hamburguer.webp" alt="Hambúrguer Especial" class="product-img">
                    <div class="product-info">
                        <h3>Hambúrguer Especial</h3>
                        <span class="price">R$ 24,90</span>
                    </div>
                </div>
                <div class="product-card" onclick="showProductDetail('Pizza Margherita', 'pizza.webp', 'Pizza com molho de tomate, queijo e manjericão', 29.90)">
                    <img src="pizza.webp" alt="Pizza Margherita" class="product-img">
                    <div class="product-info">
                        <h3>Pizza Margherita</h3>
                        <span class="price">R$ 29,90</span>
                    </div>
                </div>
                <div class="product-card" onclick="showProductDetail('Salada Caesar', 'salada.webp', 'Salada Caesar com frango, croutons e molho especial', 19.90)">
                    <img src="salada.webp" alt="Salada Caesar" class="product-img">
                    <div class="product-info">
                        <h3>Salada Caesar</h3>
                        <span class="price">R$ 19,90</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Seção de Detalhes do Produto -->
        <section class="product-detail-section" id="product-detail">
            <h2>Detalhes do Produto</h2>
            <div class="product-detail-content" id="product-detail-content">
                <p>Selecione um produto para ver os detalhes</p>
            </div>
        </section>

        <!-- Modal do Carrinho de Compras -->
        <div class="cart-modal" id="cart-modal">
            <div class="cart-modal-content">
                <span class="close" onclick="closeCart()">&times;</span>
                <h2>Carrinho de Compras</h2>
                <div id="cart-items">
                    <p>Seu carrinho está vazio.</p>
                </div>
                <div class="cart-total">
                    <span>Total:</span>
                    <span id="cart-total-price">R$ 0,00</span>
                </div>
                <button class="checkout-button">Finalizar Pedido</button>
            </div>
        </div>
    </main>

    <script>
        let cart = [];

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

        function addToCart(productName, price) {
            cart.push({ name: productName, price });
            alert(`${productName} foi adicionado ao carrinho!`);
        }

        function openCart() {
            const cartItemsContainer = document.getElementById("cart-items");
            cartItemsContainer.innerHTML = "";

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
            } else {
                let total = 0;
                cart.forEach(item => {
                    const itemElement = document.createElement("div");
                    itemElement.classList.add("cart-item");
                    itemElement.innerHTML = `
                        <span>${item.name}</span>
                        <span>R$ ${item.price.toFixed(2)}</span>
                    `;
                    cartItemsContainer.appendChild(itemElement);
                    total += item.price;
                });
                document.getElementById("cart-total-price").textContent = `R$ ${total.toFixed(2)}`;
            }

            document.getElementById("cart-modal").style.display = "block";
        }

        function closeCart() {
            document.getElementById("cart-modal").style.display = "none";
        }
    </script>
</body>
</html>
