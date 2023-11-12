let points = 30;
let currentID = 0;
let numOfHearts = 3;
gameOver = false;

const changePoints = (value) => {
  if (gameOver) return;
  const counter = document.getElementById("counter");

  points += value;
  if (points >= 0) counter.innerHTML = String(points).padStart(5, "0");
  else counter.innerHTML = "You ran out of points!";
};

const changeNumOfHearts = (value) => {
  numOfHearts += value;

  if (numOfHearts <= 2) {
    document.getElementById("heart2").src = "./resources/empty_heart.png";
  }
  if (numOfHearts <= 1) {
    document.getElementById("heart1").src = "./resources/empty_heart.png";
  }
  if (numOfHearts <= 0) {
    document.getElementById("heart0").src = "./resources/empty_heart.png";
    document.getElementById("board2").innerHTML = `
    <div class="finalSpan">
    Game Over! Your score: ${points}
    <br/>
    <button onclick="location.reload()">Play again!</button>
    </div>`;
    gameOver = true;
  }
};

document.addEventListener("click", (e) => {
  if (points < 0) return;
  if (e.target.id.startsWith("zombie")) {
    changePoints(10);
    document.getElementById(e.target.id).remove();
  } else {
    changePoints(-3);
  }
});

const createZombie = () => {
  if (gameOver) return;
  currentID++;
  const newSize = document.getElementById("backgroundPhoto").offsetWidth;
  const newHeight = document.getElementById("backgroundPhoto").clientHeight;

  const zombieSize = Math.floor(Math.random() * 70) + 15;
  const zombieInterval = Math.floor(Math.random() * 1000) + 150;
  const zombieHeight = Math.floor(Math.random() * 18);
  const zombieVelocity = Math.floor(Math.random() * 11) + 2.3;

  const board = document.getElementById("board2");
  const newZombie = document.createElement("div");
  newZombie.classList.add("zombie");
  newZombie.id = `zombie${currentID}`;
  newZombie.style.zoom = `${(zombieSize * newSize) / 800}%`;
  newZombie.style.marginBottom = `${zombieHeight}%`;
  board.appendChild(newZombie);
  newZombie.style.animation = `walk ${
    zombieVelocity / 8
  }s steps(9) 0s infinite, zombieMove ${zombieVelocity}s 0s 1 linear forwards`;

  setTimeout(createZombie, zombieInterval);
};

const checkPosition = () => {
  if (gameOver) return;
  const zombies = document.querySelectorAll(".zombie");
  zombies.forEach((zombie) => {
    if (zombie.offsetLeft < -150) {
      document.getElementById(zombie.id).remove();
      changeNumOfHearts(-1);
    }
  });
  setTimeout(checkPosition, 500);
};

createZombie();
checkPosition();
