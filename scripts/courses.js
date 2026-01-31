const courses = [
    {
        subject: 'WOD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        description: 'Introduction to web development',
        completed: true
    },
    {
        subject: 'CSE',
        number: 110,
        title: 'Programming Building Blocks',
        credits: 3,
        description: 'Introduction to programming concepts',
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        description: 'Web development basics',
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 3,
        description: 'Dynamic web content creation',
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 3,
        description: 'Advanced programming concepts',
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 3,
        description: 'Object-oriented programming',
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 3,
        description: 'Advanced frontend techniques',
        completed: false
    },
    {
        subject: 'WDD',
        number: 330,
        title: 'Web Frontend Development II',
        credits: 3,
        description: 'Advanced web applications',
        completed: false
    },
    {
        subject: 'CSE',
        number: 310,
        title: 'Applied Programming',
        credits: 3,
        description: 'Real-world programming applications',
        completed: false
    }
];

function displayCourses(filter = 'all') {
    const container = document.getElementById('coursesContainer');
    const creditsElement = document.getElementById('totalCredits');

    let filteredCourses = courses;

    if (filter === 'wdd') {
        filteredCourses = courses.filter(course => course.subject === 'WDD');
    } else if (filter === 'cse') {
        filteredCourses = courses.filter(course => course.subject === 'CSE');
    }

    container.innerHTML = '';

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;

        courseCard.innerHTML = `
            <div class="course-code">${course.subject} ${course.number}</div>
            <div class="course-name">${course.title}</div>
            <div class="course-credits">${course.credits} credits</div>
            <div class="course-status">${course.completed ? '✓ Completed' : '○ In Progress'}</div>
        `;

        container.appendChild(courseCard);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditsElement.textContent = totalCredits;
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            displayCourses(filter);
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    displayCourses();
    setupFilterButtons();
});