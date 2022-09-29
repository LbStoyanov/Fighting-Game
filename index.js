const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
        position: this.position,
        width: 100,
        height: 50
    }
  }

  draw() {
    c.fillStyle = 'blue';
    c.fillRect(this.position.x, this.position.y, 50, this.height);

    c.fillStyle = 'green';
    c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
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
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};




function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
  }

  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
  }
}

animate();

window.addEventListener('keydown', (event) => {
  if (event.key === 'd') {
    keys.d.pressed = true;
    player.lastKey = 'd';
  } else if (event.key === 'a') {
    keys.a.pressed = true;
    player.lastKey = 'a';
  }else if (event.key === 'w') {
   player.velocity.y = -20;
  }

  if (event.key === 'ArrowRight') {
    keys.ArrowRight.pressed = true;
    enemy.lastKey = 'ArrowRight';
  } else if (event.key === 'ArrowLeft') {
    keys.ArrowLeft.pressed = true;
    enemy.lastKey = 'ArrowLeft';
  }else if (event.key === 'ArrowUp') {
   enemy.velocity.y = -20;
  }
  
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'd') {
    keys.d.pressed = false;
  } else if (event.key === 'a') {
    keys.a.pressed = false;
  }else if (event.key === 'w') {
    keys.w.pressed = false;
  }

  if (event.key === 'ArrowRight') {
    keys.ArrowRight.pressed = false;
  } else if (event.key === 'ArrowLeft') {
    keys.ArrowLeft.pressed = false;
  }else if (event.key === 'ArrowUp') {
    keys.ArrowUp.pressed = false;
  }
});
