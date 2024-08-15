document.addEventListener('DOMContentLoaded', function () {
    const darkModeIcon = document.getElementById('dark-mode-icon');
    const lightModeIcon = document.getElementById('light-mode-icon');
    const body = document.body;
    var links = document.querySelectorAll("a");

    // Check system preference and set initial mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
        body.classList.add('dark-mode');
        darkModeIcon.style.display = 'block';
        lightModeIcon.style.display = 'none';
    } else {
        body.classList.add('light-mode');
        darkModeIcon.style.display = 'none';
        lightModeIcon.style.display = 'block';
    }

    document.getElementById('mocha-toggle').addEventListener('click', function (event) {
        event.preventDefault();
        if (body.classList.contains('dark-mode')) {
            // Switch to light mode
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            darkModeIcon.style.display = 'none';
            lightModeIcon.style.display = 'block';
            links.forEach(function (link) {
                link.style.color = "#f70";
            });
        } else {
            // Switch to dark mode
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            darkModeIcon.style.display = 'block';
            lightModeIcon.style.display = 'none';
            links.forEach(function (link) {
                link.style.color = "#fab387";
            });
        }
    });
});