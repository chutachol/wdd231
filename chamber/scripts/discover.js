import { discoverItems } from '../data/discover.mjs';

document.addEventListener('DOMContentLoaded', function () {
    // Load and display discover items
    displayDiscoverItems();

    // Handle visit message with localStorage
    displayVisitMessage();
});

function displayDiscoverItems() {
    const grid = document.getElementById('discoverGrid');
    grid.innerHTML = '';

    discoverItems.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'discover-card';
        card.setAttribute('data-index', index);

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure class="card-image">
                <img src="images/${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
            </figure>
            <address>${item.address}</address>
            <p class="card-description">${item.description}</p>
            <p class="card-category">${item.category}</p>
            <button class="learn-more-btn">Learn More</button>
        `;

        grid.appendChild(card);
    });
}

function displayVisitMessage() {
    const messageDiv = document.getElementById('visitMessage');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now();

    if (!lastVisit) {
        // First visit
        messageDiv.textContent = 'Welcome! Let us know if you have any questions.';
        messageDiv.className = 'visit-message first-visit';
    } else {
        const daysBetween = calculateDaysBetween(parseInt(lastVisit), currentVisit);

        if (daysBetween < 1) {
            messageDiv.textContent = 'Back so soon! Awesome!';
            messageDiv.className = 'visit-message soon-back';
        } else {
            const dayText = daysBetween === 1 ? 'day' : 'days';
            messageDiv.textContent = `You last visited ${daysBetween} ${dayText} ago.`;
            messageDiv.className = 'visit-message normal-visit';
        }
    }

    // Store current visit
    localStorage.setItem('lastVisit', currentVisit.toString());
}

function calculateDaysBetween(lastVisit, currentVisit) {
    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
    const difference = currentVisit - lastVisit;
    return Math.floor(difference / oneDay);
}