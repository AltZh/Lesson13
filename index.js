// --- Product Data Mock ---
const products = [
{
    id: 1,
    name: "Sculpted Wool Overcoat",
    category: "outerwear",
    price: 890,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop",
    badge: "Bestseller",
    description: "Crafted from double-faced virgin wool, featuring structured shoulders and a minimalist beltless silhouette."
},
{
    id: 2,
    name: "Silk Slip Maxi Evening Dress",
    category: "dresses",
    price: 640,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    badge: "New Arrival",
    description: "Fluid mulberry silk dress cut on the bias to gently hug contours with an effortless drape."
},
{
    id: 3,
    name: "Tailored Double-Breasted Blazer",
    category: "tailoring",
    price: 720,
    image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop",
    badge: "Classic",
    description: "Architectural blazer tailored from breathable Italian linen-wool mix with custom horn buttons."
},
{
    id: 4,
    name: "Minimalist Leather Tote",
    category: "accessories",
    price: 510,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    badge: "Essential",
    description: "Supple full-grain calfskin tote with raw interior and seamless magnetic closure."
},
{
    id: 5,
    name: "Cashmere Ribbed Turtleneck",
    category: "outerwear",
    price: 480,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop",
    badge: "Limited",
    description: "Ultra-soft Mongolian cashmere knit with refined ribbing along cuffs and collar."
},
{
    id: 6,
    name: "Pleated Wide-Leg Trousers",
    category: "tailoring",
    price: 420,
    image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=800&auto=format&fit=crop",
    badge: "Bestseller",
    description: "High-waisted draped trousers tailored with deep front pleats for fluid motion."
}
];

let cartCount = 0;

// --- DOM Elements ---
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const productGrid = document.getElementById('product-grid');
const modal = document.getElementById('quickview-modal');
const modalClose = document.getElementById('modal-close');
const toast = document.getElementById('toast');
const cartCountEl = document.getElementById('cart-count');

// --- Sticky Header Effect ---
window.addEventListener('scroll', () => {
if (window.scrollY > 50) {
    header.classList.add('scrolled');
} else {
    header.classList.remove('scrolled');
}
});

// --- Mobile Menu Toggle ---
hamburger.addEventListener('click', () => {
mobileMenu.classList.toggle('active');
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});
});

// --- Hero Slide Carousel ---
const slides = document.querySelectorAll('.hero-slide');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
let currentSlide = 0;

function showSlide(index) {
slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
});
}

function nextSlide() {
currentSlide = (currentSlide + 1) % slides.length;
showSlide(currentSlide);
}

function prevSlide() {
currentSlide = (currentSlide - 1 + slides.length) % slides.length;
showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
setInterval(nextSlide, 7000); // Auto slider

// --- Render Products ---
function renderProducts(items) {
productGrid.innerHTML = items.map(product => `
    <div class="product-card">
        <div class="product-image-wrap">
            <span class="product-badge">${product.badge}</span>
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-actions">
                <button class="action-btn" onclick="openQuickView(${product.id})" aria-label="Quick View">
                    <i class="fa-regular fa-eye"></i>
                </button>
                <button class="action-btn" onclick="addToCart('${product.name}')" aria-label="Add to Cart">
                    <i class="fa-solid fa-bag-shopping"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">$${product.price}</div>
        </div>
    </div>
`).join('');
}

renderProducts(products);

// --- Filter Products ---
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    if (filter === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === filter);
        renderProducts(filtered);
    }
});
});

// --- Quick View Modal Logic ---
let currentModalProduct = null;

window.openQuickView = function(id) {
const product = products.find(p => p.id === id);
if (!product) return;
currentModalProduct = product;

document.getElementById('modal-img').src = product.image;
document.getElementById('modal-title').textContent = product.name;
document.getElementById('modal-price').textContent = `$${product.price}`;
document.getElementById('modal-desc').textContent = product.description;

modal.classList.add('active');
};

modalClose.addEventListener('click', () => {
modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
if (e.target === modal) modal.classList.remove('active');
});

// Modal Size Selector
document.querySelectorAll('.size-btn').forEach(btn => {
btn.addEventListener('click', (e) => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
});
});

document.getElementById('modal-add-cart').addEventListener('click', () => {
if (currentModalProduct) {
    addToCart(currentModalProduct.name);
    modal.classList.remove('active');
}
});

// --- Add To Cart & Toast ---
window.addToCart = function(productName) {
cartCount++;
cartCountEl.textContent = cartCount;
showToast(`"${productName}" added to bag.`);
};

function showToast(msg) {
document.getElementById('toast-message').textContent = msg;
toast.classList.add('show');
setTimeout(() => {
    toast.classList.remove('show');
}, 3000);
}

// --- Testimonials Slider ---
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

dots.forEach(dot => {
dot.addEventListener('click', (e) => {
    const index = parseInt(e.target.dataset.index);
    testimonialCards.forEach(c => c.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    testimonialCards[index].classList.add('active');
    e.target.classList.add('active');
});
});

// --- Newsletter Submission Form ---
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
e.preventDefault();
showToast('Thank you for subscribing to our private journal.');
e.target.reset();
});