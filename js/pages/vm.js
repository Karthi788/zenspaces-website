document.addEventListener('DOMContentLoaded', () => {
    const titles = document.querySelectorAll('.vm-title');
    const contents = document.querySelectorAll('.vm-content-section');
    const titleLinks = document.querySelectorAll('.vm-title-link');
    const vmImg = document.querySelector('#vm-img');

    function showSection(index) {
        index = ((index % titles.length) + titles.length) % titles.length;

        titles.forEach(t => t.classList.remove('vm-active'));
        contents.forEach(c => c.classList.remove('vm-active'));

        if (index >= 0 && index < titles.length) {
            titles[index].classList.add('vm-active');
            contents[index].classList.add('vm-active');
            currentSection = index;

            vmImg.style.opacity = '0';
            setTimeout(() => {
                if (index === 0) {
                    vmImg.src = '/assets/images/vm/vision.png';
                } else if (index === 1) {
                    vmImg.src = '/assets/images/vm/mision.png';
                }
                vmImg.style.opacity = '1';
            }, 250);
        }
    }

    const leftArrow = document.querySelector('.vm-left-arrow');
    const rightArrow = document.querySelector('.vm-right-arrow');
    let currentSection = 0;

    leftArrow.addEventListener('click', () => {
        showSection(currentSection - 1);
    });

    rightArrow.addEventListener('click', () => {
        showSection(currentSection + 1);
    });

    titleLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(index);
        });
    });

    showSection(0);
});