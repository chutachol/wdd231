document.addEventListener('DOMContentLoaded', function () {
    // Set timestamp
    document.getElementById('timestamp').value = new Date().toISOString();

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const viewBtns = document.querySelectorAll('.view-benefits-btn');
    const closeBtns = document.querySelectorAll('.close-modal');

    // Open modal when button clicked
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    // Close modal when X clicked
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Animation for membership cards on page load
    const cards = document.querySelectorAll('.membership-card');
    cards.forEach((card, index) => {
        card.style.animation = `slideIn 0.5s ease forwards ${index * 0.1}s`;
    });
});