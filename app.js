// ============================================
// FIREBASE CONFIGURATION
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyDGpAHia_wEmrhnmYjrPf1n1TrAzwEMiAI",
    authDomain: "messageemeapp.firebaseapp.com",
    databaseURL: "https://messageemeapp-default-rtdb.firebaseio.com",
    projectId: "messageemeapp",
    storageBucket: "messageemeapp.appspot.com",
    messagingSenderId: "255034474844",
    appId: "1:255034474844:web:5e3b7a6bc4b2fb94cc4199",
    measurementId: "G-4QBEWRC583"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.storage();

// ============================================
// ADMIN AUTHENTICATION
// ============================================
let isAdminLoggedIn = false;
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

// ============================================
// GLOBAL STATE
// ============================================
let productsDatabase = {};
let categories = [];
let filters = [];
let scrollingAds = [];
let popupAds = [];
let orders = [];
let currentCategory = 'all';
let currentFilter = 'all';
let currentPage = 'homePage';
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ============================================
// INITIAL DATA
// ============================================
const initialProductsDatabase = {
    women: [
        {
            id: 1,
            name: 'فستان سهرة فاخر',
            price: 149900,
            oldPrice: 250000,
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
            category: 'women',
            badge: 'sale',
            rating: 4.8,
            reviews: 128,
            description: 'فستان سهرة فاخر من أجود الأقمشة، تصميم عصري وأنيق.',
            discount: '-40%',
            filter: 'sale',
            colors: ['أسود', 'أحمر', 'أزرق'],
            sizes: ['S', 'M', 'L', 'XL'],
            stock: 25
        },
        {
            id: 2,
            name: 'بلوزة صيفية كاجوال',
            price: 45000,
            oldPrice: 65000,
            image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=800',
            category: 'women',
            badge: 'new',
            rating: 4.6,
            reviews: 95,
            description: 'بلوزة صيفية خفيفة ومريحة.',
            discount: '-31%',
            filter: 'new',
            colors: ['أبيض', 'وردي', 'بيج'],
            sizes: ['S', 'M', 'L'],
            stock: 30
        }
    ],
    men: [
        {
            id: 7,
            name: 'قميص رجالي كلاسيكي',
            price: 48000,
            oldPrice: 70000,
            image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
            category: 'men',
            badge: 'sale',
            rating: 4.6,
            reviews: 98,
            description: 'قميص رجالي أنيق بقصة كلاسيكية.',
            discount: '-31%',
            filter: 'sale',
            colors: ['أبيض', 'أزرق', 'أسود'],
            sizes: ['M', 'L', 'XL', 'XXL'],
            stock: 20
        }
    ]
};

const initialCategories = [
    { id: 'women', name: 'نسائي', icon: 'fa-female', color: '#ff6b9d' },
    { id: 'men', name: 'رجالي', icon: 'fa-male', color: '#4a90e2' },
    { id: 'kids', name: 'أطفال', icon: 'fa-child', color: '#9b59b6' },
    { id: 'accessories', name: 'إكسسوارات', icon: 'fa-glasses', color: '#e67e22' },
    { id: 'shoes', name: 'أحذية', icon: 'fa-shoe-prints', color: '#27ae60' },
    { id: 'bags', name: 'حقائب', icon: 'fa-shopping-bag', color: '#c44569' }
];

const initialFilters = [
    { id: 'all', name: 'الكل', icon: 'fa-th' },
    { id: 'sale', name: 'تخفيضات', icon: 'fa-tag' },
    { id: 'new', name: 'جديد', icon: 'fa-star' },
    { id: 'popular', name: 'الأكثر مبيعاً', icon: 'fa-fire' }
];

