// تفعيل AOS
AOS.init({
    duration: 1000, // مدة الحركة
    once: true // تفعيل الحركة مرة واحدة فقط
});

// تفعيل زر طلب الشراء
document.getElementById('buy-now').addEventListener('click', () => {
    document.getElementById('order-form').style.display = 'flex';
});

// زر الإغلاق للنافذة المنبثقة
document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('order-form').style.display = 'none';
});

// عند إرسال الفورم
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // جمع البيانات
    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        country: document.getElementById('country').value,
        currency: document.getElementById('currency').value,
        notes: document.getElementById('notes').value,
    };

    // إرسال البيانات بالبريد
    const email = "lanimysticl@gmail.com";
    window.location.href = `mailto:${email}?subject=طلب شراء مكتبة المصمم&body=${encodeURIComponent(
        JSON.stringify(data, null, 2)
    )}`;

    // رسالة تأكيد
    alert("تم استلام بياناتك بنجاح! سيتم التواصل معك قريبًا.");
    document.getElementById('order-form').style.display = 'none';
});
