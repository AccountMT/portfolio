const time = new Date();
const minuut = time.getMinutes()
const hour = time.getHours();
const OpenInfoText = document.getElementById("OpeningsInformatieText")
const OpenInfoBox = document.getElementsByClassName("OpeningsInformatieBox")

console.log(`het is nu: ${hour} uur en ${minuut} minuut`)

if (hour >= 18 ){

    OpenInfoText.textContent = "WE ZIJN OP DIT MOMENT: DICHT"
    OpenInfoText.style.color = 'red' 
    OpenInfoBox[0].style.background = "pink"
    OpenInfoBox[0].style.border = "rgb(240, 160, 160) 2px solid"

}else {
    OpenInfoText.textContent = "WE ZIJN OP DIT MOMENT: OPEN"
    OpenInfoText.style.color = 'rgb(6, 130, 51)' 
    OpenInfoBox[0].style.background = "rgb(162, 242, 191)"
    OpenInfoBox[0].style.border = "rgb(83, 167, 77) 2px solid"
}

function handleBikeImg(img) {
    
    if (img.dataset.imgErrorAttempted === '1') {
        img.onerror = null;
        img.src = 'Assets/FietsPNG.png';
        return;
    }

    img.dataset.imgErrorAttempted = '1';
    img.onerror = null; 

    const src = img.getAttribute('src');
    if (!src) {
        img.src = 'Assets/FietsPNG.png';
        return;
    }

    if (src.endsWith('.png')) {
        img.src = src.replace(/\.png$/i, '.jpg');
        return;
    }

    if (src.endsWith('.jpg')) {
        img.src = src.replace(/\.jpg$/i, '.png');
        return;
    }

    img.src = 'Assets/FietsPNG.png';
}

const carouselImages = [
    'Assets/fiets1.jpg',
    'Assets/fiets2.jpg',
    'Assets/fiets3.jpg',
    'Assets/fiets4.jpg',
    'Assets/fiets5.jpg'
];
let carouselIndex = 0;
const homeImage = document.getElementById('HomeAfbeelding');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
let carouselInterval;

function updateHomeImage() {
    homeImage.src = carouselImages[carouselIndex];
}

function showNextImage() {
    carouselIndex = (carouselIndex + 1) % carouselImages.length;
    updateHomeImage();
}

function showPrevImage() {
    carouselIndex = (carouselIndex - 1 + carouselImages.length) % carouselImages.length;
    updateHomeImage();
}

function startCarousel() {
    carouselInterval = setInterval(showNextImage, 3000);
}

function stopCarousel() {
    clearInterval(carouselInterval);
}

if (carouselPrev && carouselNext && homeImage) {
    carouselPrev.addEventListener('click', () => {
        showPrevImage();
    });

    carouselNext.addEventListener('click', () => {
        showNextImage();
    });

    const carouselContainer = document.getElementById('imageCarousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopCarousel);
        carouselContainer.addEventListener('mouseleave', startCarousel);
    }

    startCarousel();
}

const navItems = document.querySelectorAll('.NavItem');

function showPage(pageName) {
    document.querySelectorAll('.page-content').forEach(page => page.classList.remove('active'));
    const activePage = document.getElementById(pageName + '-page');
    if (activePage) {
        activePage.classList.add('active');
    }
}

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = item.getAttribute('data-page');
        showPage(pageName);
    });
});

const winkelCartButton = document.getElementById('WinkelCartHeader');
const cartBadge = document.createElement('span');
cartBadge.className = 'cart-icon-badge';
cartBadge.textContent = '0';
cartBadge.style.display = 'none';
if (winkelCartButton && winkelCartButton.parentElement) {
    winkelCartButton.parentElement.appendChild(cartBadge);
}

if (winkelCartButton) {
    winkelCartButton.addEventListener('click', () => {
        openCartPanel();
    });
}

const searchBar = document.getElementById('SearchBar');
const searchImg = document.getElementById('SearchIMG');

