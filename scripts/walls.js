let repoOwner = 'orxngc';
let repoName = 'walls';
let images = [];
let currentIndex = 0;

async function fetchImages() {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents`;
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';  // Clear current images

    try {
        const response = await fetch(apiUrl);
        const files = await response.json();

        images = files.filter(file => file.type === 'file' && file.name.match(/\.(jpg|jpeg|png|gif)$/i));

        const fragment = document.createDocumentFragment();

        images.forEach((file, index) => {
            const imgElement = document.createElement('div');
            imgElement.classList.add('gallery-item');
            imgElement.innerHTML = `<img src="${file.download_url}" alt="${file.name}" data-index="${index}" loading="lazy" />`;
            fragment.appendChild(imgElement);
        });

        gallery.appendChild(fragment);

        addImageClickListeners();
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function updateHeaderAndAside() {
    const repoLink = document.getElementById('repo-link');
    const repoInfo = document.getElementById('repo-info');

    if (repoName === 'walls') {
        repoLink.textContent = 'orxngc/walls';
        repoLink.href = 'https://github.com/orxngc/walls';
        repoInfo.innerHTML = `<p> Yoh! This is my repository of wallpapers which I've collected over the years. A <a href="https://github.com/orxngc/walls-catppuccin-mocha">catppuccin-mocha</a> version is available here. </p>
        <p> <br>
        Disclaimer: These wallpapers are sourced from many, many, many sources on the internet. I did not make any of these, although I have edited several of them a little bit. No credit really goes to me in that regard, I'm just the collector.
        
        <p> <br> Please <a href="https://github.com/orxngc/walls">star</a> the repository on Github if you like these.</p>`;
    } else {
        repoLink.textContent = 'orxngc/walls-catppuccin-mocha';
        repoLink.href = 'https://github.com/orxngc/walls-catppuccin-mocha';
        repoInfo.innerHTML = `Yoh! This is my repository of wallpapers which I've collected over the years. This is the catppuccin-mocha version; the normal repo is available <a href="https://github.com/orxngc/walls">here</a>.
        <br>
        Disclaimer: These wallpapers are sourced from many, many, many sources on the internet. I did not make any of these, although I have *edited* several of them a little bit and use lutgen to convert them from their normal versions in orxngc/walls to the catppuccin-mocha colour scheme. No credit really goes to me in that regard, I'm just the collector.
        
        Please <a href="https://github.com/orxngc/walls-catppuccin-mocha">star</a> the repository on Github if you like these.`;
    }
}

function addImageClickListeners() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(item => {
        item.addEventListener('click', openCarousel);
    });
}

function openCarousel(event) {
    currentIndex = parseInt(event.target.dataset.index);
    const carousel = document.getElementById('carousel');
    const carouselImage = document.getElementById('carousel-image');

    carouselImage.src = images[currentIndex].download_url;
    carousel.style.display = "block";
}

function closeCarousel() {
    document.getElementById('carousel').style.display = "none";
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById('carousel-image').src = images[currentIndex].download_url;
}

function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    document.getElementById('carousel-image').src = images[currentIndex].download_url;
}

document.querySelector('.close').addEventListener('click', closeCarousel);
document.querySelector('.next').addEventListener('click', showNextImage);
document.querySelector('.prev').addEventListener('click', showPreviousImage);
document.getElementById('repo-toggle').addEventListener('click', () => {
    repoName = repoName === 'walls' ? 'walls-catppuccin-mocha' : 'walls';
    fetchImages();
    updateHeaderAndAside();
    document.getElementById('repo-toggle').textContent = repoName === 'walls'
        ? 'Switch to catppuccin-mocha repository'
        : 'Switch to default repository';
});

// Close the carousel if clicked outside the image
window.addEventListener('click', function (event) {
    const carousel = document.getElementById('carousel');
    if (event.target === carousel) {
        closeCarousel();
    }
});

// Initial setup
fetchImages();
updateHeaderAndAside();
