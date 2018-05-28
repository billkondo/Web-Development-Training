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
    let player = 1;

    let text = document.getElementById('decision-menu').querySelector('#question').innerText;
    let flag = (text[0] === 'P') ? false : true;

    startGame(flag);
    ticTacToeGame(player, flag);
}

document.getElementById('choiceO').onclick = () => {
    let player = 0;

    let text = document.getElementById('decision-menu').querySelector('#question').innerText;
    let flag = (text[0] === 'P') ? false : true;

    startGame(flag);
    ticTacToeGame(player, flag);
}

const startGame = (flag) => {
    let currentWindow = document.getElementById('decision-menu');
    let nextWindow = document.getElementById('game-menu');

    let nx = [nextWindow];
    let types = ["block"];

    let scores = document.getElementsByClassName('scoreDisplay');

    for (let i = 0; i < scores.length; i++) {
        if (!i)
            scores[i].innerHTML = `Player ${i + 1}` + `<br>` + `${0}`;
        else {
            if (!flag) scores[i].innerHTML = `Player ${i + 1}` + `<br>` + `${0}`;
            else scores[i].innerHTML = `Computer` + `<br>` + `${0}`;
        }
        nx.push(scores[i]);
        types.push("inline-block");
    }

    let resetButton = document.getElementById('resetAll');
    resetButton.innerText = "Reset";

    nx.push(resetButton);
    types.push("inline-block");

    resetBoard();

    fadeOut(currentWindow, nx, types);
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
}

const resetBoard = () => {
    let squares = document.getElementsByClassName('square');

    for (let i = 0; i < squares.length; i++)
        squares[i].innerText = "";
}

const moveUp = (playerCard) => {
    console.log('moveUp');
    let id;

    if (playerCard == 1) id = 'firstPlayerWarning';
    else id = 'secondPlayerWarning';

    let obj = document.getElementById(id);

    let keyFrames = [
        { transform: 'translateY(0px)' },
        { transform: 'translateY(-100px)' }
    ];

    let timing = {
        duration: 650,
        iterations: 1
    };

    let animations = obj.animate(keyFrames, timing);

    animations.onfinish = () => {
        obj.style.marginTop = '-100px';
    }
}

const moveDown = (playerCard) => {
    console.log('moveUp');
    let id;

    if (playerCard == 1) id = 'firstPlayerWarning';
    else id = 'secondPlayerWarning';

    let obj = document.getElementById(id);

    let keyFrames = [
        { transform: 'translateY(0px)' },
        { transform: 'translateY(100px)' }
    ];

    let timing = {
        duration: 650,
        iterations: 1
    };

    let animations = obj.animate(keyFrames, timing);

    animations.onfinish = () => {
        obj.style.marginTop = '0px';
    }
}

moveUp(1);
moveUp(2);

setTimeout(() => {
    moveDown(1);
    moveDown(2);
}, 2000);

const ticTacToeGame = (isFirstPlayerX, isComputerPlaying) => {
    /*
        isFirstPlayer: indicates which symbol first player is using 
        isFirstPlayer = 0: first player is using O
        isFirstPlayer = 1: first player is using X

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

        winnigPosition = [
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

    const play = (round, callback) => {
        let isFirstPlayerTurn = (round % 2 === isFirstPlayerX);

        console.log(`round is ${round}`);
        console.log(isFirstPlayerTurn);

        const winner = checkWinner();

        if (winner >= 0) {
            setTimeout(() => {
                if (winner == 0) {
                    alert('Draw');
                    return;
                }
                else
                    if (winner == 1) {
                        alert('First Player Won !!!');
                        ++firstPlayerScore;
                        return;
                    }
                    else
                        if (winner == 2) {
                            alert('Second Player Won !!!');
                            ++secondPlayerScore;
                            return;
                        }
            }, 1000);


            resetBoard();
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

            let squares = document.getElementsByClassName('square');

            const processClick = (e) => {
                e.target.innerText = currentSymbol;

                for (let i = 0; i < squares.length; i++)
                    squares[i].removeEventListener('click', processClick);

                callback(round + 1, play);
                return;
            }

            for (let i = 0; i < squares.length; i++)
                squares[i].addEventListener('click', processClick);
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