// ============================================
// FIREBASE INITIALIZATION
// ============================================
async function initializeFirebaseData() {
    try {
        const initSnapshot = await database.ref('initialized').once('value');
        const isInitialized = initSnapshot.val();

        if (!isInitialized) {
            console.log('🔄 جاري رفع البيانات الأولية...');
            
            await database.ref('products').set(initialProductsDatabase);
            
            const categoriesObj = {};
            initialCategories.forEach(cat => { categoriesObj[cat.id] = cat; });
            await database.ref('categories').set(categoriesObj);
            
            const filtersObj = {};
            initialFilters.forEach(filter => { filtersObj[filter.id] = filter; });
            await database.ref('filters').set(filtersObj);
            
            await database.ref('initialized').set(true);
            console.log('✅ اكتملت التهيئة!');
        }
    } catch (error) {
        console.error('❌ خطأ في التهيئة:', error);
    }
}

async function loadDataFromFirebase() {
    try {
        const productsSnapshot = await database.ref('products').once('value');
        productsDatabase = productsSnapshot.val() || {};

        const categoriesSnapshot = await database.ref('categories').once('value');
        const categoriesObj = categoriesSnapshot.val() || {};
        categories = Object.values(categoriesObj);

        const filtersSnapshot = await database.ref('filters').once('value');
        const filtersObj = filtersSnapshot.val() || {};
        filters = Object.values(filtersObj);

        const ordersSnapshot = await database.ref('orders').once('value');
        const ordersObj = ordersSnapshot.val() || {};
        orders = Object.values(ordersObj);

        console.log('✅ تم تحميل البيانات');
    } catch (error) {
        console.error('❌ خطأ في التحميل:', error);
    }
}

