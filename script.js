// تحسينات في إرسال الفورم
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        // ... بيانات الحقول السابقة
        delivery: this.delivery.value
    };

    emailjs.send('lanimysticl', 'design_library_order', formData)
        .then(() => {
            closeForm();
            showSuccessModal();
        }, (error) => {
            alert('حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.');
        });
});

// إضافة تأثيرات عند التمرير
window.addEventListener('scroll', () => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            el.classList.add('animate');
        }
    });
});

// تحسين تجربة المستخدم للأجهزة اللوحية
let isTouchDevice = 'ontouchstart' in window;
if(isTouchDevice) {
    document.body.classList.add('touch-device');
}
