const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
  }

  draw() {
    c.fillStyle = 'blue';
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

//player.draw();

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

//enemy.draw();
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};


let lastKeyPressed;

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;

  if (keys.a.pressed && lastKeyPressed === 'a') {
    player.velocity.x = -1;
  } else if (keys.d.pressed && lastKeyPressed === 'd') {
    player.velocity.x = 1;
  }
}

animate();

window.addEventListener('keydown', (event) => {
  if (event.key === 'd') {
    keys.d.pressed = true;
    lastKeyPressed = 'd';
  } else if (event.key === 'a') {
    lastKeyPressed = 'a';
    keys.a.pressed = true;
  }else if (event.key === 'w') {
    lastKeyPressed = 'a';
    keys.a.pressed = true;
  }
  
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'd') {
    keys.d.pressed = false;
  } else if (event.key === 'a') {
    keys.a.pressed = false;
  }
});
