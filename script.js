const button = document.getElementById('runaway');

// Button properties
let posX = Math.random() * (window.innerWidth - button.offsetWidth);
let posY = Math.random() * (window.innerHeight - button.offsetHeight);
let targetX = posX;
let targetY = posY;

// Walking legs animation
let legStep = 0;

// Place button initially
button.style.left = `${posX}px`;
button.style.top = `${posY}px`;

// Set button color based on background brightness
function setButtonColor() {
  const bg = window.getComputedStyle(document.body).backgroundColor;
  const rgb = bg.match(/\d+/g).map(Number);
  const brightness = (rgb[0]*299 + rgb[1]*587 + rgb[2]*114)/1000;
  if(brightness > 128){
    button.style.backgroundColor = 'black';
    button.style.color = 'white';
  } else {
    button.style.backgroundColor = 'white';
    button.style.color = 'black';
  }
}
setButtonColor();
window.addEventListener('resize', setButtonColor);

// Update target position when cursor is near
document.addEventListener('mousemove', e => {
  const rect = button.getBoundingClientRect();
  const bx = rect.left + rect.width/2;
  const by = rect.top + rect.height/2;
  const dx = e.clientX - bx;
  const dy = e.clientY - by;
  const distance = Math.sqrt(dx*dx + dy*dy);

  if(distance < 200){
    button.classList.add('legs');
    // pick a target position away from cursor with random offset
    targetX = rect.left - dx + (Math.random()*100-50);
    targetY = rect.top - dy + (Math.random()*100-50);

    // keep inside viewport
    targetX = Math.max(0, Math.min(window.innerWidth - rect.width, targetX));
    targetY = Math.max(0, Math.min(window.innerHeight - rect.height, targetY));
  } else {
    button.classList.remove('legs');
  }
});

// Smooth animation loop
function animateButton() {
  const speed = 8; // pixels per frame
  const dx = targetX - posX;
  const dy = targetY - posY;
  const dist = Math.sqrt(dx*dx + dy*dy);

  if(dist > 1){
    posX += dx/dist * speed;
    posY += dy/dist * speed;
    button.style.left = `${posX}px`;
    button.style.top = `${posY}px`;
  }

  // cycle legs animation
  legStep += 0.2;
  if(button.classList.contains('legs')){
    button.style.transform = `translateY(${Math.sin(legStep)*2}px)`;
  } else {
    button.style.transform = `translateY(0px)`;
  }

  requestAnimationFrame(animateButton);
}

animateButton();
