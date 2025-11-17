const button = document.getElementById('runaway');

// Place button randomly initially
function placeButtonRandom() {
  const btnWidth = button.offsetWidth;
  const btnHeight = button.offsetHeight;
  const x = Math.random() * (window.innerWidth - btnWidth);
  const y = Math.random() * (window.innerHeight - btnHeight);
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
}
placeButtonRandom();

// Determine button color based on background brightness
function setButtonColor(){
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

// Runaway logic
document.addEventListener('mousemove', e => {
  const rect = button.getBoundingClientRect();
  const bx = rect.left + rect.width/2;
  const by = rect.top + rect.height/2;
  const dx = e.clientX - bx;
  const dy = e.clientY - by;
  const distance = Math.sqrt(dx*dx + dy*dy);

  if(distance < 150){ // trigger runaway
    button.classList.add('legs');
    // move opposite direction
    let newX = rect.left - dx/2;
    let newY = rect.top - dy/2;

    // keep inside viewport
    newX = Math.max(0, Math.min(window.innerWidth - rect.width, newX));
    newY = Math.max(0, Math.min(window.innerHeight - rect.height, newY));

    button.style.left = `${newX}px`;
    button.style.top = `${newY}px`;
  } else {
    button.classList.remove('legs');
  }
});
