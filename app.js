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

// Initialize Firebase
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
// INITIAL PRODUCTS DATABASE (للرفع الأولي)
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
            description: 'فستان سهرة فاخر من أجود الأقمشة، تصميم عصري وأنيق يناسب جميع المناسبات الخاصة. متوفر بألوان متعددة.',
            discount: '-40%',
            filter: 'sale'
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
            description: 'بلوزة صيفية خفيفة ومريحة، تصميم عملي يناسب الأجواء الحارة.',
            discount: '-31%',
            filter: 'new'
        },
        {
            id: 3,
            name: 'تنورة طويلة أنيقة',
            price: 55000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800',
            category: 'women',
            badge: 'hot',
            rating: 4.9,
            reviews: 156,
            description: 'تنورة طويلة بتصميم عصري، مثالية للإطلالات اليومية والرسمية.',
            filter: 'popular'
        },
        {
            id: 4,
            name: 'جاكيت جينز نسائي',
            price: 89900,
            oldPrice: 120000,
            image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800',
            category: 'women',
            badge: 'sale',
            rating: 4.7,
            reviews: 87,
            description: 'جاكيت جينز كلاسيكي بقصة عصرية، يناسب جميع الأوقات.',
            discount: '-25%',
            filter: 'sale'
        },
        {
            id: 5,
            name: 'فستان كاجوال يومي',
            price: 65000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
            category: 'women',
            badge: 'new',
            rating: 4.5,
            reviews: 73,
            description: 'فستان كاجوال مريح للاستخدام اليومي، قماش عالي الجودة.',
            filter: 'new'
        },
        {
            id: 6,
            name: 'طقم رياضي نسائي',
            price: 75000,
            oldPrice: 95000,
            image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
            category: 'women',
            badge: 'hot',
            rating: 4.8,
            reviews: 142,
            description: 'طقم رياضي عملي ومريح، مناسب للتمارين والأنشطة اليومية.',
            discount: '-21%',
            filter: 'popular'
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
            description: 'قميص رجالي أنيق بقصة كلاسيكية، مثالي للمناسبات الرسمية.',
            discount: '-31%',
            filter: 'sale'
        },
        {
            id: 8,
            name: 'بنطلون جينز رجالي',
            price: 68000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
            category: 'men',
            badge: 'new',
            rating: 4.7,
            reviews: 112,
            description: 'بنطلون جينز عصري بقصة مريحة، مناسب لجميع المناسبات.',
            filter: 'new'
        },
        {
            id: 9,
            name: 'تيشيرت رياضي',
            price: 35000,
            oldPrice: 50000,
            image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800',
            category: 'men',
            badge: 'hot',
            rating: 4.5,
            reviews: 156,
            description: 'تيشيرت رياضي خفيف ومريح، مثالي للتمارين الرياضية.',
            discount: '-30%',
            filter: 'popular'
        },
        {
            id: 10,
            name: 'سترة شتوية رجالية',
            price: 135000,
            oldPrice: 180000,
            image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
            category: 'men',
            badge: 'sale',
            rating: 4.9,
            reviews: 187,
            description: 'سترة شتوية دافئة وأنيقة، حماية مثالية من البرد.',
            discount: '-25%',
            filter: 'sale'
        }
    ],
    kids: [
        {
            id: 11,
            name: 'فستان أطفال',
            price: 45000,
            oldPrice: 60000,
            image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800',
            category: 'kids',
            badge: 'sale',
            rating: 4.8,
            reviews: 145,
            description: 'فستان أطفال جميل وعملي، مناسب للمناسبات الخاصة.',
            discount: '-25%',
            filter: 'sale'
        },
        {
            id: 12,
            name: 'طقم ولادي رياضي',
            price: 52000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800',
            category: 'kids',
            badge: 'new',
            rating: 4.6,
            reviews: 98,
            description: 'طقم رياضي مريح للأطفال، قماش عالي الجودة.',
            filter: 'new'
        },
        {
            id: 13,
            name: 'جاكيت أطفال',
            price: 68000,
            oldPrice: 85000,
            image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800',
            category: 'kids',
            badge: 'hot',
            rating: 4.7,
            reviews: 134,
            description: 'جاكيت دافئ للأطفال، تصميم عصري وعملي.',
            discount: '-20%',
            filter: 'popular'
        }
    ],
    accessories: [
        {
            id: 14,
            name: 'نظارة شمسية',
            price: 42000,
            oldPrice: 60000,
            image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
            category: 'accessories',
            badge: 'sale',
            rating: 4.5,
            reviews: 87,
            description: 'نظارة شمسية عصرية بحماية UV400.',
            discount: '-30%',
            filter: 'sale'
        },
        {
            id: 15,
            name: 'محفظة جلدية',
            price: 55000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
            category: 'accessories',
            badge: 'new',
            rating: 4.6,
            reviews: 97,
            description: 'محفظة أنيقة من الجلد الطبيعي، متعددة الجيوب.',
            filter: 'new'
        },
        {
            id: 16,
            name: 'سوار معدني',
            price: 32000,
            oldPrice: 45000,
            image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
            category: 'accessories',
            badge: 'sale',
            rating: 4.4,
            reviews: 76,
            description: 'سوار معدني بتصميم عصري، مطلي بالذهب.',
            discount: '-29%',
            filter: 'sale'
        }
    ],
    shoes: [
        {
            id: 17,
            name: 'حذاء رياضي نايك',
            price: 95000,
            oldPrice: 125000,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
            category: 'shoes',
            badge: 'hot',
            rating: 4.9,
            reviews: 245,
            description: 'حذاء رياضي عالي الجودة، راحة قصوى ومتانة.',
            discount: '-24%',
            filter: 'popular'
        },
        {
            id: 18,
            name: 'حذاء كلاسيكي رجالي',
            price: 78000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800',
            category: 'shoes',
            badge: 'new',
            rating: 4.6,
            reviews: 118,
            description: 'حذاء كلاسيكي أنيق للمناسبات الرسمية.',
            filter: 'new'
        },
        {
            id: 19,
            name: 'صندل نسائي صيفي',
            price: 48000,
            oldPrice: 65000,
            image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
            category: 'shoes',
            badge: 'sale',
            rating: 4.5,
            reviews: 92,
            description: 'صندل صيفي مريح وأنيق، مناسب للأجواء الحارة.',
            discount: '-26%',
            filter: 'sale'
        },
        {
            id: 20,
            name: 'حذاء كاجوال',
            price: 62000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800',
            category: 'shoes',
            badge: 'hot',
            rating: 4.7,
            reviews: 156,
            description: 'حذاء كاجوال عملي ومريح للاستخدام اليومي.',
            filter: 'popular'
        }
    ],
    bags: [
        {
            id: 21,
            name: 'حقيبة يد نسائية',
            price: 85000,
            oldPrice: 115000,
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
            category: 'bags',
            badge: 'sale',
            rating: 4.8,
            reviews: 134,
            description: 'حقيبة يد أنيقة من الجلد الطبيعي، تصميم عصري.',
            discount: '-26%',
            filter: 'sale'
        },
        {
            id: 22,
            name: 'حقيبة ظهر رياضية',
            price: 52000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
            category: 'bags',
            badge: 'new',
            rating: 4.6,
            reviews: 108,
            description: 'حقيبة ظهر عملية ومريحة، مناسبة للرياضة والسفر.',
            filter: 'new'
        },
        {
            id: 23,
            name: 'حقيبة كروس بودي',
            price: 68000,
            oldPrice: 90000,
            image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800',
            category: 'bags',
            badge: 'hot',
            rating: 4.7,
            reviews: 142,
            description: 'حقيبة كروس بودي صغيرة وأنيقة، مثالية للنزهات.',
            discount: '-24%',
            filter: 'popular'
        },
        {
            id: 24,
            name: 'حقيبة سفر كبيرة',
            price: 125000,
            oldPrice: 165000,
            image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800',
            category: 'bags',
            badge: 'sale',
            rating: 4.9,
            reviews: 198,
            description: 'حقيبة سفر واسعة ومتينة، مناسبة للرحلات الطويلة.',
            discount: '-24%',
            filter: 'sale'
        },
        {
            id: 25,
            name: 'شنطة لابتوب',
            price: 72000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
            category: 'bags',
            badge: 'new',
            rating: 4.5,
            reviews: 87,
            description: 'شنطة لابتوب عملية بتصميم احترافي، حماية ممتازة.',
            filter: 'new'
        }
    ],
    silver: [
        {
            id: 26,
            name: 'سلسلة فضة إيطالية',
            price: 120000,
            oldPrice: 165000,
            image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            category: 'silver',
            badge: 'hot',
            rating: 4.9,
            reviews: 215,
            description: 'سلسلة فضة إيطالية عيار 925، تصميم فاخر وأنيق.',
            discount: '-27%',
            filter: 'popular'
        },
        {
            id: 27,
            name: 'خاتم فضة بحجر كريم',
            price: 85000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
            category: 'silver',
            badge: 'new',
            rating: 4.7,
            reviews: 143,
            description: 'خاتم فضة عيار 925 مرصع بحجر كريم أصلي.',
            filter: 'new'
        },
        {
            id: 28,
            name: 'أقراط فضة',
            price: 65000,
            oldPrice: 90000,
            image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
            category: 'silver',
            badge: 'sale',
            rating: 4.8,
            reviews: 167,
            description: 'أقراط فضة ناعمة، مثالية للإطلالات اليومية.',
            discount: '-28%',
            filter: 'sale'
        }
    ],
    gifts: [
        {
            id: 29,
            name: 'مجموعة هدايا فاخرة',
            price: 125000,
            oldPrice: 175000,
            image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
            category: 'gifts',
            badge: 'hot',
            rating: 4.9,
            reviews: 198,
            description: 'مجموعة هدايا فاخرة مع تغليف أنيق.',
            discount: '-29%',
            filter: 'popular'
        },
        {
            id: 30,
            name: 'علبة عطر فاخرة',
            price: 95000,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
            category: 'gifts',
            badge: 'new',
            rating: 4.7,
            reviews: 156,
            description: 'علبة عطر فاخرة برائحة مميزة.',
            filter: 'new'
        }
    ]
};

