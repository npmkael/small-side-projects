const X_CLASS = "x";
const O_CLASS = "o";
const winningArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessageElement = document.getElementById("winning-message");

const restartBtn = document.querySelector(".restart-btn");
const resetScoreBtn = document.getElementById("reset-score-btn");
const autoPlayBtn = document.getElementById("auto-play-btn");
const stopAutoPlayBtn = document.getElementById("stop-auto-play-btn");

const xScoreElement = document.querySelector("[data-x-score]");
const oScoreElement = document.querySelector("[data-o-score]");

const scores = {
  oScore: 0,
  xScore: 0,
};

startGame();

restartBtn.addEventListener("click", startGame);

resetScoreBtn.addEventListener("click", function () {
  scores.oScore = 0;
  scores.xScore = 0;

  oScoreElement.innerHTML = `O: ${scores.oScore}`;
  xScoreElement.innerHTML = `X: ${scores.xScore}`;
});

autoPlayBtn.addEventListener("click", autoPlay);
stopAutoPlayBtn.addEventListener("click", stopAutoPlay);

let intervalId;

function autoPlay() {
  let randomNum;
  const myInterval = setInterval(function () {
    randomNum = Math.floor(Math.random() * 9);
    let cell;

    const currentClass = circleTurn ? O_CLASS : X_CLASS;

    if (
      !cellElements[randomNum].classList.contains(O_CLASS) &&
      !cellElements[randomNum].classList.contains(X_CLASS)
    ) {
      cell = cellElements[randomNum];
      placeMark(cell, currentClass);
    }

    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
    }
  }, 1000);

  intervalId = myInterval;
}

function stopAutoPlay() {
  clearInterval(intervalId);
}

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  // 1. Place the Mark
  const cell = e.target;
  const currentClass = circleTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  // 2. Check for Win
  if (checkWin(currentClass)) {
    endGame(false);
    // 3. Check for Draw
  } else if (isDraw()) {
    endGame(true);
  } else {
    // 4. Switch Turns
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = `Draw!`;
    stopAutoPlay();
  } else {
    updateScore(circleTurn);
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    stopAutoPlay();
  }
  winningMessageElement.classList.add("show");
}

function updateScore(bool) {
  if (bool) {
    oScoreElement.innerHTML = `O: ${(scores.oScore += 1)}`;
  } else {
    xScoreElement.innerHTML = `X: ${(scores.xScore += 1)}`;
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);

  if (circleTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return winningArray.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}
