const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class Sprite {
  constructor({ position, velocity, color = "blue", offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;

    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //Attack box
    if (this.isAttacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
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
  offset: {
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
  color: "red",
  offset: {
    x: -50,
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

function rectangularCollision({rectangle1, rectangle2}) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;
  //Player movement
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
  }
  //Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
  }

  //Detect for collision

  if (
    rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    document.getElementById('enemyHealth').style.width = '20%';
  }

  if (
    rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    console.log("enemy");
  }
}

animate();

window.addEventListener("keydown", (event) => {
  if (event.key === "d") {
    keys.d.pressed = true;
    player.lastKey = "d";
  } else if (event.key === "a") {
    keys.a.pressed = true;
    player.lastKey = "a";
  } else if (event.key === "w") {
    player.velocity.y = -20;
  } else if (event.key === " ") {
    player.attack();
  }

  if (event.key === "ArrowRight") {
    keys.ArrowRight.pressed = true;
    enemy.lastKey = "ArrowRight";
  } else if (event.key === "ArrowLeft") {
    keys.ArrowLeft.pressed = true;
    enemy.lastKey = "ArrowLeft";
  } else if (event.key === "ArrowUp") {
    enemy.velocity.y = -20;
  } else if (event.key === "p") {
    enemy.attack();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "d") {
    keys.d.pressed = false;
  } else if (event.key === "a") {
    keys.a.pressed = false;
  } else if (event.key === "w") {
    keys.w.pressed = false;
  }

  if (event.key === "ArrowRight") {
    keys.ArrowRight.pressed = false;
  } else if (event.key === "ArrowLeft") {
    keys.ArrowLeft.pressed = false;
  } else if (event.key === "ArrowUp") {
    keys.ArrowUp.pressed = false;
  }
});
