// Ensure JavaScript runs only after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    /*** 🟢 HAMBURGER MENU FUNCTIONALITY 🟢 ***/
    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.querySelector(".navigation");

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", function () {
            const expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
            navigation.classList.toggle("active");
            this.setAttribute('aria-expanded', expanded);
            this.innerHTML = expanded ? '&#10006;' : '&#9776;'; // Change icon between hamburger and X
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!menuToggle.contains(event.target) && !navigation.contains(event.target)) {
                navigation.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '&#9776;';
            }
        });

        // Close menu when window is resized to desktop view
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                navigation.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '&#9776;';
            }
        });
    } else {
        console.error("Menu toggle button or navigation not found.");
    }

    /*** 🟢 FOOTER YEAR & LAST MODIFIED UPDATE 🟢 ***/
    const yearEl = document.getElementById("year");
    const lastModifiedEl = document.getElementById("last-modified");

    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;

    /*** 🟢 LOAD FEATURED MEMBERS FROM JSON 🟢 ***/
    async function loadFeaturedMembers() {
        try {
            // Use requestIdleCallback for non-critical tasks
            const loadMembers = async () => {
                const response = await fetch('data/projectmem.json');
                if (!response.ok) throw new Error("Failed to load featured members data");

                const members = await response.json();
                const featuredContainer = document.getElementById('Featured-cards');

                if (featuredContainer) {
                    featuredContainer.innerHTML = "";

                    members.forEach(member => {
                        const card = document.createElement('div');
                        card.className = 'card';
                        card.dataset.member = JSON.stringify(member);
                        card.setAttribute('role', 'button');
                        card.setAttribute('tabindex', '0');
                        card.setAttribute('aria-label', `View details for ${member.name}`);

                        card.innerHTML = `
                            <img src="${member.image}" alt="${member.name}" loading="lazy" width="280" height="220">
                            <h3>${member.name}</h3>
                            <p><strong>Role:</strong> ${member.role || member.Role}</p>
                            <p><strong>Location:</strong> ${member.address}</p>
                            <p><strong>Phone:</strong> ${member.phone}</p>
                            <p><a href="${member.website}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${member.name}'s website">Visit Website</a></p>
                        `;

                        featuredContainer.appendChild(card);
                    });

                    // Add click and keyboard events to each card
                    document.querySelectorAll('.card').forEach(card => {
                        card.addEventListener('click', () => {
                            const member = JSON.parse(card.dataset.member);
                            createModal(member);
                        });

                        card.addEventListener('keydown', (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                const member = JSON.parse(card.dataset.member);
                                createModal(member);
                            }
                        });
                    });
                }
            };

            // Use requestIdleCallback if available, otherwise use setTimeout
            if ('requestIdleCallback' in window) {
                requestIdleCallback(loadMembers, { timeout: 2000 });
            } else {
                setTimeout(loadMembers, 500);
            }
        } catch (error) {
            console.error("Error loading featured members:", error);
        }
    }

    /*** 🟢 MODAL DIALOG FUNCTIONALITY 🟢 ***/
    function createModal(member) {
        // Remove any existing modal
        const existingModal = document.querySelector('.modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'modal-title');

        modal.innerHTML = `
            <div class="modal-content">
                <button class="close" aria-label="Close modal">&times;</button>
                <img src="${member.image}" alt="${member.name}" width="450" height="250" loading="lazy">
                <h3 id="modal-title">${member.name}</h3>
                <p><strong>Role:</strong> ${member.role || member.Role}</p>
                <p><strong>Location:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${member.name}'s website">Visit Website</a></p>
            </div>
        `;

        // Close modal functionality
        const closeBtn = modal.querySelector('.close');

        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = ''; // Restore scrolling
        };

        closeBtn.addEventListener('click', closeModal);

        // Close when clicking outside
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Close with Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        // Prevent background scrolling
        document.body.style.overflow = 'hidden';

        document.body.appendChild(modal);

        // Focus the close button for accessibility
        closeBtn.focus();
    }

    /*** 🟢 FORM VALIDATION & LOCALSTORAGE 🟢 ***/
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Validate form fields
            const firstName = document.getElementById('first-name').value.trim();
            const lastName = document.getElementById('last-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const membership = document.getElementById('membership').value;

            if (!firstName || !lastName || !email || !phone) {
                alert("Please fill out all required fields.");
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Phone validation
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                alert("Please enter a valid 10-digit phone number.");
                return;
            }

            if (!membership) {
                alert("Please select a membership level.");
                return;
            }

            // Save form data to localStorage
            const formData = {
                firstName,
                lastName,
                email,
                phone,
                membership,
                bio: document.getElementById('bio').value.trim(),
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('joinFormData', JSON.stringify(formData));

            // Redirect to thank you page
            window.location.href = 'thankyou.html';
        });

        // Optional: Load saved data from localStorage
        const savedData = localStorage.getItem('joinFormData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                // Optionally pre-fill form with saved data
                // This is commented out to avoid auto-filling
                // You can enable if needed
            } catch (e) {
                console.error('Error parsing saved form data');
            }
        }
    }

    // Load members if the Featured section exists
    if (document.getElementById('Featured-cards')) {
        loadFeaturedMembers();
    }

    // Add active class to current navigation item based on URL
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation.split('/').pop()) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
});