class Player {
  constructor() {
    this.width = 5;
    this.height = 10;
    this.positionX = 10 - this.width / 2;
    this.positionY = 0;

    this.playerElm = document.getElementById("player");
    this.updateUI();
  }
  updateUI() {
    this.playerElm.style.width = this.width + "vw";
    this.playerElm.style.height = this.height + "vh";
    this.playerElm.style.left = this.positionX + "vw";
    this.playerElm.style.bottom = this.positionY + "vh";
  }
  moveLeft() {
    if (this.positionX > 0) {
      this.positionX--;
      this.updateUI();
    }
  }
  moveRight() {
    if (this.positionX < 100 - this.width) {
      this.positionX++;
      this.updateUI();
    }
  }
  jump() {
    let jumpCounter = 0;
    if (this.positionY === 0) {
      const jumper = setInterval(() => {
        this.positionY++;
        this.updateUI();
        jumpCounter++;
        if (jumpCounter === 60) {
          clearInterval(jumper);
        }
      }, 10);
    }
  }
  moveDown() {
    setInterval(() => {
      if (this.positionY > 0) {
        this.positionY--;
        this.updateUI();
      }
    }, 40);
  }
}
class Arrow {
  constructor() {
    this.width = 3;
    this.height = 1;
    this.positionX = player.positionX;
    this.positionY = player.positionY + 5;
  }
  createProjectile() {
    this.projectileElm = document.createElement("div");
    this.projectileElm.className = "projectile";
    this.projectileElm.style.width = this.width + "vw";
    this.projectileElm.style.height = this.height + "vh";
    this.projectileElm.style.left = this.positionX + "vw";
    this.projectileElm.style.bottom = this.positionY + "vh";
    this.parentElm = document.getElementById("board");
    this.parentElm.appendChild(this.projectileElm);
  }
  arrowMovement() {
    let direction = "right";
    setInterval(() => {
      projectileArr.forEach((projectileInstance) => {
        if (direction === "right") {
          projectileInstance.positionX++;
        } else if (direction === "left") {
          projectileInstance.positionX--;
        }

        if (
          newEnnemy.positionX <
            projectileInstance.positionX + projectileInstance.width &&
          newEnnemy.positionX + newEnnemy.width >
            projectileInstance.positionX &&
          newEnnemy.positionY <
            projectileInstance.positionY + projectileInstance.height &&
          newEnnemy.positionY + newEnnemy.height > projectileInstance.positionY
        ) {
          this.parentElm.removeChild(newEnnemy.ennemyElm);
          this.parentElm.removeChild(newArrow.projectileElm);
        }

        projectileInstance.projectileElm.style.width =
          projectileInstance.width + "vw";
        projectileInstance.projectileElm.style.height =
          projectileInstance.height + "vh";
        projectileInstance.projectileElm.style.left =
          projectileInstance.positionX + "vw";
        projectileInstance.projectileElm.style.bottom =
          projectileInstance.positionY + "vh";
      });
    }, 20);
  }
}
class Obstacle {
  constructor() {
    this.width = 5;
    this.height = 20;
    this.positionX = 20 + Math.floor(Math.random() * (30 - this.width + 1)); // random number between 0 and (100 - width)
    this.positionY = 0;

    this.createDomElement();
  }
  createDomElement() {
    this.obstacleElm = document.createElement("div");

    this.obstacleElm.className = "obstacle";
    this.obstacleElm.style.width = this.width + "vw";
    this.obstacleElm.style.height = this.height + "vh";
    this.obstacleElm.style.left = this.positionX + "vw";
    this.obstacleElm.style.bottom = this.positionY + "vh";

    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.obstacleElm);
  }
}
class Castle {
  constructor() {
    this.width = 20;
    this.height = 30;
    this.positionX = 80;
    this.positionY = 0;

    this.createCastleElement();
  }
  createCastleElement() {
    this.castleElm = document.createElement("div");

    this.castleElm.className = "castle";
    this.castleElm.style.width = this.width + "vw";
    this.castleElm.style.height = this.height + "vh";
    this.castleElm.style.left = this.positionX + "vw";
    this.castleElm.style.bottom = this.positionY + "vh";

    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.castleElm);
  }
}
class Ennemy {
  constructor() {
    this.width = 5;
    this.height = 10;
    this.positionX = 50 + Math.floor(Math.random() * (40 - this.width + 1));
    this.positionY = 0;

    this.createDomEnnemy();
  }
  createDomEnnemy() {
    this.ennemyElm = document.createElement("div");
    this.ennemyElm.className = "ennemy";
    this.ennemyElm.style.width = this.width + "vw";
    this.ennemyElm.style.height = this.height + "vh";
    this.ennemyElm.style.left = this.positionX + "vw";
    this.ennemyElm.style.bottom = this.positionY + "vh";
    const parentEn = document.getElementById("board");
    parentEn.appendChild(this.ennemyElm);
  }
  moveLeft() {
    const lefting = setInterval(() => {
      if (
        this.positionX === 0 ||
        (this.positionX < newObstacle.positionX + newObstacle.width &&
          this.positionX + this.width > newObstacle.positionX &&
          this.positionY < newObstacle.positionY + newObstacle.height &&
          this.positionY + this.height > newObstacle.positionY)
      ) {
        this.moveRight();
        clearInterval(lefting);
      } else if (this.positionX > 0) {
        this.positionX--;
        this.updateUIEnnemy();
      }
    }, 80);
  }
  moveRight() {
    const righting = setInterval(() => {
      if (
        this.positionX === 100 - this.width ||
        (this.positionX < newObstacle.positionX + newObstacle &&
          this.positionX + this.width > newObstacle.positionX &&
          this.positionY < newObstacle.positionY + newObstacle.height &&
          this.positionY + this.height > newObstacle.positionY)
      ) {
        this.moveLeft();
        clearInterval(righting);
      } else if (this.positionX < 100 - this.width) {
        this.positionX++;
        this.updateUIEnnemy();
      }
    }, 80);
  }
  updateUIEnnemy() {
    this.ennemyElm.style.width = this.width + "vw";
    this.ennemyElm.style.height = this.height + "vh";
    this.ennemyElm.style.left = this.positionX + "vw";
    this.ennemyElm.style.bottom = this.positionY + "vh";
  }
}

