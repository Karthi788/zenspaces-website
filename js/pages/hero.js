document.addEventListener('DOMContentLoaded', () => {
    // === Hero Section ===
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    const heroSlidesContainer = document.querySelector('.hero-slides');
    let heroCurrentIndex = 0;
    const totalHeroSlides = heroSlides.length;

    function showHeroSlide(index, isWrapping = false) {
        heroCurrentIndex = (index % totalHeroSlides + totalHeroSlides) % totalHeroSlides;

        heroDots.forEach((dot, i) => {
            dot.classList.toggle('hero-active', i === heroCurrentIndex);
        });

        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('hero-active', i === heroCurrentIndex);
        });

        if (isWrapping) {
            const firstSlideClone = heroSlides[0].cloneNode(true);
            heroSlidesContainer.appendChild(firstSlideClone);
            heroSlidesContainer.style.transition = 'transform 1.2s cubic-bezier(0.42, 0, 0.58, 1)';
            heroSlidesContainer.style.transform = `translateX(-${totalHeroSlides * 100}%)`;
            setTimeout(() => {
                heroSlidesContainer.style.transition = 'none';
                heroSlidesContainer.style.transform = `translateX(0%)`;
                heroSlidesContainer.removeChild(firstSlideClone);
            }, 1200);
        } else {
            heroSlidesContainer.style.transition = 'transform 1.2s cubic-bezier(0.42, 0, 0.58, 1)';
            heroSlidesContainer.style.transform = `translateX(-${heroCurrentIndex * 100}%)`;
        }
    }

    heroDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            const isWrapping = (heroCurrentIndex === totalHeroSlides - 1 && index === 0);
            showHeroSlide(index, isWrapping);
        });
    });

    let autoSlideInterval = setInterval(() => {
        heroCurrentIndex++;
        const isWrapping = (heroCurrentIndex === totalHeroSlides);
        if (isWrapping) heroCurrentIndex = 0;
        showHeroSlide(heroCurrentIndex, isWrapping);
    }, 8000);

    // Initial Hero Setup
    showHeroSlide(heroCurrentIndex);

    // === Services Section ===
    const sliderContainer = document.querySelector('.services-slider-container');
    const prevButton = document.querySelector('.services-slider-nav.prev');
    const nextButton = document.querySelector('.services-slider-nav.next');
    const cards = document.querySelectorAll('.services-project-card');
    const tabsContainer = document.querySelector('.services-service-tabs');
    const tabs = document.querySelectorAll('.services-tab-btn');
    let servicesCurrentIndex = 0;
    const categories = ['architecture', 'interior', 'management'];

    function updateSliderPosition() {
        if (cards.length > 0) {
            const cardWidth = cards[0].offsetWidth + 32; // Including gap
            sliderContainer.style.transform = `translateX(-${servicesCurrentIndex * cardWidth}px)`;
        }
    }

    function updateBackground() {
        const activeBtn = tabsContainer.querySelector('.services-tab-btn.active');
        if (activeBtn) {
            const width = activeBtn.offsetWidth;
            const left = activeBtn.offsetLeft;
            tabsContainer.style.setProperty('--bg-width', `${width}px`);
            tabsContainer.style.setProperty('--bg-left', `${left}px`);
        }
    }

    function showCategory(category) {
        cards.forEach(card => {
            card.style.animation = 'fadeOut 0.3s ease forwards';
        });

        setTimeout(() => {
            tabsContainer.dataset.active = category;
            cards.forEach(card => {
                card.style.animation = '';
                card.classList.remove('active');
                if (card.dataset.category === category) {
                    card.classList.add('active');
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                }
            });
            servicesCurrentIndex = 0;
            updateSliderPosition();
            updateBackground();
        }, 300);
    }

    function updateActiveTab(category) {
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === category);
        });
        tabsContainer.dataset.active = category;
        updateBackground();
    }

    function getCurrentCategoryIndex() {
        return categories.indexOf(tabsContainer.dataset.active);
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const activeCards = document.querySelectorAll('.services-project-card.active');
            const visibleCards = window.innerWidth <= 768 ? (window.innerWidth <= 425 ? 1 : 2) : 3;
            const maxIndex = Math.ceil(activeCards.length / visibleCards) - 1;

            if (servicesCurrentIndex < maxIndex) {
                servicesCurrentIndex++;
                updateSliderPosition();
            } else {
                const currentCatIndex = getCurrentCategoryIndex();
                if (currentCatIndex < categories.length - 1) {
                    const nextCategory = categories[currentCatIndex + 1];
                    showCategory(nextCategory);
                    updateActiveTab(nextCategory);
                }
            }
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (servicesCurrentIndex > 0) {
                servicesCurrentIndex--;
                updateSliderPosition();
            } else {
                const currentCatIndex = getCurrentCategoryIndex();
                if (currentCatIndex > 0) {
                    const prevCategory = categories[currentCatIndex - 1];
                    showCategory(prevCategory);
                    updateActiveTab(prevCategory);
                }
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.tab;
            updateActiveTab(category);
            showCategory(category);
        });
    });

    // Shared Resize Handler
    window.addEventListener('resize', () => {
        updateSliderPosition();
        updateBackground();
    });

    // Initial Services Setup
    if (sliderContainer) {
        showCategory('architecture');
        updateActiveTab('architecture');
        updateBackground();
    }
});