document.getElementById('ONE').onclick = () => {
    document.getElementById('ONE').disabled = true;
    document.getElementById('backButton').disabled = false;
    let currentWindow = document.getElementById('start-menu');
    let nextWindow = document.getElementById('decision-menu');
    let choicesOBJ = document.getElementsByClassName('choices');

    nextWindow.querySelector('#question').innerHTML = `Would you like to play with X or O ?`;
    fadeOut(currentWindow, [nextWindow], ["block"]);

    for (let i = 0; i < choicesOBJ.length; i++) {
        choicesOBJ[i].addEventListener('click', gameTrigger);
        choicesOBJ[i].disabled = false;
    }
}

document.getElementById('TWO').onclick = () => {
    document.getElementById('TWO').disabled = true;
    document.getElementById('backButton').disabled = false;
    let currentWindow = document.getElementById('start-menu');
    let nextWindow = document.getElementById('decision-menu');
    let choicesOBJ = document.getElementsByClassName('choices');

    nextWindow.querySelector('#question').innerHTML = `Player 1,  <br> would you like to play with X or O ?`;
    fadeOut(currentWindow, [nextWindow], ["block"]);

    for (let i = 0; i < choicesOBJ.length; i++) {
        choicesOBJ[i].addEventListener('click', gameTrigger);
        choicesOBJ[i].disabled = false;
    }
}

document.getElementById('backButton').onclick = () => {
    document.getElementById('backButton').disabled = true;
    let currentWindow = document.getElementById('decision-menu');
    let nextWindow = document.getElementById('start-menu');

    fadeOut(currentWindow, [nextWindow], ["block"]);
    document.getElementById('ONE').disabled = false;
    document.getElementById('TWO').disabled = false;
}

const gameTrigger = (e) => {
    e.target.disabled = true;

    let choicesOBJ = document.getElementsByClassName('choices');
    for (let i = 0; i < choicesOBJ.length; i++)
        choicesOBJ[i].addEventListener('click', gameTrigger);

    let isFirstPlayerX;

    if (e.target.innerText === 'X') isFirstPlayerX = 1;
    else isFirstPlayerX = 0;

    let text = document.getElementById('decision-menu').querySelector('#question').innerText;
    let isComputerPlaying = (text[0] === 'P') ? false : true;

    prepareGame(isComputerPlaying);

    setTimeout(() => {
        ticTacToeGame(isFirstPlayerX, isComputerPlaying);
    }, 1000);
}

const prepareGame = (isComputerPlaying) => {
    let currentWindow = document.getElementById('decision-menu');
    let nextWindow = document.getElementById('game-menu');

    let nx = [nextWindow];
    let types = ["block"];

    let scores = document.getElementsByClassName('scoreDisplay');

    for (let i = 0; i < scores.length; i++) {
        if (isComputerPlaying) {
            if (!i) scores[i].innerHTML = `Your Score <br> ${0}`;
            else scores[i].innerHTML = `Computer's Score <br> ${0}`;
        }
        else
            scores[i].innerHTML = `Player ${i + 1} <br> ${0}`;

        nx.push(scores[i]);
        types.push("inline-block");
    }

    let resetButton = document.getElementById('resetAll');
    resetButton.innerText = "Reset";

    nx.push(resetButton);
    types.push("inline-block");

    resetBoard();

    fadeOut(currentWindow, nx, types);

    let firstPlayerWarningOBJ = document.getElementById('firstPlayerWarning');
    let secondPlayerWarningOBJ = document.getElementById('secondPlayerWarning');

    if (isComputerPlaying) {
        firstPlayerWarningOBJ.innerText = `Your Turn`;
        secondPlayerWarningOBJ.innerText = `Computer's Turn`;
    }
    else {
        firstPlayerWarningOBJ.innerText = `Go Player 1`;
        secondPlayerWarningOBJ.innerText = `Go Player 2`;
    }
}

const resetBoard = () => {
    let squares = document.getElementsByClassName('square');

    for (let i = 0; i < squares.length; i++) {
        squares[i].innerText = "";
        squares[i].color = "white";
        squares[i].backgroundColor = "inherit";
        squares[i].outerHTML = squares[i].outerHTML;
    }

    let firstPlayerWarningOBJ = document.getElementById('firstPlayerWarning');
    let secondPlayerWarningOBJ = document.getElementById('secondPlayerWarning');

    firstPlayerWarningOBJ.style.marginTop = "0px";
    secondPlayerWarningOBJ.style.marginTop = "0px";
}