// Initial Categories
const initialCategories = [
    { id: 'women', name: 'نسائي', icon: 'fa-female', color: '#ff6b9d' },
    { id: 'men', name: 'رجالي', icon: 'fa-male', color: '#4a90e2' },
    { id: 'kids', name: 'أطفال', icon: 'fa-child', color: '#9b59b6' },
    { id: 'accessories', name: 'إكسسوارات', icon: 'fa-glasses', color: '#e67e22' },
    { id: 'shoes', name: 'أحذية', icon: 'fa-shoe-prints', color: '#27ae60' },
    { id: 'bags', name: 'حقائب', icon: 'fa-shopping-bag', color: '#c44569' },
    { id: 'silver', name: 'فضيات', icon: 'fa-ring', color: '#95a5a6' },
    { id: 'gifts', name: 'هدايا', icon: 'fa-gift', color: '#f39c12' }
];

// Initial Filters
const initialFilters = [
    { id: 'all', name: 'الكل', icon: 'fa-th' },
    { id: 'sale', name: 'تخفيضات', icon: 'fa-tag' },
    { id: 'new', name: 'جديد', icon: 'fa-star' },
    { id: 'popular', name: 'الأكثر مبيعاً', icon: 'fa-fire' }
];

// Initial Ads (Scrolling Marquee)
const initialScrollingAds = [
    { id: 1, text: '🔥 خصم خاص 40% على جميع الفساتين - لفترة محدودة!', link: '#', active: true },
    { id: 2, text: '🎁 توصيل مجاني للطلبات فوق 100,000 د.ع', link: '#', active: true },
    { id: 3, text: '⭐ منتجات جديدة وصلت - تسوق الآن!', link: '#', active: true }
];

