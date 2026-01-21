// ============================================
// LAVISH CENTER - FULL FEATURED E-COMMERCE APP
// ============================================

// Firebase Configuration
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Admin Credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

// Global Variables
let isAdminLoggedIn = false;
let currentCategory = 'all';
let currentFilter = 'all';
let currentPage = 'home';
let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Data Storage
let products = [];
let categories = [];
let filters = [];
let scrollingAds = [];
let popupAds = [];
let orders = [];

// ============================================
// INITIAL DATA - سيتم رفعها عند أول تشغيل
// ============================================
const initialCategories = [
    { id: 'all', nameAr: 'الكل', icon: 'fa-border-all', color: '#ff6b9d' },
    { id: 'women', nameAr: 'نسائي', icon: 'fa-person-dress', color: '#e91e63' },
    { id: 'men', nameAr: 'رجالي', icon: 'fa-person', color: '#2196f3' },
    { id: 'kids', nameAr: 'أطفال', icon: 'fa-child', color: '#4caf50' },
    { id: 'accessories', nameAr: 'إكسسوارات', icon: 'fa-gem', color: '#ff9800' },
    { id: 'shoes', nameAr: 'أحذية', icon: 'fa-shoe-prints', color: '#9c27b0' },
    { id: 'bags', nameAr: 'حقائب', icon: 'fa-bag-shopping', color: '#795548' },
    { id: 'silver', nameAr: 'فضيات', icon: 'fa-ring', color: '#607d8b' },
    { id: 'gifts', nameAr: 'هدايا', icon: 'fa-gift', color: '#f44336' }
];

const initialFilters = [
    { id: 'all', nameAr: 'الكل', icon: 'fa-border-all' },
    { id: 'sale', nameAr: 'تخفيضات', icon: 'fa-tags' },
    { id: 'new', nameAr: 'جديد', icon: 'fa-star' },
    { id: 'popular', nameAr: 'الأكثر مبيعاً', icon: 'fa-fire' }
];

