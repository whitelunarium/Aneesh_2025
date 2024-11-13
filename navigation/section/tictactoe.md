---
layout: base
title: TicTacToe
permalink: /tictactoe/
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
    <style>
        body { display: flex; align-items: center; justify-content: center; height: 100vh; background-color: #f0f0f0; font-family: Arial, sans-serif; }
        #game { display: grid; grid-template-columns: repeat(3, 100px); grid-gap: 5px; }
        .cell { width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; font-size: 2rem; background-color: #fff; border: 2px solid #333; cursor: pointer; }
        #message { margin-top: 20px; font-size: 1.2rem; }
    </style>
</head>
<body>
    <div id="game"></div>
    <div id="message"></div>

    <script>
        const gameBoard = Array(9).fill(null);
        let currentPlayer = 'X';
        const gameContainer = document.getElementById('game');
        const messageDisplay = document.getElementById('message');
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];

        function renderBoard() {
            gameContainer.innerHTML = '';
            gameBoard.forEach((mark, index) => {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.innerText = mark || '';
                cell.addEventListener('click', () => handleMove(index));
                gameContainer.appendChild(cell);
            });
        }

        function handleMove(index) {
            if (!gameBoard[index] && !checkWinner()) {
                gameBoard[index] = currentPlayer;
                if (checkWinner()) {
                    messageDisplay.innerText = `${currentPlayer} wins!`;
                } else if (gameBoard.every(cell => cell)) {
                    messageDisplay.innerText = "It's a draw!";
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
                renderBoard();
            }
        }

        function checkWinner() {
            return winningCombinations.some(combination => 
                combination.every(index => gameBoard[index] === currentPlayer)
            );
        }

        function resetGame() {
            gameBoard.fill(null);
            currentPlayer = 'X';
            messageDisplay.innerText = '';
            renderBoard();
        }

        renderBoard();
    </script>
</body>
</html>
