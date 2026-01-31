document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded successfully');

    const currentYear = new Date().getFullYear();
    console.log(`Current year: ${currentYear}`);

    console.log(`Last modified: ${document.lastModified}`);

    const totalCourses = courses.length;
    const completedCourses = courses.filter(course => course.completed).length;
    console.log(`Courses: ${completedCourses} completed out of ${totalCourses}`);
});