document.addEventListener('DOMContentLoaded', () => {
    // Fetch company spotlights
    const jsonUrl = 'data/members.json';

    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Members loaded:', data); // For debugging

            // Filter for gold (membership: 3) and silver (membership: 2) members
            const qualifiedMembers = data.filter(member => member.membership === 2 || member.membership === 3);

            // Shuffle the array
            shuffleArray(qualifiedMembers);

            // Take first 2-3 members (randomly decide between 2 or 3)
            const numberOfSpotlights = Math.min(qualifiedMembers.length, Math.floor(Math.random() * 2) + 2);
            const selectedMembers = qualifiedMembers.slice(0, numberOfSpotlights);

            const spotlightContainer = document.getElementById('spotlights-container');

            // Clear loading message
            spotlightContainer.innerHTML = '';

            // Add each spotlight
            selectedMembers.forEach(member => {
                // Determine membership level text
                const membershipText = member.membership === 3 ? 'Gold Member' : 'Silver Member';
                const membershipClass = member.membership === 3 ? 'gold' : 'silver';

                spotlightContainer.innerHTML += `
                    <div class="spotlight-card ${membershipClass}">
                        <div class="spotlight-header">
                            <img src="images/${member.image}" alt="${member.name} logo" 
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="no-image" style="display:none;">🏢</div>
                            <h3>${member.name}</h3>
                        </div>
                        <div class="spotlight-content">
                            <p class="membership-badge ${membershipClass}">${membershipText}</p>
                            <p class="spotlight-address">${member.address}</p>
                            <p class="spotlight-phone">📞 ${member.phone}</p>
                            <p class="spotlight-website">
                                <a href="${member.website}" target="_blank" rel="noopener">
                                    ${member.website.replace('https://', '').replace('http://', '')}
                                </a>
                            </p>
                            ${member.description ? `<p class="spotlight-description">${member.description}</p>` : ''}
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error loading member spotlights:', error);
            document.getElementById('spotlights-container').innerHTML = `
                <p class="error">Unable to load member spotlights. Please try again later.</p>
            `;
        });

    // Shuffle function (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});