function searchForFietsen() {
    const query = searchBar?.value.trim().toLowerCase() || '';
    if (query.includes('huur')) {
        showPage('verhuur');
    } else if (query.includes('fiets')) {
        showPage('fietsen');    
    } else {
        alert('Niet gevonden. Probeer opniew');
    }
}

if (searchBar) {
    searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchForFietsen();
        }
    });
}

const checkboxInputs = Array.from(document.querySelectorAll('input[type="checkbox"]'));
const cartItems = [];
const bikeAddButtonsByName = {};

function addProductToCart(name, price) {
    const existing = cartItems.find(item => item.name === name && item.price === price);
    if (!existing) {
        cartItems.push({ name, price });
        updateCartBadge();
        return true;
    }
    return false;
}

function markButtonAdded(name) {
    const button = bikeAddButtonsByName[name];
    if (button) {
        button.textContent = 'Toegevoegd!';
        button.disabled = true;
    }
}

function markButtonRemoved(name) {
    const button = bikeAddButtonsByName[name];
    if (button) {
        button.textContent = 'Toevoegen aan winkelwagen';
        button.disabled = false;
    }
}

function resetAllBikeButtons() {
    Object.values(bikeAddButtonsByName).forEach(button => {
        button.textContent = 'Toevoegen aan winkelwagen';
        button.disabled = false;
    });
}

function attachBikeCardButtons() {
    const bikeCards = Array.from(document.querySelectorAll('.bikes-grid .bike-card'));
    bikeCards.forEach(card => {
        const img = card.querySelector('img');
        const title = card.querySelector('h3')?.textContent.trim() || 'Fiets';
        const priceText = card.querySelector('.price')?.textContent || '€ 0';
        const price = parsePrice(priceText);
        if (!img) return;

        card.style.cursor = 'pointer';
        card.addEventListener('click', (event) => {
            if (event.target.closest('.bike-add-btn')) return;
            const currentlySelected = card.classList.contains('bike-card-selected');
            const allCards = Array.from(document.querySelectorAll('.bikes-grid .bike-card'));
            allCards.forEach(otherCard => otherCard.classList.remove('bike-card-selected'));
            if (!currentlySelected) {
                card.classList.add('bike-card-selected');
            }
        });

        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.className = 'bike-add-btn';
        addButton.textContent = 'Toevoegen aan winkelwagen';
        bikeAddButtonsByName[title] = addButton;
        addButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (addProductToCart(title, price)) {
                markButtonAdded(title);
            }
        });

        card.appendChild(addButton);
    });
}

attachBikeCardButtons();

function parsePrice(text) {
    if (!text) return 0;
    const normalized = text.replace(/\s/g, '').replace('€', '').replace(',', '.');
    const value = parseFloat(normalized);
    return Number.isFinite(value) ? value : 0;
}

function createCheckoutPage() {
    const checkoutPage = document.createElement('div');
    checkoutPage.id = 'checkout-page';
    checkoutPage.className = 'page-content';
    checkoutPage.innerHTML = `
        <div class="checkout-page-inner">
            <div class="checkout-header">
                <h2>Afrekenen</h2>
                <p>Bekijk je winkelwagen en kies een betaalmethode om de bestelling te voltooien.</p>
            </div>
            <div class="checkout-summary">
                <div class="checkout-items-list"></div>
                <div class="checkout-total-line">Totaal: <strong class="checkout-total-amount">€ 0,00</strong></div>
            </div>
            <div class="payment-section">
                <h3>Kies een betaalmethode</h3>
                <div class="payment-options">
                    <label><input type="radio" name="paymentMethod" value="paypal" checked> PayPal</label>
                    <label><input type="radio" name="paymentMethod" value="ideal"> iDEAL</label>
                </div>
                <button type="button" class="checkout-pay-btn">Betaal</button>
                <button type="button" class="checkout-back-btn">Terug naar winkel</button>
                <div class="checkout-message"></div>
            </div>
        </div>
    `;

    const footer = document.querySelector('.footerBox');
    if (footer && footer.parentNode) {
        footer.parentNode.insertBefore(checkoutPage, footer);
    } else {
        document.body.appendChild(checkoutPage);
    }

    return checkoutPage;
}

