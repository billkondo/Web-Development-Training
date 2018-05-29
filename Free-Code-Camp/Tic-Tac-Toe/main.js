document.getElementById('ONE').onclick = () => {
    let currentWindow = document.getElementById('start-menu');
    let nextWindow = document.getElementById('decision-menu');

    nextWindow.querySelector('#question').innerHTML = "Would you like to play with X or O ?"
    fadeOut(currentWindow, [nextWindow], ["block"]);
}

document.getElementById('TWO').onclick = () => {
    let currentWindow = document.getElementById('start-menu');
    let nextWindow = document.getElementById('decision-menu');

    nextWindow.querySelector('#question').innerHTML = "Player 1," + "<br>" + "would you like to play with X or O ?"
    fadeOut(currentWindow, [nextWindow], ["block"]);
}

document.getElementById('backButton').onclick = () => {
    let currentWindow = document.getElementById('decision-menu');
    let nextWindow = document.getElementById('start-menu');

    fadeOut(currentWindow, [nextWindow], ["block"]);
}

document.getElementById('choiceX').onclick = () => {
    let isFirstPlayerX = 1;

    let text = document.getElementById('decision-menu').querySelector('#question').innerText;
    let isComputerPlaying = (text[0] === 'P') ? false : true;

    prepareGame(isComputerPlaying);

    setTimeout(() => {
        ticTacToeGame(isFirstPlayerX, isComputerPlaying);
    }, 2000);
}

document.getElementById('choiceO').onclick = () => {
    let isFirstPlayerX = 0;

    let text = document.getElementById('decision-menu').querySelector('#question').innerText;
    let isComputerPlaying = (text[0] === 'P') ? false : true;

    prepareGame(isComputerPlaying);

    setTimeout(() => {
        ticTacToeGame(isFirstPlayerX, isComputerPlaying);
    }, 2000);
}

const prepareGame = (isComputerPlaying) => {
    let currentWindow = document.getElementById('decision-menu');
    let nextWindow = document.getElementById('game-menu');

    let nx = [nextWindow];
    let types = ["block"];

    let scores = document.getElementsByClassName('scoreDisplay');

    for (let i = 0; i < scores.length; i++) {
        if (isComputerPlaying) {
            if (!i) scores[i].innerHTML = `Your Score` + `<br>` + `${0}`;
            else scores[i].innerHTML = `Computer's Score` + `<br>` + `${0}`;
        }
        else
            scores[i].innerHTML = `Player ${i + 1}` + `<br>` + `${0}`;

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

document.getElementById('resetAll').onclick = () => {
    let currentWindow = document.getElementById('game-menu');
    let nextWindow = document.getElementById('start-menu');

    let scores = document.getElementsByClassName('scoreDisplay');
    let resetButton = document.getElementById('resetAll');

    objs = [];

    objs.push(currentWindow);

    for (let i = 0; i < scores.length; i++)
        objs.push(scores[i]);

    objs.push(resetButton);

    for (let i = 0; i < objs.length; i++)
        if (i != objs.length - 1)
            fadeOut(objs[i]);
        else
            fadeOut(objs[i], [nextWindow], ["block"]);

    moveDown(1);
    moveDown(2);
}

const resetBoard = () => {
    let squares = document.getElementsByClassName('square');

    for (let i = 0; i < squares.length; i++)
        squares[i].innerText = "";
}

const ticTacToeGame = (isFirstPlayerX, isComputerPlaying) => {
    /*
        isFirstPlayerX: indicates which symbol first player is using 
        isFirstPlayerX = 0: first player is using O
        isFirstPlayerX = 1: first player is using X

        isComputerPlaying: indicates if the second player is human or the computer
        isComputerPlaying = 0: the first player is a human
        isComputerPlaying = 1: the second player is the computer

    */

    console.log(`isFirstPlyerX = ${isFirstPlayerX}`);
    console.log(`isComputerPlaying = ${isComputerPlaying}`);

    let firstPlayerScore = 0;
    let secondPlayerScore = 0;

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
        let isFirstPlayerTurn = (round % 2 === isFirstPlayerX);

        // console.log(`round is ${round}`);
        // console.log(isFirstPlayerTurn);

        const winner = checkWinner();

        if (round) {
            if (isFirstPlayerTurn) moveDown(2);
            else moveDown(1);
        }

        if (winner >= 0) {
            console.log('Game Ended');

            let config = findWinningConfig();
            let squares = document.getElementsByClassName('square');

            if (winner) {
                for (let pos of config) {
                    squares[pos].style.backgroundColor = "black";
                    squares[pos].style.color = "lightblue";
                }
            }

            setTimeout(() => {
                if (winner == 0) {
                    alert('Draw');
                }
                else
                    if (winner == 1) {
                        alert('First Player Won !!!');
                        ++firstPlayerScore;
                    }
                    else
                        if (winner == 2) {
                            alert('Second Player Won !!!');
                            ++secondPlayerScore;
                        }

                scoresDisplayOBJs = document.getElementsByClassName('scoreDisplay');
                playerScores = [firstPlayerScore, secondPlayerScore];

                for (let i = 0; i < scoresDisplayOBJs.length; i++)
                    if (isComputerPlaying) {
                        if (!i) scoresDisplayOBJs[i].innerHTML = `Your Score` + `<br>` + `${playerScores[i]}`;
                        else scoresDisplayOBJs[i].innerHTML = `Computer's Score` + `<br>` + `${playerScores[i]}`;
                    }
                    else
                        scoresDisplayOBJs[i].innerHTML = `Player ${i + 1}` + `<br>` + `${playerScores[i]}`;
                
                if (winner) {
                    for (let pos of config) {
                        squares[pos].style.backgroundColor = "inherit";
                        squares[pos].style.color = "white";
                    }
                }

                resetBoard();
                callback(0, play);


            }, 2000);

            return;
        }

        if (!isFirstPlayerTurn && isComputerPlaying) {
            if (!round) callback(round + 1, play);
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
            }, 300);

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
        if (obj.style.opacity > 0.9) {
            clearInterval(fade);
        }
        obj.style.opacity -= -0.2;
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
