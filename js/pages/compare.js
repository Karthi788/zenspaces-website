document.addEventListener('DOMContentLoaded', function() {
    // Image sets - each set contains a before and after image with titles
    const imageSets = [
        {
            before: '/assets/images/compare/render-1.png',
            after: '/assets/images/compare/reality-1.png',
            beforeAlt: 'Desert landscape',
            afterAlt: 'Snow mountain landscape',
            beforeTitle: 'Render',
            afterTitle: 'Reality'
        },
        {
            before: '/assets/images/compare/render-2.png',
            after: '/assets/images/compare/reality-2.jpg',
            beforeAlt: 'Old city view',
            afterAlt: 'Modern city view',
            beforeTitle: 'Render',
            afterTitle: 'Reality'
        },
        {
            before: '/assets/images/compare/render-3.png',
            after: '/assets/images/compare/reality-3.png',
            beforeAlt: 'Old city view',
            afterAlt: 'Modern city view',
            beforeTitle: 'Render',
            afterTitle: 'Reality'
        }
    ];
    
    const slider = document.getElementById('slider');
    const beforeImage = document.getElementById('before-image');
    const afterImage = document.getElementById('after-image');
    const beforeTitle = document.getElementById('before-title');
    const afterTitle = document.getElementById('after-title');
    const container = document.querySelector('.compare-comparison-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const paginationContainer = document.getElementById('pagination');
    const preloader = document.getElementById('preloader');
    
    let currentIndex = 0;
    let isDragging = false;
    let imagesLoaded = 0;
    let totalImagesToLoad = 2; // Initial set (before and after)
    
    // Function to handle image loading
    function handleImageLoad() {
        imagesLoaded++;
        if (imagesLoaded >= totalImagesToLoad) {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 300);
        }
    }
    
    // Initialize pagination dots
    function createPaginationDots() {
        paginationContainer.innerHTML = '';
        for (let i = 0; i < imageSets.length; i++) {
            const dot = document.createElement('div');
            dot.className = `compare-pagination-dot ${i === currentIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                if (i !== currentIndex) {
                    currentIndex = i;
                    updateImages();
                }
            });
            paginationContainer.appendChild(dot);
        }
    }
    
    // Update images based on current index
    function updateImages() {
        preloader.classList.remove('hidden');
        imagesLoaded = 0;
        
        const currentSet = imageSets[currentIndex];
        
        beforeImage.onload = handleImageLoad;
        afterImage.onload = handleImageLoad;
        
        beforeImage.src = currentSet.before;
        beforeImage.alt = currentSet.beforeAlt;
        afterImage.src = currentSet.after;
        afterImage.alt = currentSet.afterAlt;
        
        beforeTitle.textContent = currentSet.beforeTitle;
        afterTitle.textContent = currentSet.afterTitle;
        
        const dots = document.querySelectorAll('.compare-pagination-dot');
        dots.forEach((dot, index) => {
            dot.className = `compare-pagination-dot ${index === currentIndex ? 'active' : ''}`;
        });
        
        updateSliderPosition(50);
    }
    
    // Update slider position and related elements
    function updateSliderPosition(percentage) {
        slider.style.left = `${percentage}%`;
        
        beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        
        if (percentage < 10) {
            beforeTitle.style.opacity = 0;
            beforeTitle.style.transform = 'translateX(-20px)';
        } else {
            beforeTitle.style.opacity = 1;
            beforeTitle.style.transform = 'translateX(0)';
        }
        
        if (percentage > 90) {
            afterTitle.style.opacity = 0;
            afterTitle.style.transform = 'translateX(20px)';
        } else {
            afterTitle.style.opacity = 1;
            afterTitle.style.transform = 'translateX(0)';
        }
    }
    
    beforeImage.onload = handleImageLoad;
    afterImage.onload = handleImageLoad;
    
    updateSliderPosition(50);
    createPaginationDots();
    updateImages();
    
    slider.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    slider.addEventListener('touchstart', startDrag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', endDrag);
    
    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = imageSets.length - 1;
        }
        updateImages();
    });
    
    nextButton.addEventListener('click', function() {
        if (currentIndex < imageSets.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateImages();
    });
    
    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        slider.style.transition = 'none';
        beforeImage.style.transition = 'none';
    }
    
    function endDrag() {
        isDragging = false;
        slider.style.transition = 'left 0.1s ease-out';
        beforeImage.style.transition = 'clip-path 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        let clientX;
        
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
        } else {
            clientX = e.clientX;
        }
        
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const offsetX = clientX - containerRect.left;
        
        let percentage = (offsetX / containerWidth) * 100;
        
        percentage = Math.max(0, Math.min(100, percentage));
        
        updateSliderPosition(percentage);
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = imageSets.length - 1;
            }
            updateImages();
        } else if (e.key === 'ArrowRight') {
            if (currentIndex < imageSets.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateImages();
        }
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    container.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            if (currentIndex < imageSets.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateImages();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = imageSets.length - 1;
            }
            updateImages();
        }
    }
});