const checkoutPage = createCheckoutPage();
const checkoutItemsList = checkoutPage.querySelector('.checkout-items-list');
const checkoutTotalAmount = checkoutPage.querySelector('.checkout-total-amount');
const checkoutMessage = checkoutPage.querySelector('.checkout-message');
const checkoutPayButton = checkoutPage.querySelector('.checkout-pay-btn');
const checkoutBackButton = checkoutPage.querySelector('.checkout-back-btn');

function updateCheckoutPage() {
    checkoutItemsList.innerHTML = '';
    checkoutMessage.textContent = '';

    if (cartItems.length === 0) {
        checkoutItemsList.innerHTML = '<div class="checkout-empty">Je winkelwagen is leeg. Voeg eerst artikelen toe voordat je betaalt.</div>';
        checkoutTotalAmount.textContent = formatCurrency(0);
        checkoutPayButton.disabled = true;
        return;
    }

    checkoutPayButton.disabled = false;
    cartItems.forEach(product => {
        const row = document.createElement('div');
        row.className = 'checkout-item-row';
        row.innerHTML = `<span>${product.name}</span><span>${formatCurrency(product.price)}</span>`;
        checkoutItemsList.appendChild(row);
    });

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    checkoutTotalAmount.textContent = formatCurrency(total);
}

function goToCheckoutPage() {
    updateCheckoutPage();
    closeCartPanel();
    showPage('checkout');
}

checkoutBackButton.addEventListener('click', () => {
    showPage('fietsen');
});

checkoutPayButton.addEventListener('click', () => {
    completeCheckout();
});

function completeCheckout() {
    if (cartItems.length === 0) {
        checkoutMessage.textContent = 'Er zijn geen artikelen in je winkelwagen.';
        return;
    }

    const paymentMethod = checkoutPage.querySelector('input[name="paymentMethod"]:checked')?.value;
    checkoutMessage.textContent = `Je bestelling is ontvangen. Betalen met ${paymentMethod === 'ideal' ? 'iDEAL' : 'PayPal'} is gelukt.`;
    checkoutMessage.classList.add('checkout-success');
    cartItems.length = 0;
    resetAllBikeButtons();
    updateCartBadge();
    checkoutPayButton.disabled = true;
}


function getCheckboxProductData(checkbox) {
    const row = checkbox.closest('tr');
    let name = 'Product';
    let price = 0;

    if (row) {
        const nameCell = row.querySelector('td:nth-child(2)');
        const priceCell = row.querySelector('td:nth-child(3)');
        if (nameCell) {
            name = nameCell.textContent.trim();
        }
        if (priceCell) {
            price = parsePrice(priceCell.textContent);
        }
    }

    if (!row) {
        const label = checkbox.closest('label');
        if (label) {
            name = label.textContent.trim();
        }
    }

    return { name, price, checkbox };
}

function createCartElements() {
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';

    const sidebar = document.createElement('aside');
    sidebar.className = 'cart-sidebar';
    sidebar.innerHTML = `
        <div class="cart-header">
            <h2>Winkelwagen</h2>
            <button type="button" class="cart-close" aria-label="Sluit winkelwagen">×</button>
        </div>
        <div class="cart-body">
            <div class="cart-empty">Selecteer producten met de checkboxen om ze hier te zien.</div>
            <div class="cart-items"></div>
        </div>
        <div class="cart-footer">
            <div class="cart-total-label">Totaal</div>
            <div class="cart-total-value">€ 0.00</div>
        </div>
        <button type="button" class="cart-checkout-btn">Afrekenen</button>
    `;

    overlay.appendChild(sidebar);
    document.body.appendChild(overlay);
    return { overlay, sidebar };
}

