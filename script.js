// script.js
function showForm() {
    document.getElementById('orderModal').style.display = 'block';
}

function hideForm() {
    document.getElementById('orderModal').style.display = 'none';
}

function submitForm(e) {
    e.preventDefault();

    // تهيئة EmailJS
(function() {
    emailjs.init("bUruSro_g_I5P9kRp"); // استبدل بمعرف المستخدم الخاص بك
})();

function submitForm(e) {
    e.preventDefault();
    
    const params = {
        name: document.querySelector('#orderForm input[type="text"]').value,
        phone: document.querySelector('#orderForm input[type="tel"]').value,
        email: document.querySelector('#orderForm input[type="email"]').value,
        country: document.querySelector('#orderForm input:nth-of-type(3)').value,
        currency: document.querySelector('#orderForm select').value,
        notes: document.querySelector('#orderForm textarea').value
    };

    emailjs.send("lanimysticl", "design_library_order", params) // استبدل بالمعرفات الخاصة بك
        .then(() => {
            hideForm();
            showSuccess();
            resetForm();
        }, (error) => {
            alert('حدث خطأ! يرجى المحاولة مرة أخرى.');
            console.log('FAILED...', error);
        });
}
    
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