const ticTacToeGame = (isFirstPlayerX, isComputerPlaying) => {
    /*
        isFirstPlayerX: indicates which symbol first player is using 
        isFirstPlayerX = 0: first player is using O. You starts
        isFirstPlayerX = 1: first player is using X. Computer starts

        isComputerPlaying: indicates if the second player is human or the computer
        isComputerPlaying = 0: the first player is a human
        isComputerPlaying = 1: the second player is the computer

    */

    /* Compute Computer Moves */

    const maxMask = 20000;
    let dp = new Array(2);

    for (let i = 0; i < 2; i++) dp[i] = new Array(maxMask);

    for (let i = 0; i < 2; i++)
        for (let j = 0; j < maxMask; j++)
            dp[i][j] = -10000;

    const getWinnerForDP = (currentBoard) => {
        /*
            Returns
                0: Draw
                1: First Player Won
                2: Computer Won
                -1: No winners yet
        */
        const winnigPosition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let freeCells = 0;
        for (let i = 0; i < 9; i++)
            if (!currentBoard[i])
                ++freeCells;

        if (!freeCells)
            return 0;

        for (let idx of winnigPosition) {
            if (currentBoard[idx[0]] === currentBoard[idx[1]] && currentBoard[idx[0]] === currentBoard[idx[2]]) {
                if (currentBoard[idx[0]] === 1) {
                    if (isFirstPlayerX) return 1;
                    return 2;
                }

                if (currentBoard[idx[0]] == 2) {
                    if (isFirstPlayerX) return 2;
                    return 1;
                }
            }
        }

        return -1;
    }

    const getDP = (isComputerTurn, mask) => {
        if (dp[isComputerTurn][mask] === -10000) {
            let currentBoard = new Array(9);
            let powerOfThree = new Array(9);
            let nextMask = mask;

            powerOfThree[0] = 1;

            for (let i = 0; i < 9; i++) {
                if (i) powerOfThree[i] = powerOfThree[i - 1] * 3;
                currentBoard[i] = nextMask % 3;
                nextMask = Math.floor(nextMask / 3);
            }

            let winner = getWinnerForDP(currentBoard);

            let depth = 0;
            let squaresOBJ = document.getElementsByClassName('square');

            for (let i = 0; i < squaresOBJ.length; i++)
                if (squaresOBJ[i].innerText)
                    depth++;

            if (winner === 0) dp[isComputerTurn][mask] = 0;
            else if (winner === 1) dp[isComputerTurn][mask] = -10 + depth;
            else if (winner === 2) dp[isComputerTurn][mask] = +10 - depth;
            else {
                if (isComputerTurn) {
                    dp[isComputerTurn][mask] = -100;
                    for (let i = 0; i < 9; i++)
                        if (!currentBoard[i]) {
                            nextMask = mask;
                            if (isFirstPlayerX) nextMask += 2 * powerOfThree[i];
                            else nextMask += powerOfThree[i];

                            dp[isComputerTurn][mask] = Math.max(dp[isComputerTurn][mask], getDP(0, nextMask));
                        }
                }
                else {
                    dp[isComputerTurn][mask] = +100;
                    for (let i = 0; i < 9; i++)
                        if (!currentBoard[i]) {
                            nextMask = mask;
                            if (isFirstPlayerX) nextMask += powerOfThree[i];
                            else nextMask += 2 * powerOfThree[i];

                            dp[isComputerTurn][mask] = Math.min(dp[isComputerTurn][mask], getDP(1, nextMask));
                        }
                }
            }
        }

        return dp[isComputerTurn][mask];
    }

    const getMask = () => {
        let squaresOBJ = document.getElementsByClassName('square');
        let powerOfThree = 1;
        let mask = 0;

        for (let i = 0; i < squaresOBJ.length; i++) {
            if (squaresOBJ[i].innerText === 'X') mask += powerOfThree;
            else if (squaresOBJ[i].innerText === 'O') mask += 2 * powerOfThree;
            powerOfThree *= 3;
        }

        return mask;
    }

    let firstPlayerScore = 0;
    let secondPlayerScore = 0;
    let stopExecution = false;

    const resetGame = () => {
        document.getElementById('ONE').disabled = false;
        document.getElementById('TWO').disabled = false;

        let currentWindow = document.getElementById('game-menu');
        let nextWindow = document.getElementById('start-menu');

        let scores = document.getElementsByClassName('scoreDisplay');
        let resetButtonOBJ = document.getElementById('resetAll');

        resetButtonOBJ.removeEventListener('click', resetGame);

        objs = [];

        objs.push(currentWindow);

        for (let i = 0; i < scores.length; i++)
            objs.push(scores[i]);

        objs.push(resetButtonOBJ);

        moveDown(1);
        moveDown(2);
        setTimeout(() => {
            resetBoard();

            for (let i = 0; i < objs.length; i++)
                if (i != objs.length - 1)
                    fadeOut(objs[i]);
                else
                    fadeOut(objs[i], [nextWindow], ["block"]);
        }, 200);

        stopExecution = true;
    }

    const checkWinner = () => {
        /*
            Tells the winner of the game if there is any
            Return Values: 
                0: Draw
                1: First player won
                2: Second player won
                -1: Game is running
        */

        const winnigPosition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        squares = document.getElementsByClassName('square');

        for (let pos of winnigPosition) {
            if (squares[pos[0]].innerText === squares[pos[1]].innerText && squares[pos[0]].innerText === squares[pos[2]].innerText) {
                if (squares[pos[0]].innerText === 'X') {
                    if (isFirstPlayerX) return 1;
                    return 2;
                }
                else
                    if (squares[pos[0]].innerText === 'O') {
                        if (!isFirstPlayerX) return 1;
                        return 2;
                    }
            }
        }

        let freePostions = 0;
        for (let i = 0; i < squares.length; i++)
            if (!squares[i].innerText)
                ++freePostions;

        if (!freePostions)
            return 0;

        return -1;
    }

    const findWinningConfig = () => {
        const winnigPosition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        squares = document.getElementsByClassName('square');

        for (let i = 0; i < winnigPosition.length; i++) {
            indexes = winnigPosition[i];

            if (squares[indexes[0]].innerText === squares[indexes[1]].innerText && squares[indexes[0]].innerText === squares[indexes[2]].innerText && squares[indexes[0]].innerText)
                return winnigPosition[i];
        }

        return [];
    }

    const play = (round, callback) => {
        if (stopExecution)
            return;

        setTimeout(() => {
            let resetButtonOBJ = document.getElementById('resetAll');
            resetButtonOBJ.addEventListener('click', resetGame);
        }, 500);

        let isFirstPlayerTurn = (round % 2 === isFirstPlayerX);

        const winner = checkWinner();

        if (round) {
            if (isFirstPlayerTurn) moveDown(2);
            else moveDown(1);
        }

        if (winner >= 0) {
            let resetButtonOBJ = document.getElementById('resetAll');

            fadeOut(resetButtonOBJ);

            setTimeout(() => {
                resetButtonOBJ = document.getElementById('resetAll');
                resetButtonOBJ.removeEventListener('click', resetGame);
            }, 500);

            let config = findWinningConfig();
            let squares = document.getElementsByClassName('square');

            if (winner) {
                for (let pos of config) {
                    squares[pos].style.backgroundColor = "black";
                    squares[pos].style.color = "lightblue";
                }
            }

            setTimeout(() => {
                let gameEndOBJ = document.getElementById('game-end');

                if (winner == 0) {
                    gameEndOBJ.innerText = "Draw !!!";
                }
                else
                    if (winner == 1) {
                        if (isComputerPlaying) gameEndOBJ.innerText = "You Won ! :)"
                        else gameEndOBJ.innerText = "Player 1 Won";
                        ++firstPlayerScore;
                    }
                    else
                        if (winner == 2) {
                            if (isComputerPlaying) gameEndOBJ.innerText = "Computer Won :(";
                            else gameEndOBJ.innerText = "Player 2 Won";
                            ++secondPlayerScore;
                        }

                fadeIn(gameEndOBJ, 'initial');

                setTimeout(() => {
                    fadeOut(gameEndOBJ);

                    scoresDisplayOBJs = document.getElementsByClassName('scoreDisplay');
                    playerScores = [firstPlayerScore, secondPlayerScore];

                    for (let i = 0; i < scoresDisplayOBJs.length; i++)
                        if (isComputerPlaying) {
                            if (!i) scoresDisplayOBJs[i].innerHTML = `Your Score <br> ${playerScores[i]}`;
                            else scoresDisplayOBJs[i].innerHTML = `Computer's Score <br> ${playerScores[i]}`;
                        }
                        else
                            scoresDisplayOBJs[i].innerHTML = `Player ${i + 1} <br> ${playerScores[i]}`;

                    if (winner) {
                        for (let pos of config) {
                            squares[pos].style.backgroundColor = "inherit";
                            squares[pos].style.color = "white";
                        }
                    }

                    resetBoard();
                    fadeIn(resetButtonOBJ, 'inline-block');

                    setTimeout(() => {
                        callback(0, play);
                    }, 500);

                }, 1000);

            }, 1000);

            return;
        }

        if (!isFirstPlayerTurn && isComputerPlaying) {
            setTimeout(() => {
                resetButtonOBJ = document.getElementById('resetAll');
                resetButtonOBJ.removeEventListener('click', resetGame);
            }, 500);

            if (isFirstPlayerTurn) {
                if (round) moveDown(2);
                moveUp(1);
            }
            else {
                if (round) moveDown(1);
                moveUp(2);
            }

            let currentMask = getMask();
            let squaresOBJ = document.getElementsByClassName('square');
            let nextMove = -1;
            let powerOfThree = 1;
            let nextMask = currentMask;
            let nextMoves = [];

            for (let i = 0; i < squaresOBJ.length; i++) {
                if (!squaresOBJ[i].innerText) {
                    nextMask = currentMask;
                    if (isFirstPlayerX) nextMask += 2 * powerOfThree;
                    else nextMask += powerOfThree;

                    if (getDP(1, currentMask) === getDP(0, nextMask))
                        nextMoves.push(i);
                }
                powerOfThree *= 3;
            }

            setTimeout(() => {
                nextMove = nextMoves[Math.floor(Math.random() * nextMoves.length)];
                if (isFirstPlayerX) squaresOBJ[nextMove].innerText = "O";
                else squaresOBJ[nextMove].innerText = "X";
                callback(round + 1, play);
            }, 500);
        }
        else {
            let currentSymbol;

            if (isFirstPlayerTurn) {
                if (isFirstPlayerX) currentSymbol = 'X';
                else currentSymbol = 'O';
            }
            else {
                if (!isFirstPlayerX) currentSymbol = 'X';
                else currentSymbol = 'O';
            }

            if (isFirstPlayerTurn) {
                if (round) moveDown(2);
                moveUp(1);
            }
            else {
                if (round) moveDown(1);
                moveUp(2);
            }

            setTimeout(() => {
                let squares = document.getElementsByClassName('square');

                const processClick = (e) => {
                    if (e.target.innerText) return;
                    e.target.innerText = currentSymbol;

                    for (let i = 0; i < squares.length; i++)
                        squares[i].removeEventListener('click', processClick);

                    callback(round + 1, play);
                    return;
                }

                for (let i = 0; i < squares.length; i++)
                    squares[i].addEventListener('click', processClick);
            }, 350);

        }
    }

    play(0, play);
}