const cart = createCartElements();
const cartItemsContainer = cart.sidebar.querySelector('.cart-items');
const cartTotalValue = cart.sidebar.querySelector('.cart-total-value');
const cartEmptyMessage = cart.sidebar.querySelector('.cart-empty');
const cartCloseButton = cart.sidebar.querySelector('.cart-close');
const cartCheckoutButton = cart.sidebar.querySelector('.cart-checkout-btn');

function updateCartBadge() {
    const count = cartItems.length;
    if (!cartBadge) return;
    if (count > 0) {
        cartBadge.textContent = count;
        cartBadge.style.display = 'flex';
    } else {
        cartBadge.style.display = 'none';
    }
}

function formatCurrency(amount) {
    return '€ ' + amount.toFixed(2).replace('.', ',');
}

function addSelectedItemsToCart(openPanel = false) {
    const selectedCheckboxes = checkboxInputs.filter(input => input.checked);
    if (selectedCheckboxes.length === 0) {
        alert('Selecteer eerst een of meer fietsen op de verhuurpagina.');
        return;
    }

    selectedCheckboxes.forEach(checkbox => {
        const product = getCheckboxProductData(checkbox);
        const existing = cartItems.find(item => item.name === product.name && item.price === product.price);
        if (!existing) {
            cartItems.push({ name: product.name, price: product.price });
            markButtonAdded(product.name);
        }
    });

    updateCartBadge();
    if (openPanel) {
        openCartPanel();
    }
}

function updateCartPanel() {
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartEmptyMessage.style.display = 'block';
        cartTotalValue.textContent = formatCurrency(0);
        if (cartCheckoutButton) cartCheckoutButton.disabled = true;
        return;
    }

    cartEmptyMessage.style.display = 'none';
    let total = 0;

    cartItems.forEach((product, index) => {
        total += product.price;

        const item = document.createElement('div');
        item.className = 'cart-item';

        const itemText = document.createElement('div');
        itemText.className = 'cart-item-text';
        itemText.innerHTML = `<span class="cart-item-name">${product.name}</span><span class="cart-item-price">${formatCurrency(product.price)}</span>`;

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'remove-item-btn';
        removeButton.textContent = 'Verwijder';
        removeButton.addEventListener('click', () => {
            cartItems.splice(index, 1);
            markButtonRemoved(product.name);
            updateCartPanel();
            updateCartBadge();
        });

        item.appendChild(itemText);
        item.appendChild(removeButton);
        cartItemsContainer.appendChild(item);
    });

    cartTotalValue.textContent = formatCurrency(total);
    updateCartBadge();
}

function openCartPanel() {
    updateCartPanel();
    cart.overlay.classList.add('visible');
    cart.sidebar.classList.add('visible');
}

function closeCartPanel() {
    cart.overlay.classList.remove('visible');
    cart.sidebar.classList.remove('visible');
}

const bookButtons = Array.from(document.querySelectorAll('.book-btn'));
bookButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        addSelectedItemsToCart(true);
    });
});

cartCloseButton.addEventListener('click', closeCartPanel);
if (cartCheckoutButton) {
    cartCheckoutButton.addEventListener('click', () => {
        goToCheckoutPage();
    });
}
cart.overlay.addEventListener('click', (event) => {
    if (event.target === cart.overlay) {
        closeCartPanel();
    }
});

cart.sidebar.addEventListener('click', (event) => {
    event.stopPropagation();
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && cart.overlay.classList.contains('visible')) {
        closeCartPanel();
    }
});

function updateFooterVisibility() {
    const footer = document.querySelector('.footerBox');
    if (!footer) return;

    const distanceFromBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
    if (distanceFromBottom <= 20) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
}

window.addEventListener('scroll', updateFooterVisibility);
window.addEventListener('resize', updateFooterVisibility);
updateFooterVisibility();