// Initial Popup Ads
const initialPopupAds = [
    {
        id: 1,
        title: 'فستان سهرة فاخر',
        description: 'تصميم عصري وأنيق - متوفر بألوان متعددة',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
        oldPrice: 250000,
        newPrice: 149900,
        badge: '🔥 عرض خاص',
        productId: 1,
        active: true
    }
];

// ============================================
// FIREBASE INITIALIZATION CHECK
// ============================================
async function initializeFirebaseData() {
    try {
        // التحقق من وجود علامة التهيئة
        const initSnapshot = await database.ref('initialized').once('value');
        const isInitialized = initSnapshot.val();

        if (!isInitialized) {
            console.log('🔄 جاري رفع البيانات الأولية إلى Firebase...');
            
            // رفع المنتجات
            await database.ref('products').set(initialProductsDatabase);
            console.log('✅ تم رفع المنتجات');

            // رفع الأقسام
            const categoriesObj = {};
            initialCategories.forEach(cat => {
                categoriesObj[cat.id] = cat;
            });
            await database.ref('categories').set(categoriesObj);
            console.log('✅ تم رفع الأقسام');

            // رفع الفلاتر
            const filtersObj = {};
            initialFilters.forEach(filter => {
                filtersObj[filter.id] = filter;
            });
            await database.ref('filters').set(filtersObj);
            console.log('✅ تم رفع الفلاتر');

            // رفع الإعلانات المتحركة
            const scrollingAdsObj = {};
            initialScrollingAds.forEach(ad => {
                scrollingAdsObj[ad.id] = ad;
            });
            await database.ref('scrollingAds').set(scrollingAdsObj);
            console.log('✅ تم رفع الإعلانات المتحركة');

            // رفع الإعلانات المنبثقة
            const popupAdsObj = {};
            initialPopupAds.forEach(ad => {
                popupAdsObj[ad.id] = ad;
            });
            await database.ref('popupAds').set(popupAdsObj);
            console.log('✅ تم رفع الإعلانات المنبثقة');

            // تعيين علامة التهيئة
            await database.ref('initialized').set(true);
            console.log('✅ اكتملت التهيئة الأولية بنجاح!');
        } else {
            console.log('✅ البيانات موجودة مسبقاً في Firebase');
        }
    } catch (error) {
        console.error('❌ خطأ في تهيئة Firebase:', error);
    }
}

// ============================================
// LOAD DATA FROM FIREBASE
// ============================================
let productsDatabase = {};
let categories = [];
let filters = [];
let scrollingAds = [];
let popupAds = [];

