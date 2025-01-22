// أسعار الصرف الحالية (سيتم تحديثها تلقائيًا)
let exchangeRates = {
    USD: 1,
    SAR: 3.75,
    EGP: 30.90,
    AED: 3.67,
    QAR: 3.64,
    KWD: 0.31,
    BHD: 0.38,
    OMR: 0.38,
    JOD: 0.71,
    LBP: 1507.5,
    LYD: 4.82,
    DZD: 134.45,
    MAD: 9.83,
    TND: 3.11,
    SDG: 56.5,
    YER: 250.3,
    SYP: 2512,
    IQD: 1459
};

// تحديث الأسعار حسب العملة
function updatePrices() {
    const currency = document.getElementById('currency').value;
    const rate = exchangeRates[currency] || 1;
    
    const originalUSD = 200;
    const discountedUSD = 20;
    
    const originalPrice = document.getElementById('originalPrice');
    const discountedPrice = document.getElementById('discountedPrice');
    
    if(currency === 'USD') {
        originalPrice.textContent = `${originalUSD}$`;
        discountedPrice.textContent = `${discountedUSD}$`;
    } else {
        originalPrice.textContent = `${Math.round(originalUSD * rate)} ${currency}`;
        discountedPrice.textContent = `${Math.round(discountedUSD * rate)} ${currency}`;
    }
    
    // إضافة تأثير التحديث
    originalPrice.classList.add('price-update');
    discountedPrice.classList.add('price-update');
    setTimeout(() => {
        originalPrice.classList.remove('price-update');
        discountedPrice.classList.remove('price-update');
    }, 500);
}

// تحديث أسعار الصرف من API خارجي
async function updateExchangeRates() {
    try {
        const response = await fetch('https://api.frankfurter.app/latest?from=USD');
        const data = await response.json();
        
        // تحديث الأسعار للعملات العربية فقط
        const arabCurrencies = ['SAR', 'EGP', 'AED', 'QAR', 'KWD', 'BHD', 
                              'OMR', 'JOD', 'LBP', 'LYD', 'DZD', 'MAD', 
                              'TND', 'SDG', 'YER', 'SYP', 'IQD'];
        
        arabCurrencies.forEach(currency => {
            if(data.rates[currency]) {
                exchangeRates[currency] = data.rates[currency];
            }
        });
        
    } catch (error) {
        console.log('تعذر تحديث الأسعار، سيتم استخدام القيم الافتراضية');
    }
}

// تحديث الأسعار عند تحميل الصفحة
window.addEventListener('load', updateExchangeRates);

// تهيئة EmailJS
emailjs.init('bUruSro_g_I5P9kRp');

// إدارة الفورم
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const loader = document.createElement('div');
    loader.className = 'form-loader';
    this.appendChild(loader);
    
    const formData = {
        name: this.name.value,
        phone: this.phone.value,
        email: this.email.value,
        country: this.country.value,
        currency: this.currency.value,
        delivery: this.delivery.value,
        notes: this.notes.value
    };

    emailjs.send('lanimysticl', 'design_library_order', formData)
        .then(() => {
            closeForm();
            showSuccessModal();
            this.reset();
        })
        .catch((error) => {
            alert('حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.');
        })
        .finally(() => {
            loader.remove();
        });
});

// إدارة النوافذ المنبثقة
function openForm() {
    document.getElementById('formModal').style.display = 'block';
}

function closeForm() {
    document.getElementById('formModal').style.display = 'none';
}

function showSuccessModal() {
    document.getElementById('successModal').style.display = 'block';
}

function closeSuccess() {
    document.getElementById('successModal').style.display = 'none';
}

// إغلاق النوافذ بالنقر خارجها
window.onclick = function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
}

// تأثيرات التمرير
window.addEventListener('scroll', () => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            el.classList.add('animate');
        }
    });
});

// === تحكم في عرض/إخفاء الفيديو ===
function toggleVideo() {
    const videoWrapper = document.querySelector('.video-wrapper');
    const videoTitle = document.querySelector('.video-title');
    
    // تبديل الكلاس active
    videoWrapper.classList.toggle('active');
    videoTitle.classList.toggle('active');
    
    // إعادة تحميل الفيديو إذا كان مغلقًا
    if(videoWrapper.classList.contains('active')) {
        const iframe = document.getElementById('libraryVideo');
        iframe.src = iframe.getAttribute('data-src'); // استخدام data-src بدل src
    }
}

// تهيئة الفيديو عند التحميل
window.addEventListener('load', () => {
    const iframe = document.getElementById('libraryVideo');
    iframe.setAttribute('data-src', iframe.src);
    iframe.removeAttribute('src'); // منع التحميل التلقائي
});

// تحديث وقت العداد من API خارجي
async function getServerTime() {
      const response = await fetch('https://worldtimeapi.org/api/ip');
      const data = await response.json();
      return data.unixtime * 1000; // تحويل إلى ميلي ثانية
}

// عدّاد تنازلي ذكي مع حفظ الحالة
function initializeCountdown() {
    const STORAGE_KEY = 'countdownEnd';
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000; // 7 أيام بالميلي ثانية

    // التحقق من وجود وقت انتهاء مخزن
    let countDownDate = localStorage.getItem(STORAGE_KEY);

    if (!countDownDate || Date.now() > countDownDate) {
        // إنشاء وقت انتهاء جديد إذا لم يوجد أو انتهى
        countDownDate = Date.now() + SEVEN_DAYS;
        localStorage.setItem(STORAGE_KEY, countDownDate);
    } else {
        countDownDate = parseInt(countDownDate);
    }

    // تحديث العداد كل ثانية
    const timer = setInterval(() => {
        const now = Date.now();
        const distance = countDownDate - now;

        if (distance < 0) {
            // إعادة التعيين التلقائي بعد 7 أيام
            countDownDate = Date.now() + SEVEN_DAYS;
            localStorage.setItem(STORAGE_KEY, countDownDate);
            updateTimerDisplay(SEVEN_DAYS); // إعادة تعيين العرض فورًا
            return;
        }

        updateTimerDisplay(distance);
    }, 1000);
}

// تحديث واجهة المستخدم
function updateTimerDisplay(distance) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// بدء العد التنازلي عند تحميل الصفحة
window.addEventListener('load', initializeCountdown);
