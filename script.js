import * as CONSTANTS from "./constants.js";
let human;
let ai;
var gameBoard = [];

CONSTANTS.RESTART.onclick = () => initGame();

const initGame = () => {
  CONSTANTS.ALERT.style.display = "none";
  CONSTANTS.CHOOSER.style.display = "block";
  CONSTANTS.X.addEventListener("click", chooseVar);
  CONSTANTS.O.addEventListener("click", chooseVar);
};

const startGame = () => {
  gameBoard = Array.from(Array(9).keys());
  for (let i = 0; i < 9; i++) {
    let tempDoc = document.getElementById(i);
    tempDoc.innerHTML = "";
    tempDoc.addEventListener("click", handleGesture);
  }
};

const declareWinner = (player) => {
  CONSTANTS.GAME.style.display = "none";
  CONSTANTS.ALERT.style.display = "block";
  CONSTANTS.MESSAGE.innerHTML = player == human ? "You win" : "You Loose";
};

const declareDraw = () => {
  CONSTANTS.GAME.style.display = "none";
  CONSTANTS.ALERT.style.display = "block";
  CONSTANTS.MESSAGE.innerHTML = "Draw Match";
};

const getEmptySpotsForAi = () => {
  return gameBoard.filter((s) => typeof s === "number");
};

const checkForWin = (gameBoard, palyer) => {
  let indexes = [];
  let result = false;

  for (let i = 0; i < 9; i++) {
    if (gameBoard[i] == palyer) {
      indexes.push(i);
    }
  }

  for (let i = 0; i < 8; i++) {
    let a = CONSTANTS.WIN_SCENARIO[i][0];
    let b = CONSTANTS.WIN_SCENARIO[i][1];
    let c = CONSTANTS.WIN_SCENARIO[i][2];
    if (indexes.includes(a) && indexes.includes(b) && indexes.includes(c)) {
      result = true;
      break;
    }
  }
  return result;
};

const handleTurn = (id, player) => {
  document.getElementById(id).innerHTML = player;
  gameBoard[id] = player;
  let result = checkForWin(gameBoard, player);
  if (result) {
    declareWinner(player);
    return false;
  }
  return true;
};

const handleGesture = (cellID) => {
  let id = cellID.target.id;
  if (typeof gameBoard[id] == "number") {
    let toPlay = handleTurn(id, human);

    if (toPlay) {
      if (getEmptySpotsForAi().length == 0) {
        declareDraw();
      } else {
        handleTurn(minimax(gameBoard, ai).index, ai);
      }
    }
  }
};

const chooseVar = (varId) => {
  if (varId.target.id == "X") {
    human = "X";
    ai = "O";
  } else {
    human = "O";
    ai = "X";
  }
  CONSTANTS.CHOOSER.style.display = "none";
  CONSTANTS.GAME.style.display = "flex";
  startGame();
};

const minimax = (newBoard, player) => {
  var availSpots = getEmptySpotsForAi();

  if (checkForWin(newBoard, human)) {
    return { score: -10 };
  } else if (checkForWin(newBoard, ai)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == ai) {
      var result = minimax(newBoard, human);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, ai);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  let bestMove;
  if (player === ai) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
};

initGame();
