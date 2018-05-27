document.getElementById('ONE').onclick = () => {
    let currentWindow = document.getElementById('start-menu');
    let nextWindow = document.getElementById('decision-menu');

    nextWindow.querySelector('#question').innerHTML = "Would you like to play with X or O ?"
    fadeOut(currentWindow, [nextWindow], ["block"]);
}

document.getElementById('backButton').onclick = () => {
    let currentWindow = document.getElementById('decision-menu');
    let nextWindow = document.getElementById('start-menu');

    fadeOut(currentWindow, [nextWindow], ["block"]);
}

document.getElementById('TWO').onclick = () => {
    let currentWindow = document.getElementById('start-menu');
    let nextWindow = document.getElementById('decision-menu');

    nextWindow.querySelector('#question').innerHTML = "Player 1," + "<br>" + "would you like to play with X or O ?"
    fadeOut(currentWindow, [nextWindow], ["block"]);
}

document.getElementById('choiceX').onclick = () => {
    let player = 1;

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
        if(!i)
            scores[i].innerHTML = `Player ${i + 1}` + `<br>` + `${0}`;
        else {
            if(!flag) scores[i].innerHTML = `Player ${i + 1}` + `<br>` + `${0}`;
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

document.getElementById('choiceO').onclick = () => {
    let player = 0;

    let text = document.getElementById('decision-menu').querySelector('#question').innerText;
    let flag = (text[0] === 'P') ? false : true;

    startGame(flag);
    ticTacToeGame(player, flag);
}

document.getElementById('resetAll').onclick = () => {
    let currentWindow = document.getElementById('game-menu');
    let nextWindow = document.getElementById('start-menu');

    let scores = document.getElementsByClassName('scoreDisplay');
    let resetButton = document.getElementById('resetAll');

    objs = [];
    objs.push(currentWindow);
    for(let i = 0; i < scores.length; i++) objs.push(scores[i]);
    objs.push(resetButton);

    for(let i = 0; i < objs.length; i++)
        if(i != objs.length - 1) 
            fadeOut(objs[i]);
        else
            fadeOut(objs[i], [nextWindow], ["block"]);
}

const resetBoard = () => {
    let squares = document.getElementsByClassName('square');

    for (let i = 0; i < squares.length; i++)
        squares[i].innerText = "";
}

const ticTacToeGame = (player, flag) => {
    let myScore = 0;
    let otherScore = 0;


}

const fadeOut = (obj, nx, typeDisplay) => {
    obj.style.opacity = 1.0;

    const fade = setInterval(() => {
        if (obj.style.opacity < 0.1) {
            obj.style.display = "none";
            clearInterval(fade);

            if(!!nx) {
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
