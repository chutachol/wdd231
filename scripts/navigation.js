document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navigation.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                navigation.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
            
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            navigation.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});