document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("carousel-track");
    const speed = 0.5;
    let position = 0;
    let running = true;
  

    track.addEventListener("mouseover", () => {
      running = false;
    });
    track.addEventListener("mouseout", () => {
      running = true;
    });
  
    function step() {
      if (running) {
        position -= speed;
        track.style.transform = `translateX(${position}px)`;
  
        const first = track.children[0];
        const firstRect = first.getBoundingClientRect();
        const carouselRect = track.parentElement.getBoundingClientRect();
  
        if (firstRect.right < carouselRect.left) {
          const shift = first.offsetWidth + 60;
          track.appendChild(first);
          position += shift;
          track.style.transform = `translateX(${position}px)`;
        }
      }
  
      requestAnimationFrame(step);
    }
  
    requestAnimationFrame(step);
    
  });