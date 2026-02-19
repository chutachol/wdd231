// Ensure JavaScript runs only after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    /*** 🟢 HAMBURGER MENU FUNCTIONALITY 🟢 ***/
    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.querySelector(".navigation");

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", function () {
            navigation.classList.toggle("active"); // Toggle visibility
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
            const response = await fetch('data/projectmem.json'); // Fetch JSON data
            if (!response.ok) throw new Error("Failed to load featured members data");

            const members = await response.json();
            const featuredContainer = document.getElementById('Featured-cards');

            if (featuredContainer) {
                featuredContainer.innerHTML = ""; // Clear previous content

                members.forEach(member => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.dataset.member = JSON.stringify(member); // Store member data for modal

                    card.innerHTML = `
                        <img src="${member.image}" alt="${member.name}">
                        <h3>${member.name}</h3>
                        <p><strong>Role:</strong> ${member.role}</p>
                        <p><strong>Location:</strong> ${member.address}</p>
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                    `;

                    featuredContainer.appendChild(card);
                });

                // Add click event to each card to open modal
                document.querySelectorAll('.card').forEach(card => {
                    card.addEventListener('click', () => {
                        const member = JSON.parse(card.dataset.member);
                        createModal(member);
                    });
                });
            } else {
                console.error("Featured section not found.");
            }
        } catch (error) {
            console.error("Error loading featured members:", error);
        }
    }

    /*** 🟢 MODAL DIALOG FUNCTIONALITY 🟢 ***/
    function createModal(member) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p><strong>Role:</strong> ${member.role}</p>
                <p><strong>Location:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            </div>
        `;

        // Close modal when clicking the close button
        modal.querySelector('.close').addEventListener('click', () => {
            modal.remove();
        });

        // Close modal when clicking outside the modal
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.remove();
            }
        });

        document.body.appendChild(modal);
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

            if (!firstName || !lastName || !email || !phone) {
                alert("Please fill out all required fields.");
                return;
            }

            // Save form data to localStorage
            const formData = {
                firstName,
                lastName,
                email,
                phone,
                membership: document.getElementById('membership').value,
                bio: document.getElementById('bio').value.trim()
            };
            localStorage.setItem('joinFormData', JSON.stringify(formData));

            // Redirect to thank you page
            window.location.href = 'thankyou.html';
        });
    }

    // Load members if the Featured section exists
    if (document.getElementById('Featured-cards')) {
        loadFeaturedMembers();
    }
});