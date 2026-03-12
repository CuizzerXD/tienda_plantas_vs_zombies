    // cart.js - shared logic for adding items to cart, showing count, and displaying offcanvas
    const CART_KEY = 'pvz_cart';

    function getCart() {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function updateCartCount() {
        const countElem = document.getElementById('cart-count');
        if (countElem) {
            countElem.textContent = getCart().length;
        }
    }

    function renderCartItems() {
        const cart = getCart();
        const container = document.getElementById('cart-items');
        if (!container) return;
        container.innerHTML = '';
        if (cart.length === 0) {
            container.innerHTML = '<li class="list-group-item text-center text-muted">El carrito está vacío... 🧟‍♂️🌻</li>';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.textContent = item.name;
                const span = document.createElement('span');
                span.className = 'badge bg-primary rounded-pill';
                span.textContent = item.price;
                li.appendChild(span);
                container.appendChild(li);
            });
        }
        const totalElem = document.getElementById('cart-total');
        if (totalElem) {
            const total = cart.reduce((sum, it) => {
                const n = parseFloat(it.price.replace(/[^0-9\.]/g, '')) || 0;
                return sum + n;
            }, 0);
            totalElem.textContent = total;
        }
    }

    function updateCartUI() {
        updateCartCount();
        renderCartItems();
    }

    function addToCart(item) {
        const cart = getCart();
        cart.push(item);
        saveCart(cart);
        updateCartUI();
        showToast();
    }

    function showToast() {
        const toastEl = document.getElementById('liveToast');
        if (!toastEl) return;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }

    function checkout() {
        if (confirm('¿Deseas finalizar tu compra?')) {
            localStorage.removeItem(CART_KEY);
            updateCartUI();
            // optionally hide the offcanvas
            const offcanvasEl = document.getElementById('cartOffcanvas');
            if (offcanvasEl) {
                const bs = bootstrap.Offcanvas.getInstance(offcanvasEl);
                if (bs) bs.hide();
            }
        }
    }

    function bindAddButtons() {
        document.querySelectorAll('button').forEach(btn => {
            const text = btn.textContent.trim();
            if (text.startsWith('Añadir al carrito')) {
                btn.addEventListener('click', () => {
                    const card = btn.closest('.card');
                    if (!card) return;
                    const nameEl = card.querySelector('.card-title');
                    const priceEl = card.querySelector('.fs-5');
                    const name = nameEl ? nameEl.innerText : 'Artículo';
                    const price = priceEl ? priceEl.innerText : '0';
                    addToCart({ name, price });
                });
            }
        });
    }

    function renderIndexProducts() {
        const plantasContainer = document.getElementById('plantas-container');
        const zombiesContainer = document.getElementById('zombies-container');
        if (plantasContainer) {
            const plantas = [
                { name: 'Lanzaguisantes', desc: 'Tu primera línea de defensa. Leal, verde y con excelente puntería.', price: '100 Soles ☀️', image: '' },
                { name: 'Girasol', desc: 'Esencial para tu economía. Siempre con una sonrisa radiante.', price: '50 Soles ☀️', image: '' },
                { name: 'Nuez', desc: 'Dura de roer. Excelente para ganar tiempo mientras plantas más girasoles.', price: '50 Soles ☀️', image: '' }
            ];
            plantas.forEach(p => {
                const col = document.createElement('div');
                col.className = 'col-md-4 col-sm-6';
                col.innerHTML = `<div class="card h-100 shadow-sm planta-card">
                    <img src="${p.image}" class="card-img-top mx-auto rounded-circle mt-3" alt="${p.name}" style="width: 120px;">
                    <div class="card-body d-flex flex-column text-center">
                        <h5 class="card-title fw-bold">${p.name}</h5>
                        <p class="card-text text-muted flex-grow-1">${p.desc}</p>
                        <h6 class="fw-bold fs-5 text-success">${p.price}</h6>
                        <button class="btn btn-outline-success w-100 mt-2 fw-bold">Añadir al carrito</button>
                    </div>
                </div>`;
                plantasContainer.appendChild(col);
            });
        }
        if (zombiesContainer) {
            const zombies = [
                { name: 'Zombie Básico', desc: 'Ideal para principiantes en la nigromancia. Lento pero seguro.', price: '25 Cerebros 🧠', image: '' },
                { name: 'Zombie Abanderado', desc: 'Marca la llegada de una gran oleada. Excelente líder de equipo.', price: '25 Cerebros 🧠', image: '' }
            ];
            zombies.forEach(z => {
                const col = document.createElement('div');
                col.className = 'col-md-4 col-sm-6';
                col.innerHTML = `<div class="card h-100 shadow-sm zombie-card">
                    <img src="${z.image}" class="card-img-top mx-auto rounded-circle mt-3" alt="${z.name}" style="width: 120px;">
                    <div class="card-body d-flex flex-column text-center">
                        <h5 class="card-title fw-bold">${z.name}</h5>
                        <p class="card-text text-muted flex-grow-1">${z.desc}</p>
                        <h6 class="fw-bold fs-5 text-danger">${z.price}</h6>
                        <button class="btn btn-outline-danger w-100 mt-2 fw-bold">Añadir al carrito</button>
                    </div>
                </div>`;
                zombiesContainer.appendChild(col);
            });
        }
    }

    // initialize when DOM loads
    window.addEventListener('DOMContentLoaded', () => {
        updateCartUI();
        renderIndexProducts();
        bindAddButtons();
    });
