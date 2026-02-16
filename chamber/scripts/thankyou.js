document.addEventListener('DOMContentLoaded', function () {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Format timestamp for display
    const timestamp = urlParams.get('timestamp');
    let formattedDate = 'Not provided';

    if (timestamp) {
        const date = new Date(timestamp);
        formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Get membership level display text
    const membershipLevel = urlParams.get('membership');
    let membershipText = 'Not provided';

    switch (membershipLevel) {
        case 'np':
            membershipText = 'NP Membership (Non-Profit)';
            break;
        case 'bronze':
            membershipText = 'Bronze Membership';
            break;
        case 'silver':
            membershipText = 'Silver Membership';
            break;
        case 'gold':
            membershipText = 'Gold Membership';
            break;
    }

    // Build summary HTML
    const summaryHTML = `
        <div class="summary-item">
            <strong>First Name:</strong> ${urlParams.get('firstname') || 'Not provided'}
        </div>
        <div class="summary-item">
            <strong>Last Name:</strong> ${urlParams.get('lastname') || 'Not provided'}
        </div>
        <div class="summary-item">
            <strong>Email:</strong> ${urlParams.get('email') || 'Not provided'}
        </div>
        <div class="summary-item">
            <strong>Phone:</strong> ${urlParams.get('phone') || 'Not provided'}
        </div>
        <div class="summary-item">
            <strong>Organization:</strong> ${urlParams.get('organization') || 'Not provided'}
        </div>
        <div class="summary-item">
            <strong>Membership Level:</strong> ${membershipText}
        </div>
        <div class="summary-item">
            <strong>Application Date:</strong> ${formattedDate}
        </div>
    `;

    document.getElementById('summaryGrid').innerHTML = summaryHTML;
});