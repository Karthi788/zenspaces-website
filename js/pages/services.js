// // Initialize slider functionality
// const sliderContainer = document.querySelector('.services-slider-container');
// const prevButton = document.querySelector('.services-slider-nav.prev');
// const nextButton = document.querySelector('.services-slider-nav.next');
// const cards = document.querySelectorAll('.services-project-card');
// const tabsContainer = document.querySelector('.services-service-tabs');
// const tabs = document.querySelectorAll('.services-tab-btn');
// let currentIndex = 0;
// const categories = ['architecture', 'interior', 'management']; // Define category order

// function updateSliderPosition() {
//     const cardWidth = cards[0].offsetWidth + 32; // Including gap
//     sliderContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
// }

// function updateBackground() {
//     const activeBtn = tabsContainer.querySelector('.services-tab-btn.active');
//     const rect = activeBtn.getBoundingClientRect();
//     const containerRect = tabsContainer.getBoundingClientRect();
    
//     // Calculate width and position relative to container
//     const width = activeBtn.offsetWidth;
//     const left = activeBtn.offsetLeft;
    
//     tabsContainer.style.setProperty('--bg-width', `${width}px`);
//     tabsContainer.style.setProperty('--bg-left', `${left}px`);
// }

// function showCategory(category) {
//     // First, fade out all cards
//     cards.forEach(card => {
//         card.style.animation = 'fadeOut 0.3s ease forwards';
//     });

//     // Wait for fade out animation to complete
//     setTimeout(() => {
//         // Update tabs container state
//         tabsContainer.dataset.active = category;
        
//         // Update cards visibility
//         cards.forEach(card => {
//             card.style.animation = ''; // Reset animation
//             card.classList.remove('active');
//             if (card.dataset.category === category) {
//                 card.classList.add('active');
//                 card.style.animation = 'fadeIn 0.5s ease forwards';
//             }
//         });
        
//         // Reset slider position
//         currentIndex = 0;
//         updateSliderPosition();
//         updateBackground();
//     }, 300); // Match this timing with fadeOut duration
// }

// function updateActiveTab(category) {
//     tabs.forEach(tab => {
//         tab.classList.toggle('active', tab.dataset.tab === category);
//     });
//     tabsContainer.dataset.active = category;
//     updateBackground();
// }

// function getCurrentCategoryIndex() {
//     return categories.indexOf(tabsContainer.dataset.active);
// }

// nextButton.addEventListener('click', () => {
//     const activeCards = document.querySelectorAll('.services-project-card.active');
//     const visibleCards = 3;
//     const maxIndex = Math.ceil(activeCards.length / visibleCards) - 1;
    
//     if (currentIndex < maxIndex) {
//         // Move slider within current category
//         currentIndex++;
//         updateSliderPosition();
//     } else {
//         // Switch to next category
//         const currentCatIndex = getCurrentCategoryIndex();
//         if (currentCatIndex < categories.length - 1) {
//             const nextCategory = categories[currentCatIndex + 1];
//             showCategory(nextCategory);
//             updateActiveTab(nextCategory);
//         }
//     }
// });

// prevButton.addEventListener('click', () => {
//     if (currentIndex > 0) {
//         // Move slider within current category
//         currentIndex--;
//         updateSliderPosition();
//     } else {
//         // Switch to previous category
//         const currentCatIndex = getCurrentCategoryIndex();
//         if (currentCatIndex > 0) {
//             const prevCategory = categories[currentCatIndex - 1];
//             showCategory(prevCategory);
//             updateActiveTab(prevCategory);
//         }
//     }
// });

// // Tab functionality
// tabs.forEach(tab => {
//     tab.addEventListener('click', () => {
//         const category = tab.dataset.tab;
//         updateActiveTab(category);
//         showCategory(category);
//     });
// });

// // Initial setup and event listeners
// window.addEventListener('resize', () => {
//     updateSliderPosition();
//     updateBackground(); // Update background on resize
// });

// // Set initial state
// showCategory('architecture');
// updateActiveTab('architecture');
// updateBackground();