document.addEventListener('DOMContentLoaded', function () {
    const currentYearElement = document.getElementById('currentYear');
    const lastModifiedElement = document.getElementById('lastModified');

    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;

    lastModifiedElement.textContent = document.lastModified;
});