const player = new Player();
const obstaclesArr = [];
const projectileArr = [];
const ennemyArr = [];
const newObstacle = new Obstacle();
obstaclesArr.push(newObstacle);
const newCastle = new Castle();
const newEnnemy = new Ennemy();
ennemyArr.push(newEnnemy);
setInterval(() => {
  if (
    player.positionX < newCastle.positionX + newCastle.width &&
    player.positionX + player.width > newCastle.positionX &&
    player.positionY < newCastle.positionY + newCastle.height &&
    player.positionY + player.height > newCastle.positionY
  ) {
    console.log("game over...");
    location.href = "gameover.html";
  }
  obstaclesArr.forEach((obstacleInstance, i, arr) => {
    // detect collision
    if (
      player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
      player.positionX + player.width > obstacleInstance.positionX &&
      player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
      player.positionY + player.height > obstacleInstance.positionY
    ) {
      // Collision detected!
      console.log("game over...");
      location.href = "gameover.html";
    }
  });
}, 30);
setInterval(() => {
  ennemyArr.forEach((ennemyInstance, i, arr) => {
    // detect collision
    if (
      player.positionX < ennemyInstance.positionX + ennemyInstance.width &&
      player.positionX + player.width > ennemyInstance.positionX &&
      player.positionY < ennemyInstance.positionY + ennemyInstance.height &&
      player.positionY + player.height > ennemyInstance.positionY &&
      newEnnemy === true
    ) {
      // Collision detected!
      console.log("game over...");
      location.href = "gameover.html";
    }
  });
}, 30);

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    direction = "left";
    player.moveLeft();
  } else if (event.code === "ArrowRight") {
    direction = "right";
    player.moveRight();
  } else if (event.code === "ArrowUp") {
    player.jump();
  } else if (event.code === "Space") {
    const newArrow = new Arrow();
    projectileArr.push(newArrow);
    newArrow.createProjectile();
    newArrow.arrowMovement();
  }
});

player.moveDown();
newEnnemy.moveLeft();
