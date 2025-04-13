const container = document.getElementById('circleContainer');
const positionClasses = ['pos1', 'pos2', 'pos3', 'pos4', 'pos5'];
let isAnimating = false;

function rotateCircles() {
if (isAnimating) return;
isAnimating = true;

setTimeout(() => {
  container.style.transition = 'none';
  container.style.transform = 'translateY(0)';

  const circles = Array.from(container.querySelectorAll('.circle:not(.zen-space)'));
  const lastCircle = circles[circles.length - 1];

  if (lastCircle) {
    lastCircle.remove();
    const clone = lastCircle.cloneNode(true);
    container.prepend(clone);
  }

  const updatedCircles = Array.from(container.querySelectorAll('.circle:not(.zen-space)'));
  updatedCircles.forEach((circle, index) => {
    positionClasses.forEach(pos => circle.classList.remove(pos, 'center'));
    if (index < positionClasses.length) {
      circle.classList.add(positionClasses[index]);
    }
    if (positionClasses[index] === 'pos3') {
      circle.classList.add('center');
    }
  });

  void container.offsetWidth;
  container.style.transition = 'transform 0.6s ease-in-out';
  isAnimating = false;
}, 600);
}

setInterval(rotateCircles, 3000);