const fadeOut = (obj, nx, typeDisplay) => {
    obj.style.opacity = 1.0;

    const fade = setInterval(() => {
        if (obj.style.opacity < 0.1) {
            obj.style.display = "none";
            clearInterval(fade);

            if (!!nx) {
                for (let i = 0; i < nx.length; i++)
                    fadeIn(nx[i], typeDisplay[i]);
            }
        }
        obj.style.opacity -= 0.2;
    }, 100);
}

const fadeIn = (obj, typeDisplay) => {
    obj.style.opacity = 0.0;
    obj.style.display = typeDisplay;

    const fade = setInterval(() => {
        if (obj.style.opacity >= 0.9) {
            clearInterval(fade);
        }
        obj.style.opacity -= (-0.2);
    }, 100);
}

const moveUp = (playerCard) => {
    let id;

    if (playerCard == 1) id = 'firstPlayerWarning';
    else id = 'secondPlayerWarning';

    let obj = document.getElementById(id);

    let keyFrames = [
        { transform: 'translateY(0px)' },
        { transform: 'translateY(-100px)' }
    ];

    let timing = {
        duration: 300,
        iterations: 1,
        easing: 'ease-out'
    };

    let animations = obj.animate(keyFrames, timing);

    animations.onfinish = () => { obj.style.marginTop = '-100px'; }
}

const moveDown = (playerCard) => {
    let id;

    if (playerCard == 1) id = 'firstPlayerWarning';
    else id = 'secondPlayerWarning';

    let obj = document.getElementById(id);

    if (obj.style.marginTop === '0px')
        return;

    let keyFrames = [
        { transform: 'translateY(0px)' },
        { transform: 'translateY(100px)' }
    ];

    let timing = {
        duration: 300,
        iterations: 1,
        easing: 'ease-out'
    };

    let animations = obj.animate(keyFrames, timing);

    animations.onfinish = () => { obj.style.marginTop = '0px'; }
}
