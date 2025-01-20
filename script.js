// تفعيل AOS
AOS.init({
    duration: 1000,
    once: true,
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
    const formData = new FormData(document.getElementById('orderForm'));
    fetch('sendEmail.php', {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            if (response.ok) {
                alert('تم استلام بياناتك بنجاح! سيتم التواصل معك قريبًا.');
                document.getElementById('order-form').style.display = 'none';
            } else {
                alert('حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.');
            }
        })
        .catch(() => {
            alert('حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.');
        });
});
