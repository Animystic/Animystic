// script.js
function showForm() {
    document.getElementById('orderModal').style.display = 'block';
}

function hideForm() {
    document.getElementById('orderModal').style.display = 'none';
}

function submitForm(e) {
    e.preventDefault();
    
    // إرسال البيانات إلى الإيميل (يتطلب إعداد خدمة مثل EmailJS)
    // يمكنك استخدام EmailJS أو أي خدمة مشابهة هنا
    
    hideForm();
    showSuccess();
    resetForm();
}

function showSuccess() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    setTimeout(() => { modal.style.display = 'none' }, 3000);
}

function resetForm() {
    document.getElementById('orderForm').reset();
}

// إضافة تأثيرات عند التمرير
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        const position = card.getBoundingClientRect();
        if(position.top < window.innerHeight) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// لإغلاق النافذة عند النقر خارجها
window.onclick = function(e) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if(e.target == modal) {
            modal.style.display = 'none';
        }
    });
}