async function loadDataFromFirebase() {
    try {
        // تحميل المنتجات
        const productsSnapshot = await database.ref('products').once('value');
        productsDatabase = productsSnapshot.val() || {};

        // تحميل الأقسام
        const categoriesSnapshot = await database.ref('categories').once('value');
        const categoriesObj = categoriesSnapshot.val() || {};
        categories = Object.values(categoriesObj);

        // تحميل الفلاتر
        const filtersSnapshot = await database.ref('filters').once('value');
        const filtersObj = filtersSnapshot.val() || {};
        filters = Object.values(filtersObj);

        // تحميل الإعلانات المتحركة
        const scrollingAdsSnapshot = await database.ref('scrollingAds').once('value');
        const scrollingAdsObj = scrollingAdsSnapshot.val() || {};
        scrollingAds = Object.values(scrollingAdsObj);

        // تحميل الإعلانات المنبثقة
        const popupAdsSnapshot = await database.ref('popupAds').once('value');
        const popupAdsObj = popupAdsSnapshot.val() || {};
        popupAds = Object.values(popupAdsObj);

        console.log('✅ تم تحميل جميع البيانات من Firebase');
    } catch (error) {
        console.error('❌ خطأ في تحميل البيانات:', error);
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
                <button class="admin-modal-close" onclick="closeAdminLogin()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="admin-modal-body">
                <div class="form-group">
                    <label><i class="fas fa-user"></i> اسم المستخدم</label>
                    <input type="text" id="adminUsername" class="admin-input" placeholder="أدخل اسم المستخدم">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-lock"></i> كلمة المرور</label>
                    <input type="password" id="adminPassword" class="admin-input" placeholder="أدخل كلمة المرور">
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

function closeAdminLogin() {
    const modal = document.querySelector('.admin-modal-overlay');
    if (modal) {
        modal.remove();
    }
}

function loginAdmin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const errorDiv = document.getElementById('adminError');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        closeAdminLogin();
        updateAdminUI();
        showAdminNotification('تم تسجيل الدخول بنجاح!', 'success');
    } else {
        errorDiv.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة';
        errorDiv.style.display = 'block';
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    updateAdminUI();
    showAdminNotification('تم تسجيل الخروج بنجاح', 'info');
}

function updateAdminUI() {
    const adminMenuItems = document.querySelectorAll('.admin-only');
    adminMenuItems.forEach(item => {
        item.style.display = isAdminLoggedIn ? 'flex' : 'none';
    });

    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    
    if (adminLoginBtn && adminLogoutBtn) {
        if (isAdminLoggedIn) {
            adminLoginBtn.style.display = 'none';
            adminLogoutBtn.style.display = 'flex';
        } else {
            adminLoginBtn.style.display = 'flex';
            adminLogoutBtn.style.display = 'none';
        }
    }
}

function showAdminNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `admin-notification admin-notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// ADD PRODUCT
// ============================================
function showAddProductModal() {
    if (!isAdminLoggedIn) {
        showAdminNotification('يجب تسجيل الدخول أولاً', 'error');
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
                        <input type="text" id="productName" class="admin-input" placeholder="مثال: فستان سهرة فاخر">
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
                        <label><i class="fas fa-money-bill"></i> السعر الحالي (د.ع)</label>
                        <input type="number" id="productPrice" class="admin-input" placeholder="149900">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-money-bill-wave"></i> السعر القديم (اختياري)</label>
                        <input type="number" id="productOldPrice" class="admin-input" placeholder="250000">
                    </div>
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-image"></i> رابط الصورة</label>
                    <input type="url" id="productImage" class="admin-input" placeholder="https://images.unsplash.com/photo-...">
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-align-right"></i> الوصف</label>
                    <textarea id="productDescription" class="admin-input" rows="3" placeholder="وصف تفصيلي للمنتج..."></textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-star"></i> التصنيف</label>
                        <select id="productBadge" class="admin-input">
                            <option value="">بدون تصنيف</option>
                            <option value="sale">تخفيض</option>
                            <option value="new">جديد</option>
                            <option value="hot">مميز</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-filter"></i> الفلتر</label>
                        <select id="productFilter" class="admin-input">
                            ${filters.map(f => `<option value="${f.id}">${f.name}</option>`).join('')}
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-star-half-alt"></i> التقييم (1-5)</label>
                        <input type="number" id="productRating" class="admin-input" min="1" max="5" step="0.1" value="4.5">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-comments"></i> عدد المراجعات</label>
                        <input type="number" id="productReviews" class="admin-input" value="0">
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
    const badge = document.getElementById('productBadge').value;
    const filter = document.getElementById('productFilter').value;
    const rating = parseFloat(document.getElementById('productRating').value);
    const reviews = parseInt(document.getElementById('productReviews').value);

    if (!name || !price || !image || !description) {
        showAdminNotification('الرجاء ملء جميع الحقول المطلوبة', 'error');
        return;
    }

    try {
        // توليد ID جديد
        const newProductId = Date.now();
        
        // حساب الخصم
        let discount = null;
        if (oldPrice && oldPrice > price) {
            const discountPercent = Math.round(((oldPrice - price) / oldPrice) * 100);
            discount = `-${discountPercent}%`;
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
            filter,
            rating,
            reviews,
            discount
        };

        // إضافة المنتج إلى Firebase
        await database.ref(`products/${category}/${newProductId}`).set(newProduct);
        
        showAdminNotification('تم إضافة المنتج بنجاح!', 'success');
        closeModal(document.querySelector('.admin-modal-close'));
        
        // إعادة تحميل البيانات
        await loadDataFromFirebase();
        loadProducts();
    } catch (error) {
        console.error('خطأ في حفظ المنتج:', error);
        showAdminNotification('حدث خطأ أثناء حفظ المنتج', 'error');
    }
}

// ============================================
// ADD CATEGORY
// ============================================
function showAddCategoryModal() {
    if (!isAdminLoggedIn) {
        showAdminNotification('يجب تسجيل الدخول أولاً', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'admin-modal-overlay';
    modal.innerHTML = `
        <div class="admin-modal">
            <div class="admin-modal-header">
                <h3><i class="fas fa-folder-plus"></i> إضافة قسم جديد</h3>
                <button class="admin-modal-close" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="admin-modal-body">
                <div class="form-group">
                    <label><i class="fas fa-tag"></i> اسم القسم</label>
                    <input type="text" id="categoryName" class="admin-input" placeholder="مثال: أحذية رياضية">
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-key"></i> المعرف (بالإنجليزية)</label>
                    <input type="text" id="categoryId" class="admin-input" placeholder="مثال: sport_shoes">
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-icons"></i> أيقونة Font Awesome</label>
                    <input type="text" id="categoryIcon" class="admin-input" placeholder="مثال: fa-running">
                    <small>ابحث عن الأيقونات في <a href="https://fontawesome.com/icons" target="_blank">Font Awesome</a></small>
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-palette"></i> اللون</label>
                    <input type="color" id="categoryColor" class="admin-input" value="#ff6b9d">
                </div>
                
                <button class="admin-btn-primary" onclick="saveCategory()">
                    <i class="fas fa-save"></i> حفظ القسم
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

async function saveCategory() {
    const name = document.getElementById('categoryName').value.trim();
    const id = document.getElementById('categoryId').value.trim();
    const icon = document.getElementById('categoryIcon').value.trim();
    const color = document.getElementById('categoryColor').value;

    if (!name || !id || !icon) {
        showAdminNotification('الرجاء ملء جميع الحقول', 'error');
        return;
    }

    try {
        const newCategory = { id, name, icon, color };
        
        await database.ref(`categories/${id}`).set(newCategory);
        await database.ref(`products/${id}`).set({});
        
        showAdminNotification('تم إضافة القسم بنجاح!', 'success');
        closeModal(document.querySelector('.admin-modal-close'));
        
        await loadDataFromFirebase();
        loadCategories();
    } catch (error) {
        console.error('خطأ في حفظ القسم:', error);
        showAdminNotification('حدث خطأ أثناء حفظ القسم', 'error');
    }
}

// ============================================
// ADD FILTER
// ============================================
function showAddFilterModal() {
    if (!isAdminLoggedIn) {
        showAdminNotification('يجب تسجيل الدخول أولاً', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'admin-modal-overlay';
    modal.innerHTML = `
        <div class="admin-modal">
            <div class="admin-modal-header">
                <h3><i class="fas fa-filter"></i> إضافة فلتر جديد</h3>
                <button class="admin-modal-close" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="admin-modal-body">
                <div class="form-group">
                    <label><i class="fas fa-tag"></i> اسم الفلتر</label>
                    <input type="text" id="filterName" class="admin-input" placeholder="مثال: عروض خاصة">
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-key"></i> المعرف (بالإنجليزية)</label>
                    <input type="text" id="filterId" class="admin-input" placeholder="مثال: special_offers">
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-icons"></i> أيقونة Font Awesome</label>
                    <input type="text" id="filterIcon" class="admin-input" placeholder="مثال: fa-percent">
                </div>
                
                <button class="admin-btn-primary" onclick="saveFilter()">
                    <i class="fas fa-save"></i> حفظ الفلتر
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

async function saveFilter() {
    const name = document.getElementById('filterName').value.trim();
    const id = document.getElementById('filterId').value.trim();
    const icon = document.getElementById('filterIcon').value.trim();

    if (!name || !id || !icon) {
        showAdminNotification('الرجاء ملء جميع الحقول', 'error');
        return;
    }

    try {
        const newFilter = { id, name, icon };
        
        await database.ref(`filters/${id}`).set(newFilter);
        
        showAdminNotification('تم إضافة الفلتر بنجاح!', 'success');
        closeModal(document.querySelector('.admin-modal-close'));
        
        await loadDataFromFirebase();
        loadFilters();
    } catch (error) {
        console.error('خطأ في حفظ الفلتر:', error);
        showAdminNotification('حدث خطأ أثناء حفظ الفلتر', 'error');
    }
}

// ============================================
// ADD SCROLLING AD
// ============================================
function showAddScrollingAdModal() {
    if (!isAdminLoggedIn) {
        showAdminNotification('يجب تسجيل الدخول أولاً', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'admin-modal-overlay';
    modal.innerHTML = `
        <div class="admin-modal">
            <div class="admin-modal-header">
                <h3><i class="fas fa-ad"></i> إضافة إعلان متحرك</h3>
                <button class="admin-modal-close" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="admin-modal-body">
                <div class="form-group">
                    <label><i class="fas fa-align-right"></i> نص الإعلان</label>
                    <input type="text" id="scrollingAdText" class="admin-input" placeholder="مثال: 🔥 خصم خاص 50% على جميع المنتجات!">
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-link"></i> رابط الإعلان</label>
                    <input type="text" id="scrollingAdLink" class="admin-input" placeholder="مثال: #category-women" value="#">
                </div>
                
                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="scrollingAdActive" checked>
                        <span>تفعيل الإعلان</span>
                    </label>
                </div>
                
                <button class="admin-btn-primary" onclick="saveScrollingAd()">
                    <i class="fas fa-save"></i> حفظ الإعلان
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

async function saveScrollingAd() {
    const text = document.getElementById('scrollingAdText').value.trim();
    const link = document.getElementById('scrollingAdLink').value.trim();
    const active = document.getElementById('scrollingAdActive').checked;

    if (!text) {
        showAdminNotification('الرجاء إدخال نص الإعلان', 'error');
        return;
    }

    try {
        const newAdId = Date.now();
        const newAd = { id: newAdId, text, link, active };
        
        await database.ref(`scrollingAds/${newAdId}`).set(newAd);
        
        showAdminNotification('تم إضافة الإعلان بنجاح!', 'success');
        closeModal(document.querySelector('.admin-modal-close'));
        
        await loadDataFromFirebase();
        updateScrollingAds();
    } catch (error) {
        console.error('خطأ في حفظ الإعلان:', error);
        showAdminNotification('حدث خطأ أثناء حفظ الإعلان', 'error');
    }
}

// ============================================
// ADD POPUP AD
// ============================================
function showAddPopupAdModal() {
    if (!isAdminLoggedIn) {
        showAdminNotification('يجب تسجيل الدخول أولاً', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'admin-modal-overlay';
    modal.innerHTML = `
        <div class="admin-modal admin-modal-large">
            <div class="admin-modal-header">
                <h3><i class="fas fa-window-maximize"></i> إضافة إعلان منبثق</h3>
                <button class="admin-modal-close" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="admin-modal-body">
                <div class="form-group">
                    <label><i class="fas fa-heading"></i> عنوان الإعلان</label>
                    <input type="text" id="popupAdTitle" class="admin-input" placeholder="مثال: فستان سهرة فاخر">
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-align-right"></i> الوصف</label>
                    <textarea id="popupAdDescription" class="admin-input" rows="2" placeholder="وصف مختصر للإعلان"></textarea>
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-image"></i> رابط الصورة</label>
                    <input type="url" id="popupAdImage" class="admin-input" placeholder="https://images.unsplash.com/photo-...">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-money-bill"></i> السعر الجديد (د.ع)</label>
                        <input type="number" id="popupAdNewPrice" class="admin-input" placeholder="149900">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-money-bill-wave"></i> السعر القديم (د.ع)</label>
                        <input type="number" id="popupAdOldPrice" class="admin-input" placeholder="250000">
                    </div>
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-tag"></i> الشارة</label>
                    <input type="text" id="popupAdBadge" class="admin-input" placeholder="🔥 عرض خاص" value="🔥 عرض خاص">
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-hashtag"></i> معرف المنتج (اختياري)</label>
                    <input type="number" id="popupAdProductId" class="admin-input" placeholder="1">
                </div>
                
                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="popupAdActive" checked>
                        <span>تفعيل الإعلان</span>
                    </label>
                </div>
                
                <button class="admin-btn-primary" onclick="savePopupAd()">
                    <i class="fas fa-save"></i> حفظ الإعلان
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

async function savePopupAd() {
    const title = document.getElementById('popupAdTitle').value.trim();
    const description = document.getElementById('popupAdDescription').value.trim();
    const image = document.getElementById('popupAdImage').value.trim();
    const newPrice = parseInt(document.getElementById('popupAdNewPrice').value);
    const oldPrice = parseInt(document.getElementById('popupAdOldPrice').value);
    const badge = document.getElementById('popupAdBadge').value.trim();
    const productId = document.getElementById('popupAdProductId').value ? parseInt(document.getElementById('popupAdProductId').value) : null;
    const active = document.getElementById('popupAdActive').checked;

    if (!title || !description || !image || !newPrice || !oldPrice) {
        showAdminNotification('الرجاء ملء جميع الحقول المطلوبة', 'error');
        return;
    }

    try {
        const newAdId = Date.now();
        const newAd = {
            id: newAdId,
            title,
            description,
            image,
            newPrice,
            oldPrice,
            badge,
            productId,
            active
        };
        
        await database.ref(`popupAds/${newAdId}`).set(newAd);
        
        showAdminNotification('تم إضافة الإعلان المنبثق بنجاح!', 'success');
        closeModal(document.querySelector('.admin-modal-close'));
        
        await loadDataFromFirebase();
    } catch (error) {
        console.error('خطأ في حفظ الإعلان المنبثق:', error);
        showAdminNotification('حدث خطأ أثناء حفظ الإعلان المنبثق', 'error');
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function closeModal(btn) {
    const modal = btn.closest('.admin-modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// ============================================
// SCROLLING ADS UPDATE
// ============================================
function updateScrollingAds() {
    const topAd = document.querySelector('.top-ad');
    if (!topAd) return;

    const activeAds = scrollingAds.filter(ad => ad.active);
    if (activeAds.length === 0) {
        topAd.style.display = 'none';
        return;
    }

    topAd.style.display = 'block';
    const adText = topAd.querySelector('.top-ad-text');
    
    if (activeAds.length === 1) {
        adText.innerHTML = `<a href="${activeAds[0].link}">${activeAds[0].text}</a>`;
    } else {
        let adsHTML = '';
        activeAds.forEach(ad => {
            adsHTML += `<a href="${ad.link}">${ad.text}</a><span class="ad-separator">•</span>`;
        });
        // تكرار الإعلانات لضمان التمرير المستمر
        adText.innerHTML = adsHTML + adsHTML;
    }
}

// ============================================
// CATEGORIES AND FILTERS LOADING
// ============================================
function loadCategories() {
    const categoryBtns = document.querySelector('.category-btns');
    if (!categoryBtns) return;

    let html = '<button class="category-btn active" data-category="all"><i class="fas fa-th"></i> الكل</button>';
    categories.forEach(cat => {
        html += `<button class="category-btn" data-category="${cat.id}">
            <i class="fas ${cat.icon}"></i> ${cat.name}
        </button>`;
    });
    
    categoryBtns.innerHTML = html;
    initializeCategoryButtons();
}

function loadFilters() {
    const filterBtns = document.querySelector('.filter-btns');
    if (!filterBtns) return;

    let html = '';
    filters.forEach(filter => {
        html += `<button class="filter-btn ${filter.id === 'all' ? 'active' : ''}" data-filter="${filter.id}">
            <i class="fas ${filter.icon}"></i> ${filter.name}
        </button>`;
    });
    
    filterBtns.innerHTML = html;
    initializeFilterButtons();
}

// ============================================
// GLOBAL VARIABLES
// ============================================
let currentCategory = 'all';
let currentFilter = 'all';
let currentPage = 'homePage';
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedProduct = null;

// ============================================
// INITIALIZE APP
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    // إخفاء شاشة التحميل
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
    }, 3000);

    // تهيئة Firebase ورفع البيانات الأولية
    await initializeFirebaseData();
    
    // تحميل البيانات من Firebase
    await loadDataFromFirebase();

    // تحميل الأقسام والفلاتر
    loadCategories();
    loadFilters();
    
    // تحميل المنتجات
    loadProducts();
    
    // تحديث الإعلانات المتحركة
    updateScrollingAds();
    
    // عرض الإعلان المنبثق بعد 5 ثوان
    setTimeout(showPopupAd, 5000);
    
    // تهيئة واجهة المستخدم
    updateAdminUI();
    updateCartCount();
    updateWishlistCount();
    initializeEventListeners();
    initializeScrollToTop();
    initializePWA();
    
    // إضافة زر تسجيل دخول Admin في القائمة الجانبية
    addAdminButtonToSidebar();
});

function addAdminButtonToSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    if (!sidebar) return;

    const adminSection = document.createElement('div');
    adminSection.className = 'admin-sidebar-section';
    adminSection.innerHTML = `
        <div class="sidebar-divider"></div>
        <button class="sidebar-menu-item" id="adminLoginBtn" onclick="showAdminLogin()">
            <i class="fas fa-shield-alt"></i>
            <span>تسجيل دخول المدير</span>
        </button>
        <button class="sidebar-menu-item" id="adminLogoutBtn" onclick="logoutAdmin()" style="display: none;">
            <i class="fas fa-sign-out-alt"></i>
            <span>تسجيل خروج المدير</span>
        </button>
        <div class="admin-only" style="display: none;">
            <div class="sidebar-divider"></div>
            <div class="sidebar-section-title">
                <i class="fas fa-cog"></i> لوحة التحكم
            </div>
            <button class="sidebar-menu-item" onclick="showAddProductModal()">
                <i class="fas fa-plus-circle"></i>
                <span>إضافة منتج</span>
            </button>
            <button class="sidebar-menu-item" onclick="showAddCategoryModal()">
                <i class="fas fa-folder-plus"></i>
                <span>إضافة قسم</span>
            </button>
            <button class="sidebar-menu-item" onclick="showAddFilterModal()">
                <i class="fas fa-filter"></i>
                <span>إضافة فلتر</span>
            </button>
            <button class="sidebar-menu-item" onclick="showAddScrollingAdModal()">
                <i class="fas fa-ad"></i>
                <span>إضافة إعلان متحرك</span>
            </button>
            <button class="sidebar-menu-item" onclick="showAddPopupAdModal()">
                <i class="fas fa-window-maximize"></i>
                <span>إضافة إعلان منبثق</span>
            </button>
        </div>
    `;
    
    sidebar.appendChild(adminSection);
}

// ============================================
// LOAD PRODUCTS
// ============================================
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    let allProducts = [];
    
    // جمع جميع المنتجات
    Object.keys(productsDatabase).forEach(category => {
        if (Array.isArray(productsDatabase[category])) {
            allProducts = allProducts.concat(productsDatabase[category]);
        } else {
            // إذا كانت البيانات من Firebase (كائن)
            Object.values(productsDatabase[category]).forEach(product => {
                if (product && product.id) {
                    allProducts.push(product);
                }
            });
        }
    });

    // تصفية المنتجات حسب القسم
    let filteredProducts = currentCategory === 'all' 
        ? allProducts 
        : allProducts.filter(p => p.category === currentCategory);

    // تصفية حسب الفلتر
    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.filter === currentFilter);
    }

    // عرض المنتجات
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <p>لا توجد منتجات في هذا القسم</p>
            </div>
        `;
        return;
    }

    let html = '';
    filteredProducts.forEach(product => {
        const isInWishlist = wishlist.some(item => item.id === product.id);
        
        html += `
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
                        <span class="product-reviews">(${product.reviews} تقييم)</span>
                    </div>
                    <div class="product-price-container">
                        ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                        <span class="product-price">${formatPrice(product.price)}</span>
                    </div>
                    <button class="product-add-cart" onclick="addToCart(event, ${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        أضف إلى السلة
                    </button>
                </div>
            </div>
        `;
    });

    productsGrid.innerHTML = html;
}

// ============================================
// CATEGORY & FILTER BUTTONS
// ============================================
function initializeCategoryButtons() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            loadProducts();
        });
    });
}

function initializeFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            loadProducts();
        });
    });
}

// ============================================
// PRODUCT DETAILS
// ============================================
function showProductDetails(productId) {
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

    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    selectedProduct = product;
    const isInWishlist = wishlist.some(item => item.id === product.id);

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
                        
                        <div class="product-price-container">
                            ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                            <span class="product-price">${formatPrice(product.price)}</span>
                            ${product.discount ? `<span class="product-discount-badge">${product.discount}</span>` : ''}
                        </div>
                        
                        <div class="product-actions">
                            <button class="admin-btn-primary" onclick="addToCart(event, ${product.id}); closeModal(this);">
                                <i class="fas fa-shopping-cart"></i> أضف إلى السلة
                            </button>
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
}

// ============================================
// WISHLIST
// ============================================
function toggleWishlist(event, productId) {
    event.stopPropagation();
    
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

    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const index = wishlist.findIndex(item => item.id === productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showAdminNotification('تمت الإزالة من المفضلة', 'info');
    } else {
        wishlist.push(product);
        showAdminNotification('تمت الإضافة للمفضلة', 'success');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    loadProducts();
}

function updateWishlistCount() {
    const badge = document.getElementById('favoritesCount');
    if (badge) {
        badge.textContent = wishlist.length;
        badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

// ============================================
// CART
// ============================================
function addToCart(event, productId) {
    event.stopPropagation();
    
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

    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showAdminNotification('تمت الإضافة إلى السلة', 'success');
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
// HELPER FUNCTIONS
// ============================================
function formatPrice(price) {
    return new Intl.NumberFormat('ar-IQ', {
        style: 'currency',
        currency: 'IQD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price).replace('IQD', 'د.ع');
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}

// ============================================
// EVENT LISTENERS
// ============================================
function initializeEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (menuToggle) {
        menuToggle.addEventListener('click', openSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Page navigation
    document.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = btn.dataset.page + 'Page';
            showPage(pageId);
            closeSidebar();
        });
    });

    // Search
    const searchBtn = document.getElementById('topSearchBtn');
    const searchInput = document.getElementById('topSearchInput');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
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

function performSearch() {
    const searchTerm = document.getElementById('topSearchInput').value.trim().toLowerCase();
    if (!searchTerm) return;

    // تنفيذ البحث
    showAdminNotification(`البحث عن: ${searchTerm}`, 'info');
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
// SCROLL TO TOP
// ============================================
function initializeScrollToTop() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// POPUP AD
// ============================================
function showPopupAd() {
    const activePopupAds = popupAds.filter(ad => ad.active);
    if (activePopupAds.length === 0) return;

    // عرض أول إعلان نشط
    const ad = activePopupAds[0];
    const overlay = document.getElementById('popupAdOverlay');
    
    if (overlay) {
        // تحديث محتوى الإعلان
        overlay.querySelector('.popup-ad-badge').textContent = ad.badge;
        overlay.querySelector('.popup-ad-image').src = ad.image;
        overlay.querySelector('.popup-ad-title').textContent = ad.title;
        overlay.querySelector('.popup-ad-description').textContent = ad.description;
        overlay.querySelector('.popup-ad-old-price').textContent = formatPrice(ad.oldPrice);
        overlay.querySelector('.popup-ad-new-price').textContent = formatPrice(ad.newPrice);
        
        overlay.style.display = 'flex';
    }
}

function closePopupAd() {
    const overlay = document.getElementById('popupAdOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function goToAdProduct() {
    const activePopupAds = popupAds.filter(ad => ad.active);
    if (activePopupAds.length > 0 && activePopupAds[0].productId) {
        closePopupAd();
        showProductDetails(activePopupAds[0].productId);
    }
}

// ============================================
// PWA INSTALLATION
// ============================================
function initializePWA() {
    let deferredPrompt;
    const installBtn = document.getElementById('installBtn');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.style.display = 'flex';
    });

    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response: ${outcome}`);
            deferredPrompt = null;
            installBtn.style.display = 'none';
        }
    });

    window.addEventListener('appinstalled', () => {
        console.log('PWA installed successfully');
        installBtn.style.display = 'none';
    });

    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registered', reg))
            .catch(err => console.log('Service Worker registration failed', err));
    }
}
