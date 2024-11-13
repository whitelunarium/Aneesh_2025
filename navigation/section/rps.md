---
layout: base
title: Rock, Paper, Scissors
permalink: /rps/
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rock Paper Scissors</title>
    <style>
        body { display: flex; align-items: center; justify-content: center; flex-direction: column; height: 100vh; background-color: #f0f0f0; font-family: Arial, sans-serif; }
        .buttons { margin-top: 20px; }
        button { padding: 10px 20px; font-size: 1rem; margin: 5px; cursor: pointer; }
        #result { margin-top: 20px; font-size: 1.5rem; }
    </style>
</head>
<body>
    <h1>Rock Paper Scissors</h1>
    <div class="buttons">
        <button onclick="play('rock')">Rock</button>
        <button onclick="play('paper')">Paper</button>
        <button onclick="play('scissors')">Scissors</button>
    </div>
    <div id="result"></div>

    <script>
        function play(playerChoice) {
            const choices = ['rock', 'paper', 'scissors'];
            const computerChoice = choices[Math.floor(Math.random() * 3)];
            let result;

            if (playerChoice === computerChoice) {
                result = "It's a draw!";
            } else if (
                (playerChoice === 'rock' && computerChoice === 'scissors') ||
                (playerChoice === 'paper' && computerChoice === 'rock') ||
                (playerChoice === 'scissors' && computerChoice === 'paper')
            ) {
                result = `You win! ${playerChoice} beats ${computerChoice}`;
            } else {
                result = `You lose! ${computerChoice} beats ${playerChoice}`;
            }

            document.getElementById('result').innerText = result;
        }
    </script>
</body>
</html>
