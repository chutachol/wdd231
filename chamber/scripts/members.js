document.addEventListener('DOMContentLoaded', function () {
    const membersContainer = document.getElementById('membersContainer');
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');

    let currentView = 'grid';
    let membersData = [];

    async function loadMembers() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            membersData = await response.json();
            displayMembers();
        } catch (error) {
            console.error('Error loading members:', error);
            membersContainer.innerHTML = '<p class="error">Unable to load member directory. Please try again later.</p>';
        }
    }

    function getMembershipLevel(membership) {
        switch (membership) {
            case 3:
                return { text: 'Gold Member', class: 'gold' };
            case 2:
                return { text: 'Silver Member', class: 'silver' };
            default:
                return { text: 'Member', class: 'member' };
        }
    }

    function displayMembers() {
        if (!membersData.length) {
            membersContainer.innerHTML = '<p class="loading">No members found.</p>';
            return;
        }

        membersContainer.className = `members-container ${currentView}`;
        membersContainer.innerHTML = '';

        membersData.forEach(member => {
            const membership = getMembershipLevel(member.membership);

            const memberCard = document.createElement('article');
            memberCard.className = `member-card ${membership.class}`;

            if (currentView === 'grid') {
                // For grid view: show image + all info
                memberCard.innerHTML = `
                    <div class="member-logo">
                        <img src="images/${member.image}" alt="${member.name} logo" width="120" height="120" loading="lazy">
                    </div>
                    <div class="member-info">
                        <h3>${member.name}</h3>
                        <div class="member-address">${member.address}</div>
                        <div class="member-phone">${member.phone}</div>
                        <div class="member-website">
                            <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace('https://', '')}</a>
                        </div>
                        <div class="member-level ${membership.class}">${membership.text}</div>
                    </div>
                `;
            } else {
                // For list view: no image, just text info
                memberCard.innerHTML = `
                    <div class="member-info">
                        <h3>${member.name}</h3>
                        <div class="member-address">${member.address}</div>
                        <div class="member-phone">${member.phone}</div>
                        <div class="member-website">
                            <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace('https://', '')}</a>
                        </div>
                        <div class="member-level ${membership.class}">${membership.text}</div>
                    </div>
                `;
            }

            membersContainer.appendChild(memberCard);
        });
    }

    function setupViewToggle() {
        if (gridViewBtn && listViewBtn) {
            gridViewBtn.addEventListener('click', function () {
                currentView = 'grid';
                gridViewBtn.classList.add('active');
                listViewBtn.classList.remove('active');
                displayMembers();
            });

            listViewBtn.addEventListener('click', function () {
                currentView = 'list';
                listViewBtn.classList.add('active');
                gridViewBtn.classList.remove('active');
                displayMembers();
            });
        }
    }

    loadMembers();
    setupViewToggle();
});