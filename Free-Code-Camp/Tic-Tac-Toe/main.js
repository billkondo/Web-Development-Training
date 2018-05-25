document.getElementById('ONE').onclick = () => {
    let currentWindow = document.getElementById('start-menu');
    let nextWindow = document.getElementById('decision-menu');

    nextWindow.querySelector('#question').innerHTML = "Would you like to play with X or O ?"
    fadeOut(currentWindow, nextWindow);
}

document.getElementById('backButton').onclick = () => {
    let currentWindow = document.getElementById('decision-menu');
    let nextWindow = document.getElementById('start-menu');

    fadeOut(currentWindow, nextWindow);
}

document.getElementById('TWO').onclick = () => {
    let currentWindow = document.getElementById('start-menu');
    let nextWindow = document.getElementById('decision-menu');

    nextWindow.querySelector('#question').innerHTML = "Player 1," + "<br>" + "would you like to play with X or O ?"
    fadeOut(currentWindow, nextWindow);
}

document.getElementById('choiceX').onclick = () => {
    let player = 1;

    let text = document.getElementById('decision-menu').querySelector('#question').innerText;
    let flag = (text[0] === 'P') ? false : true;
    
    let currentWindow = document.getElementById('decision-menu');
    let nextWindow = document.getElementById('game-menu');

    fadeOut(currentWindow, nextWindow);
    ticTacToeGame(player, flag);
}

document.getElementById('choiceO').onclick = () => {
    let player = 0;

    let text = document.getElementById('decision-menu').querySelector('#question').innerText;
    let flag = (text[0] === 'P') ? false : true;
    
    let currentWindow = document.getElementById('decision-menu');
    let nextWindow = document.getElementById('game-menu');

    fadeOut(currentWindow, nextWindow);
    ticTacToeGame(player, flag);
}

const ticTacToeGame = (player, flag) => {
}

const fadeOut = (obj, nx) => {
    obj.style.opacity = 1.0;
  
    const fade = setInterval(() => {
        if (obj.style.opacity < 0.1) {
            obj.style.display = "none";
            clearInterval(fade);

            if(!!nx) fadeIn(nx);
            
        }
        obj.style.opacity -= 0.2;
    }, 100);
}

const fadeIn = (obj, nx) => {
    obj.style.display = "block";
    obj.style.opacity = 0.0;

    const fade = setInterval(() => {
        if (obj.style.opacity > 0.9) {
            clearInterval(fade);
        }
        obj.style.opacity -= -0.2;
    }, 100);
}