const initialProducts = [
    // Women Products
    {
        id: 'w1',
        category: 'women',
        nameAr: 'فستان سهرة فاخر',
        currentPrice: 250000,
        oldPrice: 350000,
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500',
        description: 'فستان سهرة فاخر مناسب للمناسبات الخاصة',
        badge: 'sale',
        filter: 'sale',
        rating: 4.8,
        reviews: 124,
        colors: ['أحمر', 'أسود', 'أزرق', 'ذهبي'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 15
    },
    {
        id: 'w2',
        category: 'women',
        nameAr: 'بلوزة كاجوال عصرية',
        currentPrice: 75000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=500',
        description: 'بلوزة كاجوال مريحة للاستخدام اليومي',
        badge: 'new',
        filter: 'new',
        rating: 4.5,
        reviews: 89,
        colors: ['أبيض', 'وردي', 'بيج'],
        sizes: ['S', 'M', 'L'],
        stock: 25
    },
    {
        id: 'w3',
        category: 'women',
        nameAr: 'تنورة طويلة أنيقة',
        currentPrice: 95000,
        oldPrice: 120000,
        image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500',
        description: 'تنورة طويلة مناسبة لجميع الأوقات',
        badge: 'hot',
        filter: 'popular',
        rating: 4.9,
        reviews: 203,
        colors: ['أسود', 'بني', 'كحلي'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 18
    },
    {
        id: 'w4',
        category: 'women',
        nameAr: 'معطف شتوي فاخر',
        currentPrice: 180000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500',
        description: 'معطف شتوي أنيق وعملي',
        badge: 'new',
        filter: 'new',
        rating: 4.7,
        reviews: 67,
        colors: ['أسود', 'رمادي', 'بيج'],
        sizes: ['M', 'L', 'XL'],
        stock: 12
    },
    {
        id: 'w5',
        category: 'women',
        nameAr: 'فستان كاجوال صيفي',
        currentPrice: 85000,
        oldPrice: 110000,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
        description: 'فستان صيفي خفيف ومريح',
        badge: 'sale',
        filter: 'sale',
        rating: 4.6,
        reviews: 156,
        colors: ['أصفر', 'أخضر', 'أزرق فاتح'],
        sizes: ['S', 'M', 'L'],
        stock: 20
    },
    {
        id: 'w6',
        category: 'women',
        nameAr: 'بنطلون جينز كلاسيكي',
        currentPrice: 120000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
        description: 'بنطلون جينز عالي الجودة',
        badge: 'hot',
        filter: 'popular',
        rating: 4.8,
        reviews: 234,
        colors: ['أزرق', 'أسود', 'رمادي'],
        sizes: ['28', '30', '32', '34'],
        stock: 30
    },
    // Men Products
    {
        id: 'm1',
        category: 'men',
        nameAr: 'قميص رسمي كلاسيكي',
        currentPrice: 95000,
        oldPrice: 125000,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
        description: 'قميص رسمي للعمل والمناسبات',
        badge: 'sale',
        filter: 'sale',
        rating: 4.7,
        reviews: 178,
        colors: ['أبيض', 'أزرق', 'سماوي'],
        sizes: ['M', 'L', 'XL', 'XXL'],
        stock: 22
    },
    {
        id: 'm2',
        category: 'men',
        nameAr: 'بدلة رسمية فاخرة',
        currentPrice: 450000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500',
        description: 'بدلة رسمية كاملة للمناسبات الهامة',
        badge: 'new',
        filter: 'new',
        rating: 4.9,
        reviews: 89,
        colors: ['أسود', 'كحلي', 'رمادي'],
        sizes: ['L', 'XL', 'XXL'],
        stock: 8
    },
    {
        id: 'm3',
        category: 'men',
        nameAr: 'بنطلون كاجوال',
        currentPrice: 110000,
        oldPrice: 140000,
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500',
        description: 'بنطلون كاجوال مريح للاستخدام اليومي',
        badge: 'hot',
        filter: 'popular',
        rating: 4.6,
        reviews: 201,
        colors: ['بيج', 'كحلي', 'أسود'],
        sizes: ['30', '32', '34', '36'],
        stock: 28
    },
    {
        id: 'm4',
        category: 'men',
        nameAr: 'تيشرت رياضي',
        currentPrice: 45000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        description: 'تيشرت رياضي عملي ومريح',
        badge: 'new',
        filter: 'new',
        rating: 4.5,
        reviews: 312,
        colors: ['أسود', 'أبيض', 'رمادي', 'أزرق'],
        sizes: ['M', 'L', 'XL'],
        stock: 50
    },
    // Kids Products
    {
        id: 'k1',
        category: 'kids',
        nameAr: 'ملابس أطفال مريحة',
        currentPrice: 55000,
        oldPrice: 75000,
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500',
        description: 'ملابس أطفال عملية ومريحة',
        badge: 'sale',
        filter: 'sale',
        rating: 4.8,
        reviews: 145,
        colors: ['أزرق', 'وردي', 'أصفر'],
        sizes: ['2-3', '4-5', '6-7'],
        stock: 35
    },
    {
        id: 'k2',
        category: 'kids',
        nameAr: 'فستان أطفال أنيق',
        currentPrice: 65000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500',
        description: 'فستان أطفال للمناسبات',
        badge: 'new',
        filter: 'new',
        rating: 4.7,
        reviews: 98,
        colors: ['وردي', 'أبيض', 'أحمر'],
        sizes: ['2-3', '4-5', '6-7', '8-9'],
        stock: 20
    },
    {
        id: 'k3',
        category: 'kids',
        nameAr: 'طقم أطفال كامل',
        currentPrice: 85000,
        oldPrice: 110000,
        image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500',
        description: 'طقم كامل للأطفال',
        badge: 'hot',
        filter: 'popular',
        rating: 4.9,
        reviews: 167,
        colors: ['أزرق', 'أخضر', 'أحمر'],
        sizes: ['4-5', '6-7', '8-9'],
        stock: 18
    },
    // Accessories
    {
        id: 'a1',
        category: 'accessories',
        nameAr: 'ساعة يد فاخرة',
        currentPrice: 320000,
        oldPrice: 450000,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        description: 'ساعة يد فاخرة بتصميم عصري',
        badge: 'sale',
        filter: 'sale',
        rating: 4.9,
        reviews: 289,
        colors: ['ذهبي', 'فضي', 'أسود'],
        sizes: ['قياس واحد'],
        stock: 10
    },
    {
        id: 'a2',
        category: 'accessories',
        nameAr: 'نظارة شمسية عصرية',
        currentPrice: 95000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
        description: 'نظارة شمسية بحماية UV',
        badge: 'new',
        filter: 'new',
        rating: 4.6,
        reviews: 156,
        colors: ['أسود', 'بني', 'أزرق'],
        sizes: ['قياس واحد'],
        stock: 25
    },
    {
        id: 'a3',
        category: 'accessories',
        nameAr: 'محفظة جلدية فاخرة',
        currentPrice: 150000,
        oldPrice: 200000,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
        description: 'محفظة جلد طبيعي عالية الجودة',
        badge: 'hot',
        filter: 'popular',
        rating: 4.8,
        reviews: 234,
        colors: ['أسود', 'بني', 'بيج'],
        sizes: ['قياس واحد'],
        stock: 15
    },
    // Shoes
    {
        id: 's1',
        category: 'shoes',
        nameAr: 'حذاء رياضي مريح',
        currentPrice: 180000,
        oldPrice: 240000,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        description: 'حذاء رياضي عالي الجودة',
        badge: 'sale',
        filter: 'sale',
        rating: 4.9,
        reviews: 456,
        colors: ['أبيض', 'أسود', 'أزرق'],
        sizes: ['40', '41', '42', '43', '44'],
        stock: 30
    },
    {
        id: 's2',
        category: 'shoes',
        nameAr: 'حذاء رسمي كلاسيكي',
        currentPrice: 220000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500',
        description: 'حذاء رسمي جلد طبيعي',
        badge: 'new',
        filter: 'new',
        rating: 4.7,
        reviews: 178,
        colors: ['أسود', 'بني'],
        sizes: ['40', '41', '42', '43'],
        stock: 20
    },
    {
        id: 's3',
        category: 'shoes',
        nameAr: 'صندل نسائي أنيق',
        currentPrice: 120000,
        oldPrice: 150000,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500',
        description: 'صندل نسائي مريح وأنيق',
        badge: 'hot',
        filter: 'popular',
        rating: 4.8,
        reviews: 289,
        colors: ['بيج', 'أسود', 'ذهبي'],
        sizes: ['36', '37', '38', '39'],
        stock: 25
    },
    {
        id: 's4',
        category: 'shoes',
        nameAr: 'حذاء كاجوال عصري',
        currentPrice: 160000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
        description: 'حذاء كاجوال للاستخدام اليومي',
        badge: 'new',
        filter: 'new',
        rating: 4.6,
        reviews: 201,
        colors: ['رمادي', 'أسود', 'أزرق'],
        sizes: ['40', '41', '42', '43'],
        stock: 22
    },
    // Bags
    {
        id: 'b1',
        category: 'bags',
        nameAr: 'حقيبة يد نسائية فاخرة',
        currentPrice: 280000,
        oldPrice: 380000,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500',
        description: 'حقيبة يد جلد طبيعي',
        badge: 'sale',
        filter: 'sale',
        rating: 4.9,
        reviews: 345,
        colors: ['أسود', 'بني', 'بيج', 'أحمر'],
        sizes: ['كبير', 'متوسط'],
        stock: 12
    },
    {
        id: 'b2',
        category: 'bags',
        nameAr: 'حقيبة ظهر عملية',
        currentPrice: 150000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        description: 'حقيبة ظهر للعمل والدراسة',
        badge: 'new',
        filter: 'new',
        rating: 4.7,
        reviews: 234,
        colors: ['أسود', 'رمادي', 'أزرق'],
        sizes: ['قياس واحد'],
        stock: 18
    },
    {
        id: 'b3',
        category: 'bags',
        nameAr: 'حقيبة سفر كبيرة',
        currentPrice: 320000,
        oldPrice: 420000,
        image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=500',
        description: 'حقيبة سفر واسعة وعملية',
        badge: 'hot',
        filter: 'popular',
        rating: 4.8,
        reviews: 189,
        colors: ['أسود', 'رمادي', 'أزرق كحلي'],
        sizes: ['كبير جداً'],
        stock: 10
    },
    {
        id: 'b4',
        category: 'bags',
        nameAr: 'حقيبة كلاتش أنيقة',
        currentPrice: 95000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500',
        description: 'حقيبة كلاتش للمناسبات',
        badge: 'new',
        filter: 'new',
        rating: 4.6,
        reviews: 123,
        colors: ['ذهبي', 'فضي', 'أسود'],
        sizes: ['صغير'],
        stock: 20
    },
    {
        id: 'b5',
        category: 'bags',
        nameAr: 'حقيبة كتف عصرية',
        currentPrice: 180000,
        oldPrice: 230000,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
        description: 'حقيبة كتف بتصميم عصري',
        badge: 'sale',
        filter: 'sale',
        rating: 4.7,
        reviews: 267,
        colors: ['بيج', 'أسود', 'بني فاتح'],
        sizes: ['متوسط'],
        stock: 15
    },
    // Silver
    {
        id: 'sv1',
        category: 'silver',
        nameAr: 'سلسال فضة عيار 925',
        currentPrice: 450000,
        oldPrice: 600000,
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500',
        description: 'سلسال فضة إيطالي أصلي',
        badge: 'sale',
        filter: 'sale',
        rating: 5.0,
        reviews: 412,
        colors: ['فضي'],
        sizes: ['50 سم', '60 سم'],
        stock: 8
    },
    {
        id: 'sv2',
        category: 'silver',
        nameAr: 'خاتم فضة بحجر كريم',
        currentPrice: 280000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
        description: 'خاتم فضة مع حجر كريم أصلي',
        badge: 'new',
        filter: 'new',
        rating: 4.9,
        reviews: 234,
        colors: ['فضي مع أزرق', 'فضي مع أحمر'],
        sizes: ['17', '18', '19', '20'],
        stock: 12
    },
    {
        id: 'sv3',
        category: 'silver',
        nameAr: 'أقراط فضة أنيقة',
        currentPrice: 320000,
        oldPrice: 420000,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500',
        description: 'أقراط فضة بتصميم راقي',
        badge: 'hot',
        filter: 'popular',
        rating: 4.8,
        reviews: 356,
        colors: ['فضي'],
        sizes: ['قياس واحد'],
        stock: 15
    },
    // Gifts
    {
        id: 'g1',
        category: 'gifts',
        nameAr: 'طقم هدايا فاخر',
        currentPrice: 220000,
        oldPrice: 300000,
        image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500',
        description: 'طقم هدايا متكامل للمناسبات',
        badge: 'sale',
        filter: 'sale',
        rating: 4.9,
        reviews: 178,
        colors: ['ذهبي', 'فضي'],
        sizes: ['قياس واحد'],
        stock: 10
    },
    {
        id: 'g2',
        category: 'gifts',
        nameAr: 'علبة هدية مخصصة',
        currentPrice: 95000,
        oldPrice: null,
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500',
        description: 'علبة هدية قابلة للتخصيص',
        badge: 'new',
        filter: 'new',
        rating: 4.7,
        reviews: 123,
        colors: ['أحمر', 'ذهبي', 'فضي'],
        sizes: ['صغير', 'متوسط', 'كبير'],
        stock: 25
    }
];

const initialScrollingAds = [
    {
        id: 'sa1',
        text: '🔥 تخفيضات كبرى على جميع الفساتين - لفترة محدودة!',
        link: '#',
        active: true
    },
    {
        id: 'sa2',
        text: '⭐ منتجات جديدة وصلت - تسوق الآن!',
        link: '#',
        active: true
    },
    {
        id: 'sa3',
        text: '🎁 توصيل مجاني للطلبات فوق 100,000 دينار!',
        link: '#',
        active: true
    }
];

const initialPopupAds = [
    {
        id: 'pa1',
        title: 'عرض خاص - خصم 40%',
        description: 'خصم 40% على جميع الفساتين - لفترة محدودة فقط!',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500',
        newPrice: 150000,
        oldPrice: 250000,
        badge: 'SALE',
        productId: 'w1',
        active: true
    }
];

// ============================================
// FIREBASE INITIALIZATION
// ============================================
async function initializeFirebaseData() {
    try {
        const initializedRef = database.ref('initialized');
        const snapshot = await initializedRef.once('value');
        
        if (!snapshot.val()) {
            showAdminNotification('جاري تحميل البيانات الأولية...', 'info');
            
            // Upload Categories
            for (const category of initialCategories) {
                await database.ref(`categories/${category.id}`).set(category);
            }
            
            // Upload Filters
            for (const filter of initialFilters) {
                await database.ref(`filters/${filter.id}`).set(filter);
            }
            
            // Upload Products
            for (const product of initialProducts) {
                await database.ref(`products/${product.category}/${product.id}`).set(product);
            }
            
            // Upload Scrolling Ads
            for (const ad of initialScrollingAds) {
                await database.ref(`scrollingAds/${ad.id}`).set(ad);
            }
            
            // Upload Popup Ads
            for (const ad of initialPopupAds) {
                await database.ref(`popupAds/${ad.id}`).set(ad);
            }
            
            // Mark as initialized
            await initializedRef.set(true);
            
            showAdminNotification('تم تحميل البيانات الأولية بنجاح!', 'success');
        }
        
        // Load data from Firebase
        await loadDataFromFirebase();
        
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        showAdminNotification('خطأ في تحميل البيانات!', 'error');
    }
}

// ============================================
// LOAD DATA FROM FIREBASE
// ============================================
async function loadDataFromFirebase() {
    try {
        // Load Categories
        const categoriesSnapshot = await database.ref('categories').once('value');
        categories = [];
        categoriesSnapshot.forEach(child => {
            categories.push(child.val());
        });
        
        // Load Filters
        const filtersSnapshot = await database.ref('filters').once('value');
        filters = [];
        filtersSnapshot.forEach(child => {
            filters.push(child.val());
        });
        
        // Load Products
        const productsSnapshot = await database.ref('products').once('value');
        products = [];
        productsSnapshot.forEach(categoryChild => {
            categoryChild.forEach(productChild => {
                products.push(productChild.val());
            });
        });
        
        // Load Scrolling Ads
        const scrollingAdsSnapshot = await database.ref('scrollingAds').once('value');
        scrollingAds = [];
        scrollingAdsSnapshot.forEach(child => {
            const ad = child.val();
            if (ad.active) {
                scrollingAds.push(ad);
            }
        });
        
        // Load Popup Ads
        const popupAdsSnapshot = await database.ref('popupAds').once('value');
        popupAds = [];
        popupAdsSnapshot.forEach(child => {
            const ad = child.val();
            if (ad.active) {
                popupAds.push(ad);
            }
        });
        
        // Load Orders
        const ordersSnapshot = await database.ref('orders').once('value');
        orders = [];
        ordersSnapshot.forEach(child => {
            orders.push({ id: child.key, ...child.val() });
        });
        
        // Update UI
        updateCategoriesUI();
        updateFiltersUI();
        loadProducts();
        updateScrollingAds();
        updateCartBadge();
        updateWishlistBadge();
        
        // Show popup ad if exists
        if (popupAds.length > 0) {
            setTimeout(() => showPopupAd(popupAds[0]), 5000);
        }
        
    } catch (error) {
        console.error('Error loading data from Firebase:', error);
    }
}

// ============================================
// ADMIN AUTHENTICATION
// ============================================
function showAdminLogin() {
    const modal = document.createElement('div');
    modal.className = 'admin-modal-overlay';
    modal.innerHTML = `
        <div class="admin-modal">
            <button class="admin-modal-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 class="admin-modal-title">
                <i class="fas fa-user-shield"></i>
                تسجيل دخول الإدارة
            </h2>
            <form id="adminLoginForm" class="admin-form">
                <div class="admin-form-group">
                    <label><i class="fas fa-user"></i> اسم المستخدم</label>
                    <input type="text" id="adminUsername" required>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-lock"></i> كلمة المرور</label>
                    <input type="password" id="adminPassword" required>
                </div>
                <button type="submit" class="admin-btn-primary">
                    <i class="fas fa-sign-in-alt"></i>
                    تسجيل الدخول
                </button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        loginAdmin();
    });
}

function loginAdmin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        showAdminNotification('تم تسجيل الدخول بنجاح!', 'success');
        document.querySelector('.admin-modal-overlay').remove();
        updateAdminUI();
    } else {
        showAdminNotification('اسم المستخدم أو كلمة المرور غير صحيحة!', 'error');
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    showAdminNotification('تم تسجيل الخروج بنجاح!', 'info');
    updateAdminUI();
    closeSidebar();
}

function updateAdminUI() {
    const adminMenuItems = document.querySelectorAll('.admin-menu-item');
    adminMenuItems.forEach(item => {
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
// ADMIN NOTIFICATIONS
// ============================================
function showAdminNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `admin-notification admin-notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// ADMIN PRODUCT MANAGEMENT
// ============================================
function showAddProduct() {
    if (!isAdminLoggedIn) {
        showAdminNotification('يجب تسجيل الدخول أولاً!', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'admin-modal-overlay';
    modal.innerHTML = `
        <div class="admin-modal admin-modal-large">
            <button class="admin-modal-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 class="admin-modal-title">
                <i class="fas fa-plus-circle"></i>
                إضافة منتج جديد
            </h2>
            <form id="addProductForm" class="admin-form">
                <div class="admin-form-row">
                    <div class="admin-form-group">
                        <label><i class="fas fa-tag"></i> اسم المنتج</label>
                        <input type="text" id="productName" required>
                    </div>
                    <div class="admin-form-group">
                        <label><i class="fas fa-th-large"></i> القسم</label>
                        <select id="productCategory" required>
                            ${categories.filter(c => c.id !== 'all').map(cat => 
                                `<option value="${cat.id}">${cat.nameAr}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
                
                <div class="admin-form-row">
                    <div class="admin-form-group">
                        <label><i class="fas fa-dollar-sign"></i> السعر الحالي (دينار)</label>
                        <input type="number" id="productPrice" required>
                    </div>
                    <div class="admin-form-group">
                        <label><i class="fas fa-dollar-sign"></i> السعر القديم (اختياري)</label>
                        <input type="number" id="productOldPrice">
                    </div>
                </div>
                
                <div class="admin-form-group">
                    <label><i class="fas fa-image"></i> رابط الصورة</label>
                    <input type="url" id="productImage" required>
                </div>
                
                <div class="admin-form-group">
                    <label><i class="fas fa-align-right"></i> الوصف</label>
                    <textarea id="productDescription" rows="3" required></textarea>
                </div>
                
                <div class="admin-form-row">
                    <div class="admin-form-group">
                        <label><i class="fas fa-tag"></i> الشارة</label>
                        <select id="productBadge">
                            <option value="">بدون شارة</option>
                            <option value="sale">تخفيض</option>
                            <option value="new">جديد</option>
                            <option value="hot">الأكثر مبيعاً</option>
                        </select>
                    </div>
                    <div class="admin-form-group">
                        <label><i class="fas fa-filter"></i> الفلتر</label>
                        <select id="productFilter" required>
                            ${filters.map(filter => 
                                `<option value="${filter.id}">${filter.nameAr}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
                
                <div class="admin-form-row">
                    <div class="admin-form-group">
                        <label><i class="fas fa-star"></i> التقييم (1-5)</label>
                        <input type="number" id="productRating" min="1" max="5" step="0.1" value="4.5" required>
                    </div>
                    <div class="admin-form-group">
                        <label><i class="fas fa-comments"></i> عدد المراجعات</label>
                        <input type="number" id="productReviews" value="0" required>
                    </div>
                </div>
                
                <div class="admin-form-group">
                    <label><i class="fas fa-palette"></i> الألوان المتاحة (افصل بفاصلة)</label>
                    <input type="text" id="productColors" placeholder="أحمر, أزرق, أخضر" required>
                </div>
                
                <div class="admin-form-group">
                    <label><i class="fas fa-ruler"></i> القياسات المتاحة (افصل بفاصلة)</label>
                    <input type="text" id="productSizes" placeholder="S, M, L, XL" required>
                </div>
                
                <div class="admin-form-group">
                    <label><i class="fas fa-boxes"></i> الكمية المتوفرة</label>
                    <input type="number" id="productStock" value="10" required>
                </div>
                
                <button type="submit" class="admin-btn-primary">
                    <i class="fas fa-save"></i>
                    حفظ المنتج
                </button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('addProductForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveProduct();
    });
}

async function saveProduct() {
    const productData = {
        id: `p${Date.now()}`,
        category: document.getElementById('productCategory').value,
        nameAr: document.getElementById('productName').value,
        currentPrice: parseInt(document.getElementById('productPrice').value),
        oldPrice: document.getElementById('productOldPrice').value ? 
                  parseInt(document.getElementById('productOldPrice').value) : null,
        image: document.getElementById('productImage').value,
        description: document.getElementById('productDescription').value,
        badge: document.getElementById('productBadge').value || null,
        filter: document.getElementById('productFilter').value,
        rating: parseFloat(document.getElementById('productRating').value),
        reviews: parseInt(document.getElementById('productReviews').value),
        colors: document.getElementById('productColors').value.split(',').map(c => c.trim()),
        sizes: document.getElementById('productSizes').value.split(',').map(s => s.trim()),
        stock: parseInt(document.getElementById('productStock').value)
    };
    
    try {
        await database.ref(`products/${productData.category}/${productData.id}`).set(productData);
        showAdminNotification('تم إضافة المنتج بنجاح!', 'success');
        document.querySelector('.admin-modal-overlay').remove();
        await loadDataFromFirebase();
    } catch (error) {
        console.error('Error saving product:', error);
        showAdminNotification('خطأ في حفظ المنتج!', 'error');
    }
}

// ============================================
// ADMIN CATEGORY MANAGEMENT
// ============================================
function showAddCategory() {
    if (!isAdminLoggedIn) {
        showAdminNotification('يجب تسجيل الدخول أولاً!', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'admin-modal-overlay';
    modal.innerHTML = `
        <div class="admin-modal">
            <button class="admin-modal-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 class="admin-modal-title">
                <i class="fas fa-folder-plus"></i>
                إضافة قسم جديد
            </h2>
            <form id="addCategoryForm" class="admin-form">
                <div class="admin-form-group">
                    <label><i class="fas fa-tag"></i> اسم القسم بالعربي</label>
                    <input type="text" id="categoryNameAr" required>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-code"></i> معرف القسم (انجليزي)</label>
                    <input type="text" id="categoryId" required placeholder="example-category">
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-icons"></i> أيقونة Font Awesome</label>
                    <input type="text" id="categoryIcon" required placeholder="fa-shirt">
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-palette"></i> اللون</label>
                    <input type="color" id="categoryColor" value="#ff6b9d" required>
                </div>
                <button type="submit" class="admin-btn-primary">
                    <i class="fas fa-save"></i>
                    حفظ القسم
                </button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('addCategoryForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveCategory();
    });
}

async function saveCategory() {
    const categoryData = {
        id: document.getElementById('categoryId').value,
        nameAr: document.getElementById('categoryNameAr').value,
        icon: document.getElementById('categoryIcon').value,
        color: document.getElementById('categoryColor').value
    };
    
    try {
        await database.ref(`categories/${categoryData.id}`).set(categoryData);
        showAdminNotification('تم إضافة القسم بنجاح!', 'success');
        document.querySelector('.admin-modal-overlay').remove();
        await loadDataFromFirebase();
    } catch (error) {
        console.error('Error saving category:', error);
        showAdminNotification('خطأ في حفظ القسم!', 'error');
    }
}

// ============================================
// ADMIN FILTER MANAGEMENT
// ============================================
function showAddFilter() {
    if (!isAdminLoggedIn) {
        showAdminNotification('يجب تسجيل الدخول أولاً!', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'admin-modal-overlay';
    modal.innerHTML = `
        <div class="admin-modal">
            <button class="admin-modal-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 class="admin-modal-title">
                <i class="fas fa-filter"></i>
                إضافة فلتر جديد
            </h2>
            <form id="addFilterForm" class="admin-form">
                <div class="admin-form-group">
                    <label><i class="fas fa-tag"></i> اسم الفلتر بالعربي</label>
                    <input type="text" id="filterNameAr" required>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-code"></i> معرف الفلتر (انجليزي)</label>
                    <input type="text" id="filterId" required placeholder="example-filter">
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-icons"></i> أيقونة Font Awesome</label>
                    <input type="text" id="filterIcon" required placeholder="fa-star">
                </div>
                <button type="submit" class="admin-btn-primary">
                    <i class="fas fa-save"></i>
                    حفظ الفلتر
                </button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('addFilterForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveFilter();
    });
}

async function saveFilter() {
    const filterData = {
        id: document.getElementById('filterId').value,
        nameAr: document.getElementById('filterNameAr').value,
        icon: document.getElementById('filterIcon').value
    };
    
    try {
        await database.ref(`filters/${filterData.id}`).set(filterData);
        showAdminNotification('تم إضافة الفلتر بنجاح!', 'success');
        document.querySelector('.admin-modal-overlay').remove();
        await loadDataFromFirebase();
    } catch (error) {
        console.error('Error saving filter:', error);
        showAdminNotification('خطأ في حفظ الفلتر!', 'error');
    }
}

// ============================================
// ADMIN ADS MANAGEMENT
// ============================================
function showAddScrollingAd() {
    if (!isAdminLoggedIn) {
        showAdminNotification('يجب تسجيل الدخول أولاً!', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'admin-modal-overlay';
    modal.innerHTML = `
        <div class="admin-modal">
            <button class="admin-modal-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 class="admin-modal-title">
                <i class="fas fa-ad"></i>
                إضافة إعلان متحرك
            </h2>
            <form id="addScrollingAdForm" class="admin-form">
                <div class="admin-form-group">
                    <label><i class="fas fa-align-right"></i> نص الإعلان</label>
                    <input type="text" id="scrollingAdText" required>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-link"></i> الرابط</label>
                    <input type="url" id="scrollingAdLink" value="#" required>
                </div>
                <div class="admin-form-group">
                    <label>
                        <input type="checkbox" id="scrollingAdActive" checked>
                        نشط
                    </label>
                </div>
                <button type="submit" class="admin-btn-primary">
                    <i class="fas fa-save"></i>
                    حفظ الإعلان
                </button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('addScrollingAdForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveScrollingAd();
    });
}

async function saveScrollingAd() {
    const adData = {
        id: `sa${Date.now()}`,
        text: document.getElementById('scrollingAdText').value,
        link: document.getElementById('scrollingAdLink').value,
        active: document.getElementById('scrollingAdActive').checked
    };
    
    try {
        await database.ref(`scrollingAds/${adData.id}`).set(adData);
        showAdminNotification('تم إضافة الإعلان المتحرك بنجاح!', 'success');
        document.querySelector('.admin-modal-overlay').remove();
        await loadDataFromFirebase();
    } catch (error) {
        console.error('Error saving scrolling ad:', error);
        showAdminNotification('خطأ في حفظ الإعلان!', 'error');
    }
}

function showAddPopupAd() {
    if (!isAdminLoggedIn) {
        showAdminNotification('يجب تسجيل الدخول أولاً!', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'admin-modal-overlay';
    modal.innerHTML = `
        <div class="admin-modal admin-modal-large">
            <button class="admin-modal-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 class="admin-modal-title">
                <i class="fas fa-window-maximize"></i>
                إضافة إعلان منبثق
            </h2>
            <form id="addPopupAdForm" class="admin-form">
                <div class="admin-form-group">
                    <label><i class="fas fa-heading"></i> العنوان</label>
                    <input type="text" id="popupAdTitle" required>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-align-right"></i> الوصف</label>
                    <textarea id="popupAdDescription" rows="3" required></textarea>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-image"></i> رابط الصورة</label>
                    <input type="url" id="popupAdImage" required>
                </div>
                <div class="admin-form-row">
                    <div class="admin-form-group">
                        <label><i class="fas fa-dollar-sign"></i> السعر الجديد</label>
                        <input type="number" id="popupAdNewPrice">
                    </div>
                    <div class="admin-form-group">
                        <label><i class="fas fa-dollar-sign"></i> السعر القديم</label>
                        <input type="number" id="popupAdOldPrice">
                    </div>
                </div>
                <div class="admin-form-row">
                    <div class="admin-form-group">
                        <label><i class="fas fa-tag"></i> الشارة</label>
                        <input type="text" id="popupAdBadge" value="SALE">
                    </div>
                    <div class="admin-form-group">
                        <label><i class="fas fa-box"></i> معرف المنتج (اختياري)</label>
                        <input type="text" id="popupAdProductId">
                    </div>
                </div>
                <div class="admin-form-group">
                    <label>
                        <input type="checkbox" id="popupAdActive" checked>
                        نشط
                    </label>
                </div>
                <button type="submit" class="admin-btn-primary">
                    <i class="fas fa-save"></i>
                    حفظ الإعلان
                </button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('addPopupAdForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await savePopupAd();
    });
}

async function savePopupAd() {
    const adData = {
        id: `pa${Date.now()}`,
        title: document.getElementById('popupAdTitle').value,
        description: document.getElementById('popupAdDescription').value,
        image: document.getElementById('popupAdImage').value,
        newPrice: parseInt(document.getElementById('popupAdNewPrice').value) || null,
        oldPrice: parseInt(document.getElementById('popupAdOldPrice').value) || null,
        badge: document.getElementById('popupAdBadge').value,
        productId: document.getElementById('popupAdProductId').value || null,
        active: document.getElementById('popupAdActive').checked
    };
    
    try {
        await database.ref(`popupAds/${adData.id}`).set(adData);
        showAdminNotification('تم إضافة الإعلان المنبثق بنجاح!', 'success');
        document.querySelector('.admin-modal-overlay').remove();
        await loadDataFromFirebase();
    } catch (error) {
        console.error('Error saving popup ad:', error);
        showAdminNotification('خطأ في حفظ الإعلان!', 'error');
    }
}

// ============================================
// ADMIN ORDERS MANAGEMENT
// ============================================
function showOrders() {
    if (!isAdminLoggedIn) {
        showAdminNotification('يجب تسجيل الدخول أولاً!', 'error');
        return;
    }
    
    navigateToPage('orders');
    closeSidebar();
}

async function updateOrderStatus(orderId, newStatus) {
    try {
        await database.ref(`orders/${orderId}/status`).set(newStatus);
        showAdminNotification('تم تحديث حالة الطلب بنجاح!', 'success');
        await loadDataFromFirebase();
        renderOrdersPage();
    } catch (error) {
        console.error('Error updating order status:', error);
        showAdminNotification('خطأ في تحديث حالة الطلب!', 'error');
    }
}

function renderOrdersPage() {
    const ordersContainer = document.getElementById('ordersContainer');
    if (!ordersContainer) return;
    
    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-bag"></i>
                <p>لا توجد طلبات حتى الآن</p>
            </div>
        `;
        return;
    }
    
    ordersContainer.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div class="order-id">
                    <i class="fas fa-hashtag"></i>
                    طلب #${order.id.slice(-6)}
                </div>
                <div class="order-status order-status-${order.status}">
                    ${getStatusText(order.status)}
                </div>
            </div>
            
            <div class="order-customer">
                <i class="fas fa-user"></i>
                <span>${order.customerName}</span>
                <i class="fas fa-phone"></i>
                <span>${order.customerPhone}</span>
            </div>
            
            <div class="order-address">
                <i class="fas fa-map-marker-alt"></i>
                ${order.customerAddress}
            </div>
            
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="order-item-details">
                            <div class="order-item-name">${item.name}</div>
                            <div class="order-item-info">
                                الكمية: ${item.quantity} | 
                                اللون: ${item.selectedColor} | 
                                المقاس: ${item.selectedSize}
                            </div>
                        </div>
                        <div class="order-item-price">${formatPrice(item.price * item.quantity)}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="order-total">
                <span>الإجمالي:</span>
                <span class="order-total-amount">${formatPrice(order.total)}</span>
            </div>
            
            <div class="order-date">
                <i class="fas fa-calendar"></i>
                ${new Date(order.date).toLocaleString('ar-IQ')}
            </div>
            
            ${isAdminLoggedIn ? `
                <div class="order-actions">
                    <select class="order-status-select" onchange="updateOrderStatus('${order.id}', this.value)">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>قيد الانتظار</option>
                        <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>تم التأكيد</option>
                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>قيد الشحن</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>تم التوصيل</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>ملغي</option>
                    </select>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'قيد الانتظار',
        'confirmed': 'تم التأكيد',
        'shipped': 'قيد الشحن',
        'delivered': 'تم التوصيل',
        'cancelled': 'ملغي'
    };
    return statusMap[status] || status;
}

// ============================================
// UI UPDATES
// ============================================
function updateCategoriesUI() {
    const categoryBtns = document.getElementById('categoryBtns');
    const sidebarCategories = document.getElementById('sidebarCategories');
    
    if (categoryBtns) {
        categoryBtns.innerHTML = categories.map(category => `
            <button class="category-btn ${category.id === currentCategory ? 'active' : ''}" 
                    onclick="filterByCategory('${category.id}')">
                <i class="fas ${category.icon}"></i>
                ${category.nameAr}
            </button>
        `).join('');
    }
    
    if (sidebarCategories) {
        sidebarCategories.innerHTML = categories.filter(c => c.id !== 'all').map(category => `
            <button class="sidebar-menu-item" onclick="filterByCategory('${category.id}'); closeSidebar();">
                <i class="fas ${category.icon}"></i>
                <span>${category.nameAr}</span>
            </button>
        `).join('');
    }
}

function updateFiltersUI() {
    const filterBtns = document.getElementById('filterBtns');
    if (filterBtns) {
        filterBtns.innerHTML = filters.map(filter => `
            <button class="filter-btn ${filter.id === currentFilter ? 'active' : ''}" 
                    onclick="filterByFilter('${filter.id}')">
                <i class="fas ${filter.icon}"></i>
                ${filter.nameAr}
            </button>
        `).join('');
    }
}

function updateScrollingAds() {
    const topAdText = document.getElementById('topAdText');
    if (topAdText && scrollingAds.length > 0) {
        const adsHTML = scrollingAds.map(ad => 
            `<a href="${ad.link}">${ad.text}</a><span class="ad-separator">•</span>`
        ).join('');
        topAdText.innerHTML = adsHTML + adsHTML; // Duplicate for seamless scroll
    }
}

// ============================================
// FILTERING & PRODUCT DISPLAY
// ============================================
function filterByCategory(categoryId) {
    currentCategory = categoryId;
    updateCategoriesUI();
    loadProducts();
}

function filterByFilter(filterId) {
    currentFilter = filterId;
    updateFiltersUI();
    loadProducts();
}

function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    let filteredProducts = products;
    
    // Filter by category
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentCategory);
    }
    
    // Filter by filter
    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.filter === currentFilter);
    }
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <p>لا توجد منتجات في هذا القسم</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="showProductDetails('${product.id}')">
            ${product.badge ? `<div class="product-badge product-badge-${product.badge}">${getBadgeText(product.badge)}</div>` : ''}
            ${product.oldPrice ? `<div class="product-discount">-${Math.round((1 - product.currentPrice / product.oldPrice) * 100)}%</div>` : ''}
            
            <button class="product-wishlist ${wishlistItems.includes(product.id) ? 'active' : ''}" 
                    onclick="event.stopPropagation(); toggleWishlist('${product.id}')">
                <i class="fas fa-heart"></i>
            </button>
            
            <img src="${product.image}" alt="${product.nameAr}" class="product-image">
            
            <div class="product-info">
                <h3 class="product-name">${product.nameAr}</h3>
                
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span class="product-reviews">(${product.reviews})</span>
                </div>
                
                <div class="product-colors">
                    ${product.colors.slice(0, 4).map(color => 
                        `<span class="product-color-dot" title="${color}"></span>`
                    ).join('')}
                    ${product.colors.length > 4 ? `<span class="product-more-colors">+${product.colors.length - 4}</span>` : ''}
                </div>
                
                <div class="product-price-container">
                    ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                    <span class="product-price">${formatPrice(product.currentPrice)}</span>
                </div>
                
                <div class="product-stock">
                    <i class="fas fa-box"></i>
                    متوفر: ${product.stock} قطعة
                </div>
                
                <button class="product-add-cart" onclick="event.stopPropagation(); showProductDetails('${product.id}')">
                    <i class="fas fa-shopping-cart"></i>
                    إضافة للسلة
                </button>
            </div>
        </div>
    `).join('');
}

function getBadgeText(badge) {
    const badgeMap = {
        'sale': 'تخفيض',
        'new': 'جديد',
        'hot': 'الأكثر مبيعاً'
    };
    return badgeMap[badge] || badge;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function formatPrice(price) {
    return new Intl.NumberFormat('ar-IQ', {
        style: 'currency',
        currency: 'IQD',
        minimumFractionDigits: 0
    }).format(price);
}

// ============================================
// PRODUCT DETAILS
// ============================================
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.createElement('div');
    modal.className = 'product-modal-overlay';
    modal.innerHTML = `
        <div class="product-modal">
            <button class="product-modal-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="product-modal-content">
                <div class="product-modal-image">
                    <img src="${product.image}" alt="${product.nameAr}">
                    ${product.badge ? `<div class="product-badge product-badge-${product.badge}">${getBadgeText(product.badge)}</div>` : ''}
                </div>
                
                <div class="product-modal-info">
                    <h2 class="product-modal-title">${product.nameAr}</h2>
                    
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span class="product-reviews">(${product.reviews} مراجعة)</span>
                    </div>
                    
                    <p class="product-modal-description">${product.description}</p>
                    
                    <div class="product-modal-price">
                        ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                        <span class="product-price">${formatPrice(product.currentPrice)}</span>
                    </div>
                    
                    <div class="product-modal-stock">
                        <i class="fas fa-box"></i>
                        <span>متوفر: ${product.stock} قطعة</span>
                    </div>
                    
                    <div class="product-modal-options">
                        <div class="product-option-group">
                            <label><i class="fas fa-palette"></i> اختر اللون:</label>
                            <div class="product-colors-grid">
                                ${product.colors.map((color, index) => `
                                    <button class="product-color-btn ${index === 0 ? 'active' : ''}" 
                                            data-color="${color}"
                                            onclick="selectColor(this)">
                                        ${color}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="product-option-group">
                            <label><i class="fas fa-ruler"></i> اختر المقاس:</label>
                            <div class="product-sizes-grid">
                                ${product.sizes.map((size, index) => `
                                    <button class="product-size-btn ${index === 0 ? 'active' : ''}" 
                                            data-size="${size}"
                                            onclick="selectSize(this)">
                                        ${size}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="product-option-group">
                            <label><i class="fas fa-sort-numeric-up"></i> الكمية:</label>
                            <div class="product-quantity">
                                <button onclick="decrementQuantity()"><i class="fas fa-minus"></i></button>
                                <input type="number" id="productQuantity" value="1" min="1" max="${product.stock}" readonly>
                                <button onclick="incrementQuantity(${product.stock})"><i class="fas fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="product-modal-actions">
                        <button class="product-btn-primary" onclick="addToCart('${product.id}')">
                            <i class="fas fa-shopping-cart"></i>
                            إضافة للسلة
                        </button>
                        <button class="product-btn-secondary ${wishlistItems.includes(product.id) ? 'active' : ''}" 
                                onclick="toggleWishlist('${product.id}')">
                            <i class="fas fa-heart"></i>
                            ${wishlistItems.includes(product.id) ? 'في المفضلة' : 'أضف للمفضلة'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function selectColor(btn) {
    document.querySelectorAll('.product-color-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function selectSize(btn) {
    document.querySelectorAll('.product-size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function incrementQuantity(max) {
    const input = document.getElementById('productQuantity');
    if (parseInt(input.value) < max) {
        input.value = parseInt(input.value) + 1;
    }
}

function decrementQuantity() {
    const input = document.getElementById('productQuantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// ============================================
// CART MANAGEMENT
// ============================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const selectedColor = document.querySelector('.product-color-btn.active')?.dataset.color || product.colors[0];
    const selectedSize = document.querySelector('.product-size-btn.active')?.dataset.size || product.sizes[0];
    const quantity = parseInt(document.getElementById('productQuantity')?.value || 1);
    
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(item => 
        item.id === productId && 
        item.selectedColor === selectedColor && 
        item.selectedSize === selectedSize
    );
    
    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        cartItems.push({
            id: productId,
            name: product.nameAr,
            price: product.currentPrice,
            image: product.image,
            selectedColor,
            selectedSize,
            quantity,
            stock: product.stock
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartBadge();
    showAdminNotification('تم إضافة المنتج للسلة!', 'success');
    
    // Close product modal if open
    const modal = document.querySelector('.product-modal-overlay');
    if (modal) modal.remove();
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const bottomBadge = document.getElementById('bottomCartBadge');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    if (bottomBadge) {
        bottomBadge.textContent = totalItems;
        bottomBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function showCart() {
    navigateToPage('cart');
    renderCartPage();
    closeSidebar();
}

function renderCartPage() {
    const cartContainer = document.getElementById('cartContainer');
    if (!cartContainer) return;
    
    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <p>السلة فارغة</p>
                <button class="btn-primary" onclick="navigateToPage('home')">
                    <i class="fas fa-shopping-bag"></i>
                    تسوق الآن
                </button>
            </div>
        `;
        return;
    }
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartContainer.innerHTML = `
        <div class="cart-items">
            ${cartItems.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3 class="cart-item-name">${item.name}</h3>
                        <div class="cart-item-options">
                            <span><i class="fas fa-palette"></i> ${item.selectedColor}</span>
                            <span><i class="fas fa-ruler"></i> ${item.selectedSize}</span>
                        </div>
                        <div class="cart-item-price">${formatPrice(item.price)}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button onclick="updateCartQuantity(${index}, -1)"><i class="fas fa-minus"></i></button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity(${index}, 1)"><i class="fas fa-plus"></i></button>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('')}
        </div>
        
        <div class="cart-summary">
            <div class="cart-summary-row">
                <span>المجموع الفرعي:</span>
                <span>${formatPrice(total)}</span>
            </div>
            <div class="cart-summary-row">
                <span>التوصيل:</span>
                <span class="text-success">مجاني</span>
            </div>
            <div class="cart-summary-total">
                <span>الإجمالي:</span>
                <span>${formatPrice(total)}</span>
            </div>
            <button class="btn-primary btn-block" onclick="showCheckout()">
                <i class="fas fa-credit-card"></i>
                إتمام الطلب
            </button>
        </div>
    `;
}

function updateCartQuantity(index, change) {
    const item = cartItems[index];
    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
        removeFromCart(index);
        return;
    }
    
    if (newQuantity > item.stock) {
        showAdminNotification(`الكمية المتاحة فقط ${item.stock}`, 'error');
        return;
    }
    
    cartItems[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartBadge();
    renderCartPage();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartBadge();
    renderCartPage();
    showAdminNotification('تم حذف المنتج من السلة', 'info');
}

// ============================================
// CHECKOUT
// ============================================
function showCheckout() {
    const modal = document.createElement('div');
    modal.className = 'admin-modal-overlay';
    modal.innerHTML = `
        <div class="admin-modal admin-modal-large">
            <button class="admin-modal-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 class="admin-modal-title">
                <i class="fas fa-shopping-bag"></i>
                إتمام الطلب
            </h2>
            <form id="checkoutForm" class="admin-form">
                <div class="admin-form-group">
                    <label><i class="fas fa-user"></i> الاسم الكامل</label>
                    <input type="text" id="customerName" required>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-phone"></i> رقم الهاتف</label>
                    <input type="tel" id="customerPhone" required>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-map-marker-alt"></i> العنوان الكامل</label>
                    <textarea id="customerAddress" rows="3" required></textarea>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-sticky-note"></i> ملاحظات (اختياري)</label>
                    <textarea id="orderNotes" rows="2"></textarea>
                </div>
                
                <div class="checkout-summary">
                    <h3>ملخص الطلب</h3>
                    <div class="checkout-items">
                        ${cartItems.map(item => `
                            <div class="checkout-item">
                                <span>${item.name} (${item.quantity}x)</span>
                                <span>${formatPrice(item.price * item.quantity)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="checkout-total">
                        <span>الإجمالي:</span>
                        <span>${formatPrice(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0))}</span>
                    </div>
                </div>
                
                <button type="submit" class="admin-btn-primary">
                    <i class="fas fa-check"></i>
                    تأكيد الطلب
                </button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitOrder();
    });
}

async function submitOrder() {
    const orderData = {
        customerName: document.getElementById('customerName').value,
        customerPhone: document.getElementById('customerPhone').value,
        customerAddress: document.getElementById('customerAddress').value,
        notes: document.getElementById('orderNotes').value,
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toISOString(),
        status: 'pending'
    };
    
    try {
        const newOrderRef = await database.ref('orders').push(orderData);
        showAdminNotification('تم إرسال الطلب بنجاح!', 'success');
        
        // Clear cart
        cartItems = [];
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartBadge();
        
        // Close modal and navigate
        document.querySelector('.admin-modal-overlay').remove();
        navigateToPage('home');
        
        // Show success message
        setTimeout(() => {
            alert(`شكراً لك! تم استلام طلبك برقم: ${newOrderRef.key.slice(-6)}\nسيتم التواصل معك قريباً.`);
        }, 500);
        
    } catch (error) {
        console.error('Error submitting order:', error);
        showAdminNotification('خطأ في إرسال الطلب!', 'error');
    }
}

// ============================================
// WISHLIST MANAGEMENT
// ============================================
function toggleWishlist(productId) {
    const index = wishlistItems.indexOf(productId);
    
    if (index > -1) {
        wishlistItems.splice(index, 1);
        showAdminNotification('تم إزالة المنتج من المفضلة', 'info');
    } else {
        wishlistItems.push(productId);
        showAdminNotification('تم إضافة المنتج للمفضلة!', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    updateWishlistBadge();
    loadProducts();
    
    // Update button if in modal
    const modalBtn = document.querySelector('.product-modal .product-btn-secondary');
    if (modalBtn) {
        const isInWishlist = wishlistItems.includes(productId);
        modalBtn.classList.toggle('active', isInWishlist);
        modalBtn.innerHTML = `
            <i class="fas fa-heart"></i>
            ${isInWishlist ? 'في المفضلة' : 'أضف للمفضلة'}
        `;
    }
}

function updateWishlistBadge() {
    const badge = document.getElementById('wishlistBadge');
    const bottomBadge = document.getElementById('bottomWishlistBadge');
    
    if (badge) {
        badge.textContent = wishlistItems.length;
        badge.style.display = wishlistItems.length > 0 ? 'flex' : 'none';
    }
    
    if (bottomBadge) {
        bottomBadge.textContent = wishlistItems.length;
        bottomBadge.style.display = wishlistItems.length > 0 ? 'flex' : 'none';
    }
}

function showWishlist() {
    navigateToPage('wishlist');
    renderWishlistPage();
    closeSidebar();
}

function renderWishlistPage() {
    const wishlistContainer = document.getElementById('wishlistContainer');
    if (!wishlistContainer) return;
    
    const wishlistProducts = products.filter(p => wishlistItems.includes(p.id));
    
    if (wishlistProducts.length === 0) {
        wishlistContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <p>لا توجد منتجات مفضلة</p>
                <button class="btn-primary" onclick="navigateToPage('home')">
                    <i class="fas fa-shopping-bag"></i>
                    تصفح المنتجات
                </button>
            </div>
        `;
        return;
    }
    
    wishlistContainer.innerHTML = `
        <div class="products-grid">
            ${wishlistProducts.map(product => `
                <div class="product-card" onclick="showProductDetails('${product.id}')">
                    ${product.badge ? `<div class="product-badge product-badge-${product.badge}">${getBadgeText(product.badge)}</div>` : ''}
                    ${product.oldPrice ? `<div class="product-discount">-${Math.round((1 - product.currentPrice / product.oldPrice) * 100)}%</div>` : ''}
                    
                    <button class="product-wishlist active" 
                            onclick="event.stopPropagation(); toggleWishlist('${product.id}')">
                        <i class="fas fa-heart"></i>
                    </button>
                    
                    <img src="${product.image}" alt="${product.nameAr}" class="product-image">
                    
                    <div class="product-info">
                        <h3 class="product-name">${product.nameAr}</h3>
                        
                        <div class="product-rating">
                            ${generateStars(product.rating)}
                            <span class="product-reviews">(${product.reviews})</span>
                        </div>
                        
                        <div class="product-price-container">
                            ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                            <span class="product-price">${formatPrice(product.currentPrice)}</span>
                        </div>
                        
                        <button class="product-add-cart" onclick="event.stopPropagation(); showProductDetails('${product.id}')">
                            <i class="fas fa-shopping-cart"></i>
                            إضافة للسلة
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ============================================
// NOTIFICATIONS PAGE
// ============================================
function showNotifications() {
    navigateToPage('notifications');
    closeSidebar();
}

// ============================================
// POPUP AD
// ============================================
function showPopupAd(ad) {
    const popup = document.createElement('div');
    popup.className = 'popup-ad-overlay';
    popup.innerHTML = `
        <div class="popup-ad">
            <button class="popup-ad-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            ${ad.badge ? `<div class="popup-ad-badge">${ad.badge}</div>` : ''}
            <div class="popup-ad-content" onclick="if('${ad.productId}') showProductDetails('${ad.productId}'); this.parentElement.parentElement.remove();">
                <img src="${ad.image}" alt="${ad.title}" class="popup-ad-image">
                <div class="popup-ad-details">
                    <h3 class="popup-ad-title">${ad.title}</h3>
                    <p class="popup-ad-description">${ad.description}</p>
                    ${ad.newPrice ? `
                        <div class="popup-ad-price-container">
                            ${ad.oldPrice ? `<span class="popup-ad-old-price">${formatPrice(ad.oldPrice)}</span>` : ''}
                            <span class="popup-ad-new-price">${formatPrice(ad.newPrice)}</span>
                        </div>
                    ` : ''}
                    <button class="popup-ad-cta">
                        <i class="fas fa-shopping-cart"></i>
                        تسوق الآن
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
}

// ============================================
// NAVIGATION
// ============================================
function navigateToPage(pageName) {
    currentPage = pageName;
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const page = document.getElementById(`${pageName}Page`);
    if (page) {
        page.classList.add('active');
    }
    
    // Update bottom nav
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    const navItem = document.querySelector(`[onclick="navigateToPage('${pageName}')"]`);
    if (navItem) {
        navItem.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// ============================================
// SIDEBAR
// ============================================
function toggleSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// ============================================
// SCROLL TO TOP
// ============================================
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
        scrollBtn.classList.toggle('visible', window.scrollY > 300);
    }
});

// ============================================
// PWA INSTALLATION
// ============================================
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
        installBtn.style.display = 'flex';
    }
});

async function installPWA() {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
        showAdminNotification('تم تثبيت التطبيق بنجاح!', 'success');
    }
    
    deferredPrompt = null;
    document.getElementById('installBtn').style.display = 'none';
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 2000);
    
    // Initialize Firebase data
    await initializeFirebaseData();
    
    // Update UI
    updateAdminUI();
    updateCartBadge();
    updateWishlistBadge();
    
    // Setup sidebar overlay click
    document.getElementById('sidebarOverlay')?.addEventListener('click', closeSidebar);
});
