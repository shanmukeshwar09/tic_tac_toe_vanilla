let human;
let ai;
var gameBoard = [];

const winScenario = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function declareWinner(winSpots, player) {
    winSpots.forEach(element => {
        document.getElementById(element).style.backgroundColor = player == human ? 'hsl(101, 82%, 46%)' : 'red';
    });
    document.querySelector('.alert').style.display = 'block';
    document.querySelector('.alert .message').innerHTML = player == human ? 'You win' : 'You Loose';
}




function declareDraw() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).style.backgroundColor = 'coral';
    }
    document.querySelector('.alert').style.display = 'block';
    document.querySelector('.alert .message').innerHTML = 'It\'s a Draw Match';

}

function getEmptySpotsForAi() {
    return gameBoard.filter(s => typeof s == 'number');
}

function checkForWin(gameBoard, palyer) {

    let indexes = [];
    let result = {
        'win': false,
        'indexes': []
    }

    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] == palyer) {
            indexes.push(i);
        }
    }

    for (let i = 0; i < 8; i++) {
        let a = winScenario[i][0];
        let b = winScenario[i][1];
        let c = winScenario[i][2];
        if (indexes.includes(a) && indexes.includes(b) && indexes.includes(c)) {
            result = {
                'win': true,
                'indexes': [a, b, c]
            }
            break;
        }
    }

    return result;
}


function handleTurn(id, player) {
    document.getElementById(id).innerHTML = player;
    gameBoard[id] = player;
    let result = checkForWin(gameBoard, player);
    if (result.win) {
        declareWinner(result.indexes, player);
        return false;
    }
    return true;
}




function handleGesture(cellID) {
    let id = cellID.target.id;
    if (typeof gameBoard[id] == 'number') {
        let toPlay = handleTurn(id, human);

        if (toPlay) {
            if (getEmptySpotsForAi().length == 0) {
                declareDraw();
            } else {
                handleTurn(minimax(gameBoard, ai).index, ai);
            }

        }

    }
}


function startGame() {
    gameBoard = Array.from(Array(9).keys());
    for (let i = 0; i < 9; i++) {
        let tempDoc = document.getElementById(i);
        tempDoc.innerHTML = '';
        tempDoc.style.removeProperty('background-color');
        tempDoc.addEventListener('click', handleGesture, false);
    }
}

function initGame() {

    document.querySelector('.alert').style.display = 'none';
    document.querySelector('.chooser').style.display = 'block';
    document.getElementById('X').addEventListener('click', chooseVar, false);
    document.getElementById('O').addEventListener('click', chooseVar, false);
}

function chooseVar(varId) {
    if (varId.target.id == 'X') {
        human = 'X';
        ai = 'O';
    } else {
        human = 'O';
        ai = 'X';
    }
    document.querySelector('.chooser').style.display = 'none';
    startGame();

}

function minimax(newBoard, player) {
    var availSpots = getEmptySpotsForAi();

    if (checkForWin(newBoard, human).win) {
        return { score: -10 };
    } else if (checkForWin(newBoard, ai).win) {
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

    var bestMove;
    if (player === ai) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

initGame();