// Initialize EmailJS
(function() {
    emailjs.init('bUruSro_g_I5P9kRp');
})();

// Form Handling
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.name.value,
        phone: this.phone.value,
        email: this.email.value,
        country: this.country.value,
        currency: this.currency.value,
        notes: this.notes.value
    };

    emailjs.send('lanimysticl', 'design_library_order', formData)
        .then(() => {
            closeForm();
            showSuccessModal();
        }, (error) => {
            alert('حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.');
        });
});

// Modal Functions
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

// Close modals when clicking outside
window.onclick = function(e) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Scroll Animations
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight * 0.8) {
            element.classList.add('animate-fade-in');
        }
    });
});
