const canvas = document.getElementById('cnv'),
      ctx = canvas.getContext('2d'),
      WIDTH = canvas.width = window.innerWidth,
      HEIGHT = canvas.height = window.innerHeight,
      divs = document.querySelectorAll('.fs-content'),
      BR = Math.sqrt(WIDTH * WIDTH + HEIGHT * HEIGHT);

let particles = [];
let stage = 0;
let colors = ['#E74C3C', '#8E44AD', '#2980B9', '#16A085', '#F1C40F', '#E67E22', '#D35400', '#34495E'];

class Particle{
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 0;
    this.speed = 5;
  }
  
  draw(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
    ctx.fill();
    ctx.closePath();
  }
  
  update() {
    this.size += this.speed;
    
    this.speed += 2;
    
    this.draw();
  }
}

divs.forEach(elem => elem.addEventListener('click', e => {
  divs[stage].classList.remove('active');
  stage++;
  if(stage >= divs.length) stage = 0;
  divs[stage].classList.add('active');
  particles.push(new Particle(e.x, e.y, colors[stage]));
}));

function animate(){
  
  particles.forEach(elem => elem.update());
  
  particles = particles.filter(elem => elem.size < BR);
  
  requestAnimationFrame(animate);
}
animate();