// ============================================
// ADMIN FUNCTIONS
// ============================================
function showAdminLogin() {
    const modal = document.createElement('div');
    modal.className = 'admin-modal-overlay';
    modal.innerHTML = `
        <div class="admin-modal">
            <div class="admin-modal-header">
                <h3><i class="fas fa-shield-alt"></i> تسجيل دخول المدير</h3>
                <button class="admin-modal-close" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="admin-modal-body">
                <div class="form-group">
                    <label><i class="fas fa-user"></i> اسم المستخدم</label>
                    <input type="text" id="adminUsername" class="admin-input" placeholder="admin">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-lock"></i> كلمة المرور</label>
                    <input type="password" id="adminPassword" class="admin-input" placeholder="admin">
                </div>
                <div class="admin-error" id="adminError" style="display: none;"></div>
                <button class="admin-btn-primary" onclick="loginAdmin()">
                    <i class="fas fa-sign-in-alt"></i> تسجيل الدخول
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function loginAdmin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        closeModal(document.querySelector('.admin-modal-close'));
        updateAdminUI();
        showNotification('تم تسجيل الدخول بنجاح!', 'success');
    } else {
        document.getElementById('adminError').textContent = 'بيانات خاطئة';
        document.getElementById('adminError').style.display = 'block';
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    updateAdminUI();
    showNotification('تم تسجيل الخروج', 'info');
}

function updateAdminUI() {
    const adminItems = document.querySelectorAll('.admin-only');
    adminItems.forEach(item => {
        item.style.display = isAdminLoggedIn ? 'flex' : 'none';
    });

    const loginBtn = document.getElementById('adminLoginBtn');
    const logoutBtn = document.getElementById('adminLogoutBtn');
    
    if (loginBtn && logoutBtn) {
        loginBtn.style.display = isAdminLoggedIn ? 'none' : 'flex';
        logoutBtn.style.display = isAdminLoggedIn ? 'flex' : 'none';
    }
}

// ============================================
// ADD PRODUCT WITH COLORS, SIZES, STOCK
// ============================================
function showAddProductModal() {
    if (!isAdminLoggedIn) {
        showNotification('يجب تسجيل الدخول أولاً', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'admin-modal-overlay';
    modal.innerHTML = `
        <div class="admin-modal admin-modal-large">
            <div class="admin-modal-header">
                <h3><i class="fas fa-plus-circle"></i> إضافة منتج جديد</h3>
                <button class="admin-modal-close" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="admin-modal-body">
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-tag"></i> اسم المنتج</label>
                        <input type="text" id="productName" class="admin-input">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-list"></i> القسم</label>
                        <select id="productCategory" class="admin-input">
                            ${categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')}
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-money-bill"></i> السعر (د.ع)</label>
                        <input type="number" id="productPrice" class="admin-input">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-money-bill-wave"></i> السعر القديم</label>
                        <input type="number" id="productOldPrice" class="admin-input">
                    </div>
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-image"></i> رابط الصورة</label>
                    <input type="url" id="productImage" class="admin-input">
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-align-right"></i> الوصف</label>
                    <textarea id="productDescription" class="admin-input" rows="2"></textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-palette"></i> الألوان (مفصولة بفاصلة)</label>
                        <input type="text" id="productColors" class="admin-input" placeholder="أحمر, أزرق, أبيض">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-ruler"></i> القياسات (مفصولة بفاصلة)</label>
                        <input type="text" id="productSizes" class="admin-input" placeholder="S, M, L, XL">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-boxes"></i> الكمية المتوفرة</label>
                        <input type="number" id="productStock" class="admin-input" value="10">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-star"></i> التصنيف</label>
                        <select id="productBadge" class="admin-input">
                            <option value="">بدون</option>
                            <option value="sale">تخفيض</option>
                            <option value="new">جديد</option>
                            <option value="hot">مميز</option>
                        </select>
                    </div>
                </div>
                
                <button class="admin-btn-primary" onclick="saveProduct()">
                    <i class="fas fa-save"></i> حفظ المنتج
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

async function saveProduct() {
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value;
    const price = parseInt(document.getElementById('productPrice').value);
    const oldPrice = document.getElementById('productOldPrice').value ? parseInt(document.getElementById('productOldPrice').value) : null;
    const image = document.getElementById('productImage').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const colorsStr = document.getElementById('productColors').value.trim();
    const sizesStr = document.getElementById('productSizes').value.trim();
    const stock = parseInt(document.getElementById('productStock').value);
    const badge = document.getElementById('productBadge').value;

    if (!name || !price || !image) {
        showNotification('الرجاء ملء الحقول المطلوبة', 'error');
        return;
    }

    const colors = colorsStr ? colorsStr.split(',').map(c => c.trim()) : [];
    const sizes = sizesStr ? sizesStr.split(',').map(s => s.trim()) : [];

    try {
        const newProductId = Date.now();
        let discount = null;
        if (oldPrice && oldPrice > price) {
            discount = `-${Math.round(((oldPrice - price) / oldPrice) * 100)}%`;
        }

        const newProduct = {
            id: newProductId,
            name,
            category,
            price,
            oldPrice,
            image,
            description,
            badge,
            filter: badge || 'all',
            rating: 4.5,
            reviews: 0,
            discount,
            colors,
            sizes,
            stock
        };

        await database.ref(`products/${category}/${newProductId}`).set(newProduct);
        
        showNotification('تم إضافة المنتج بنجاح!', 'success');
        closeModal(document.querySelector('.admin-modal-close'));
        
        await loadDataFromFirebase();
        loadProducts();
    } catch (error) {
        console.error('خطأ:', error);
        showNotification('حدث خطأ', 'error');
    }
}

// ============================================
// ORDERS MANAGEMENT
// ============================================
function showOrdersPage() {
    if (!isAdminLoggedIn) {
        showNotification('يجب تسجيل الدخول أولاً', 'error');
        return;
    }
    
    showPage('ordersPage');
    loadOrders();
}

async function loadOrders() {
    const ordersContainer = document.getElementById('ordersContainer');
    if (!ordersContainer) return;

    try {
        const ordersSnapshot = await database.ref('orders').once('value');
        const ordersObj = ordersSnapshot.val() || {};
        orders = Object.values(ordersObj);

        if (orders.length === 0) {
            ordersContainer.innerHTML = `
                <div class="no-orders">
                    <i class="fas fa-shopping-cart"></i>
                    <p>لا توجد طلبات حتى الآن</p>
                </div>
            `;
            return;
        }

        let html = '';
        orders.sort((a, b) => b.timestamp - a.timestamp).forEach(order => {
            const statusClass = order.status === 'completed' ? 'success' : 'pending';
            html += `
                <div class="order-card" data-aos="fade-up">
                    <div class="order-header">
                        <div>
                            <h4>طلب #${order.id}</h4>
                            <span class="order-date">${new Date(order.timestamp).toLocaleString('ar-IQ')}</span>
                        </div>
                        <div class="order-status order-status-${statusClass}">
                            ${order.status === 'completed' ? 'مكتمل' : 'قيد المعالجة'}
                        </div>
                    </div>
                    <div class="order-items">
                        ${order.items.map(item => `
                            <div class="order-item">
                                <img src="${item.image}" alt="${item.name}">
                                <div class="order-item-info">
                                    <h5>${item.name}</h5>
                                    <p>الكمية: ${item.quantity}</p>
                                    ${item.selectedColor ? `<p>اللون: ${item.selectedColor}</p>` : ''}
                                    ${item.selectedSize ? `<p>القياس: ${item.selectedSize}</p>` : ''}
                                </div>
                                <div class="order-item-price">${formatPrice(item.price * item.quantity)}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-footer">
                        <div class="order-total">الإجمالي: ${formatPrice(order.total)}</div>
                        ${order.status !== 'completed' ? `
                            <button class="admin-btn-primary" onclick="completeOrder('${order.id}')">
                                <i class="fas fa-check"></i> تم الحجز
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        ordersContainer.innerHTML = html;
    } catch (error) {
        console.error('خطأ في تحميل الطلبات:', error);
    }
}

async function completeOrder(orderId) {
    try {
        await database.ref(`orders/${orderId}/status`).set('completed');
        showNotification('تم تحديث حالة الطلب', 'success');
        loadOrders();
    } catch (error) {
        showNotification('حدث خطأ', 'error');
    }
}

// ============================================
// CART FUNCTIONS
// ============================================
function addToCart(event, productId, selectedColor, selectedSize) {
    event.stopPropagation();
    
    const allProducts = getAllProducts();
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    if (product.stock <= 0) {
        showNotification('المنتج غير متوفر', 'error');
        return;
    }

    const existingItem = cart.find(item => 
        item.id === productId && 
        item.selectedColor === selectedColor && 
        item.selectedSize === selectedSize
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            ...product, 
            quantity: 1,
            selectedColor: selectedColor || (product.colors && product.colors[0]) || null,
            selectedSize: selectedSize || (product.sizes && product.sizes[0]) || null
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('تمت الإضافة إلى السلة', 'success');
}

function showCartPage() {
    showPage('cartPage');
    loadCartItems();
}

function loadCartItems() {
    const cartContainer = document.getElementById('cartItemsContainer');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>السلة فارغة</p>
                <button class="admin-btn-primary" onclick="showPage('homePage')">
                    تسوق الآن
                </button>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = formatPrice(0);
        return;
    }

    let total = 0;
    let html = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item" data-aos="fade-up">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    ${item.selectedColor ? `<p>اللون: <span class="color-badge">${item.selectedColor}</span></p>` : ''}
                    ${item.selectedSize ? `<p>القياس: <span class="size-badge">${item.selectedSize}</span></p>` : ''}
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity(${index})"><i class="fas fa-minus"></i></button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${index})"><i class="fas fa-plus"></i></button>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    html += `
        <div class="cart-summary">
            <div class="cart-summary-row">
                <span>المجموع:</span>
                <span class="cart-summary-total">${formatPrice(total)}</span>
            </div>
            <button class="admin-btn-primary cart-checkout-btn" onclick="checkout()">
                <i class="fas fa-credit-card"></i> إتمام الطلب
            </button>
        </div>
    `;

    cartContainer.innerHTML = html;
    if (cartTotal) cartTotal.textContent = formatPrice(total);
}

function increaseQuantity(index) {
    const item = cart[index];
    const allProducts = getAllProducts();
    const product = allProducts.find(p => p.id === item.id);
    
    if (product && item.quantity < product.stock) {
        cart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    } else {
        showNotification('الكمية المتوفرة محدودة', 'error');
    }
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
    showNotification('تم الحذف من السلة', 'info');
}

async function checkout() {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const order = {
        id: Date.now(),
        items: cart,
        total: total,
        status: 'pending',
        timestamp: Date.now()
    };

    try {
        await database.ref(`orders/${order.id}`).set(order);
        
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        showNotification('تم إرسال طلبك بنجاح!', 'success');
        showPage('homePage');
    } catch (error) {
        showNotification('حدث خطأ في إرسال الطلب', 'error');
    }
}

function updateCartCount() {
    const badge = document.getElementById('cartCount');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// ============================================
// WISHLIST FUNCTIONS
// ============================================
function toggleWishlist(event, productId) {
    event.stopPropagation();
    
    const allProducts = getAllProducts();
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const index = wishlist.findIndex(item => item.id === productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification('تمت الإزالة من المفضلة', 'info');
    } else {
        wishlist.push(product);
        showNotification('تمت الإضافة للمفضلة', 'success');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    
    if (currentPage === 'wishlistPage') {
        loadWishlistItems();
    } else {
        loadProducts();
    }
}

function showWishlistPage() {
    showPage('wishlistPage');
    loadWishlistItems();
}

function loadWishlistItems() {
    const wishlistContainer = document.getElementById('wishlistContainer');
    if (!wishlistContainer) return;

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `
            <div class="empty-wishlist">
                <i class="fas fa-heart"></i>
                <p>لا توجد منتجات مفضلة</p>
                <button class="admin-btn-primary" onclick="showPage('homePage')">
                    تصفح المنتجات
                </button>
            </div>
        `;
        return;
    }

    let html = '<div class="products-grid">';
    wishlist.forEach(product => {
        html += createProductCard(product);
    });
    html += '</div>';

    wishlistContainer.innerHTML = html;
}

function updateWishlistCount() {
    const badge = document.getElementById('favoritesCount');
    if (badge) {
        badge.textContent = wishlist.length;
        badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

// ============================================
// PRODUCT DETAILS WITH COLOR & SIZE SELECTION
// ============================================
function showProductDetails(productId) {
    const allProducts = getAllProducts();
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    let selectedColor = product.colors && product.colors.length > 0 ? product.colors[0] : null;
    let selectedSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;

    const modal = document.createElement('div');
    modal.className = 'admin-modal-overlay';
    modal.innerHTML = `
        <div class="admin-modal admin-modal-large product-details-modal">
            <div class="admin-modal-header">
                <h3>${product.name}</h3>
                <button class="admin-modal-close" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="admin-modal-body">
                <div class="product-details-content">
                    <div class="product-details-image">
                        <img src="${product.image}" alt="${product.name}">
                        ${product.badge ? `<div class="product-badge product-badge-${product.badge}">${
                            product.badge === 'sale' ? 'تخفيض' :
                            product.badge === 'new' ? 'جديد' : 'مميز'
                        }</div>` : ''}
                    </div>
                    <div class="product-details-info">
                        <div class="product-rating">
                            ${generateStars(product.rating)}
                            <span class="product-reviews">(${product.reviews} تقييم)</span>
                        </div>
                        
                        <p class="product-description">${product.description}</p>
                        
                        ${product.colors && product.colors.length > 0 ? `
                            <div class="product-options">
                                <h4><i class="fas fa-palette"></i> الألوان المتاحة:</h4>
                                <div class="color-options">
                                    ${product.colors.map(color => `
                                        <button class="color-option ${color === selectedColor ? 'active' : ''}" 
                                                onclick="selectColor(this, '${color}')" 
                                                data-color="${color}">
                                            ${color}
                                        </button>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${product.sizes && product.sizes.length > 0 ? `
                            <div class="product-options">
                                <h4><i class="fas fa-ruler"></i> القياسات المتاحة:</h4>
                                <div class="size-options">
                                    ${product.sizes.map(size => `
                                        <button class="size-option ${size === selectedSize ? 'active' : ''}" 
                                                onclick="selectSize(this, '${size}')" 
                                                data-size="${size}">
                                            ${size}
                                        </button>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        <div class="product-stock">
                            <i class="fas fa-boxes"></i>
                            ${product.stock > 0 ? `متوفر (${product.stock} قطعة)` : 'غير متوفر'}
                        </div>
                        
                        <div class="product-price-container">
                            ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                            <span class="product-price">${formatPrice(product.price)}</span>
                            ${product.discount ? `<span class="product-discount-badge">${product.discount}</span>` : ''}
                        </div>
                        
                        <div class="product-actions">
                            ${product.stock > 0 ? `
                                <button class="admin-btn-primary" onclick="addToCartFromModal(${product.id})">
                                    <i class="fas fa-shopping-cart"></i> أضف إلى السلة
                                </button>
                            ` : `
                                <button class="admin-btn-primary" disabled>
                                    <i class="fas fa-times"></i> غير متوفر
                                </button>
                            `}
                            <button class="admin-btn-secondary ${isInWishlist ? 'active' : ''}" 
                                    onclick="toggleWishlist(event, ${product.id})">
                                <i class="fas fa-heart"></i> 
                                ${isInWishlist ? 'إزالة من المفضلة' : 'أضف للمفضلة'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    window.currentProductSelection = { color: selectedColor, size: selectedSize };
}

function selectColor(btn, color) {
    document.querySelectorAll('.color-option').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    window.currentProductSelection.color = color;
}

function selectSize(btn, size) {
    document.querySelectorAll('.size-option').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    window.currentProductSelection.size = size;
}

function addToCartFromModal(productId) {
    const selection = window.currentProductSelection || {};
    addToCart(new Event('click'), productId, selection.color, selection.size);
    closeModal(document.querySelector('.admin-modal-close'));
}

// ============================================
// LOAD PRODUCTS
// ============================================
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    const allProducts = getAllProducts();
    
    let filteredProducts = currentCategory === 'all' 
        ? allProducts 
        : allProducts.filter(p => p.category === currentCategory);

    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.filter === currentFilter);
    }

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <p>لا توجد منتجات</p>
            </div>
        `;
        return;
    }

    let html = '';
    filteredProducts.forEach(product => {
        html += createProductCard(product);
    });

    productsGrid.innerHTML = html;
}

function createProductCard(product) {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    return `
        <div class="product-card" data-aos="fade-up" onclick="showProductDetails(${product.id})">
            ${product.badge ? `<div class="product-badge product-badge-${product.badge}">${
                product.badge === 'sale' ? 'تخفيض' :
                product.badge === 'new' ? 'جديد' : 'مميز'
            }</div>` : ''}
            ${product.discount ? `<div class="product-discount">${product.discount}</div>` : ''}
            <button class="product-wishlist ${isInWishlist ? 'active' : ''}" 
                    onclick="toggleWishlist(event, ${product.id})">
                <i class="fas fa-heart"></i>
            </button>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span class="product-reviews">(${product.reviews})</span>
                </div>
                ${product.colors && product.colors.length > 0 ? `
                    <div class="product-colors-preview">
                        ${product.colors.slice(0, 3).map(color => `<span class="color-dot">${color}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="product-price-container">
                    ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                    <span class="product-price">${formatPrice(product.price)}</span>
                </div>
                <button class="product-add-cart" onclick="showProductDetails(${product.id}); event.stopPropagation();">
                    <i class="fas fa-shopping-cart"></i>
                    أضف إلى السلة
                </button>
            </div>
        </div>
    `;
}

function getAllProducts() {
    let allProducts = [];
    Object.keys(productsDatabase).forEach(category => {
        if (Array.isArray(productsDatabase[category])) {
            allProducts = allProducts.concat(productsDatabase[category]);
        } else {
            Object.values(productsDatabase[category]).forEach(product => {
                if (product && product.id) {
                    allProducts.push(product);
                }
            });
        }
    });
    return allProducts;
}

// ============================================
// LOAD CATEGORIES & FILTERS
// ============================================
function loadCategories() {
    const categoryBtns = document.querySelector('.category-btns');
    const sidebarCategories = document.getElementById('sidebarCategories');
    
    if (categoryBtns) {
        let html = '<button class="category-btn active" data-category="all" onclick="filterByCategory(\'all\')"><i class="fas fa-th"></i> الكل</button>';
        categories.forEach(cat => {
            html += `<button class="category-btn" data-category="${cat.id}" onclick="filterByCategory('${cat.id}')">
                <i class="fas ${cat.icon}"></i> ${cat.name}
            </button>`;
        });
        categoryBtns.innerHTML = html;
    }
    
    if (sidebarCategories) {
        let html = '<button class="sidebar-menu-item" onclick="filterByCategory(\'all\'); closeSidebar();"><i class="fas fa-th"></i><span>جميع المنتجات</span></button>';
        categories.forEach(cat => {
            html += `<button class="sidebar-menu-item" onclick="filterByCategory('${cat.id}'); closeSidebar();">
                <i class="fas ${cat.icon}"></i><span>${cat.name}</span>
            </button>`;
        });
        sidebarCategories.innerHTML = html;
    }
}

function filterByCategory(categoryId) {
    currentCategory = categoryId;
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === categoryId);
    });
    
    showPage('homePage');
    loadProducts();
}

function loadFilters() {
    const filterBtns = document.querySelector('.filter-btns');
    if (!filterBtns) return;

    let html = '';
    filters.forEach(filter => {
        html += `<button class="filter-btn ${filter.id === 'all' ? 'active' : ''}" 
                         data-filter="${filter.id}" 
                         onclick="filterByFilter('${filter.id}')">
            <i class="fas ${filter.icon}"></i> ${filter.name}
        </button>`;
    });
    
    filterBtns.innerHTML = html;
}

function filterByFilter(filterId) {
    currentFilter = filterId;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filterId);
    });
    
    loadProducts();
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function formatPrice(price) {
    return new Intl.NumberFormat('ar-IQ').format(price) + ' د.ع';
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let html = '';

    for (let i = 0; i < fullStars; i++) {
        html += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        html += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        html += '<i class="far fa-star"></i>';
    }

    return html;
}

function closeModal(btn) {
    const modal = btn.closest('.admin-modal-overlay');
    if (modal) modal.remove();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `admin-notification admin-notification-${type} show`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function openSidebar() {
    document.getElementById('mobileSidebar').classList.add('active');
    document.getElementById('sidebarOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    document.getElementById('mobileSidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// INITIALIZE APP
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
    }, 3000);

    await initializeFirebaseData();
    await loadDataFromFirebase();

    loadCategories();
    loadFilters();
    loadProducts();
    
    updateAdminUI();
    updateCartCount();
    updateWishlistCount();
    
    initializeEventListeners();
    initializeScrollToTop();

    AOS.init({ duration: 600, once: true });
});

function initializeEventListeners() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', openSidebar);
    }

    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
}

function initializeScrollToTop() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('visible', window.pageYOffset > 300);
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
