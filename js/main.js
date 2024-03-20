const player = document.querySelector("#player");
const cell = document.querySelectorAll(".cell");
const field = document.querySelector(".field");
const blockWinner = document.querySelector(".block-winner");
const spanWinner = document.querySelector("#span-winner");
const newGame = document.querySelector("#new-game");

const iconCross = '<img src="./img/x.svg" alt="">'
const iconCircle = '<img src="./img/circle.svg" alt="">'

let combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 4, 8],
  [2, 4, 6],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let winner = "";
let count = 0;
let step = "";

const whoPlayer = () => {
  if (step == "circle") {
    step = "cross";
    player.innerText = "Крестики";
  } else {
    step = "circle";
    player.innerText = "Нолики";
  }
};

whoPlayer();

cell.forEach((item) => {
  item.addEventListener("click", () => {
    if (
      !item.classList.contains("circle") &&
      !item.classList.contains("cross")
    ) {
      item.classList.add(step);
      if (step == "circle") {
        item.innerHTML = iconCircle;
      }
      if (step == "cross") {
        item.innerHTML = iconCross;
      }

      count++;
      whoPlayer();
      circleWinner();
      crossWinner();
      noWinner();
    }
  });
});

let circleWinner = () => {
  for (let i = 0; i < combinations.length; i++) {
    if (
      cell[combinations[i][0]].classList.contains("circle") &&
      cell[combinations[i][1]].classList.contains("circle") &&
      cell[combinations[i][2]].classList.contains("circle")
    ) {
      cell[combinations[i][0]].classList.add("winner");
      cell[combinations[i][1]].classList.add("winner");
      cell[combinations[i][2]].classList.add("winner");

      winner = "Победа ноликов";
      endGame(winner);
      return 1;
    }
  }
};

let crossWinner = () => {
  for (let i = 0; i < combinations.length; i++) {
    if (
      cell[combinations[i][0]].classList.contains("cross") &&
      cell[combinations[i][1]].classList.contains("cross") &&
      cell[combinations[i][2]].classList.contains("cross")
    ) {
      cell[combinations[i][0]].classList.add("winner");
      cell[combinations[i][1]].classList.add("winner");
      cell[combinations[i][2]].classList.add("winner");

      endGame(winner);
      winner = "Победа крестиков";
      return 1;
    }
  }
};

let noWinner = () => {
  if (!circleWinner() && !crossWinner() && count >= 9) {
    winner = "Ничья";
    endGame(winner);
  }
};

const endGame = (winner) => {
  field.style.pointerEvents = "none";
  blockWinner.style.display = "flex";
  spanWinner.innerText = winner;
};

newGame.addEventListener("click", () => {
  document.location.reload();
});
