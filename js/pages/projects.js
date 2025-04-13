document.addEventListener('DOMContentLoaded', function() {
    const projects = [
        {
            id: 1,
            title: "Project",
            number: "01",
            image: "/assets/images/projects/project-1.png",
            description: "Relax in a stylish living space featuring a stunning waterfall view on a sleek TV wall unit"
        },
        {
            id: 2,
            title: "Project",
            number: "02",
            image: "/assets/images/projects/project-2.png",
            description: "Brighten your cooking experience with a vibrant orange kitchen featuring stylish storage and modern design"
        },
        {
            id: 3,
            title: "Project",
            number: "03",
            image: "/assets/images/projects/project-3.png",
            description: "Welcome to a warm and inviting entryway blending rustic brick with artistic floor detailing"
        },
        {
            id: 4,
            title: "Project",
            number: "04",
            image: "/assets/images/projects/project-4.png",
            description: "Elegant and eco-friendly design meets contemporary architecture with lush rooftop greenery"
        },
        {
            id: 5,
            title: "Project",
            number: "05",
            image: "/assets/images/projects/project-5.jpg",
            description: "Step into a modern culinary haven with sleek green cabinets and smart storage solutionsUrban renewal project with community-focused design"
        }
    ];

    const sliderTrack = document.getElementById('sliderTrack');
    const sliderDots = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;
    let isAnimating = false;

    // Dynamically determine visible projects based on screen width
    
    function getVisibleProjects() {
        if (window.innerWidth <= 425) {
            return 1; // 1 slide for 425px and below
        } else if (window.innerWidth > 425 && window.innerWidth <= 768) {
            return 2; // 2 slides for 426px to 768px
        } else {
            return 3; // 3 slides for above 768px
        }
    }

    function getMaxIndex() {
        return projects.length - getVisibleProjects();
    }

    function createSlides() {
        sliderTrack.innerHTML = '';
        projects.forEach(project => {
            const slide = document.createElement('div');
            slide.className = 'projects-slide';
            slide.innerHTML = `
                <div class="projects-slide-header">
                    <h3 class="projects-slide-title">${project.title}</h3>
                    <span class="projects-slide-number">${project.number}</span>
                </div>
                <div class="projects-slide-image-container">
                    <img src="${project.image}" alt="Project ${project.number}" class="projects-slide-image">
                </div>
                <div class="projects-slide-description">
                    <p>${project.description}</p>
                </div>
            `;
            sliderTrack.appendChild(slide);
        });
        console.log('Slides created, forcing initial position...');
        currentIndex = 0; // Force reset after creating slides
        updateSliderPosition();
    }

    function createDots() {
        sliderDots.innerHTML = '';
        projects.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'projects-slider-dot';
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });
        updateActiveDots();
    }

    function updateSliderPosition() {
        const visibleProjects = getVisibleProjects();
        const translateX = -(currentIndex * (100 / visibleProjects));
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        console.log(`Update Position - Current Index: ${currentIndex}, TranslateX: ${translateX}%, Visible Projects: ${visibleProjects}, Max Index: ${getMaxIndex()}`);
    }

    function updateActiveDots() {
        const dots = document.querySelectorAll('.projects-slider-dot');
        const visibleProjects = getVisibleProjects();
        dots.forEach((dot, index) => {
            if (currentIndex <= index && index < currentIndex + visibleProjects) {
                dot.classList.add('projects-active');
            } else {
                dot.classList.remove('projects-active');
            }
        });
    }

    function nextSlide() {
        if (isAnimating || currentIndex >= getMaxIndex()) return;
        
        isAnimating = true;
        currentIndex = Math.min(currentIndex + 1, getMaxIndex());
        
        updateSliderPosition();
        updateActiveDots();
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function prevSlide() {
        if (isAnimating || currentIndex <= 0) return;
        
        isAnimating = true;
        currentIndex = Math.max(currentIndex - 1, 0);
        
        updateSliderPosition();
        updateActiveDots();
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function goToSlide(index) {
        if (isAnimating) return;
        
        isAnimating = true;
        currentIndex = Math.min(Math.max(0, index), getMaxIndex());
        
        updateSliderPosition();
        updateActiveDots();
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function initSlider() {
        console.log('Initializing slider...');
        createSlides();
        createDots();
        
        // Force initial position
        currentIndex = 0;
        updateSliderPosition();
        updateActiveDots();
        console.log('Initial position set, Current Index: 0');
        
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        window.addEventListener('resize', () => {
            console.log('Resize detected, resetting to first slide...');
            const newVisibleProjects = getVisibleProjects();
            currentIndex = 0; // Force reset to 0 on every resize in single-slide mode
            updateSliderPosition();
            updateActiveDots();
            console.log('After resize - Current Index: 0, Visible Projects: ' + newVisibleProjects);
        });
    }

    function addStylesheet() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/css/pages/projects.css';
        document.head.appendChild(link);
    }

    addStylesheet();
    initSlider();
});