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
    
    let currentWindow = document.getElementById('decision-menu');
    let nextWindow = document.getElementById('game-menu');

    fadeOut(currentWindow, nextWindow, "block");
    ticTacToeGame(player, flag);
}

document.getElementById('choiceO').onclick = () => {
    let player = 0;

    let text = document.getElementById('decision-menu').querySelector('#question').innerText;
    let flag = (text[0] === 'P') ? false : true;
    
    let currentWindow = document.getElementById('decision-menu');
    let nextWindow = document.getElementById('game-menu');

    let nx = [nextWindow];
    let types = ["block"];

    /*
        Prepare the Board
    */

    let scores = document.getElementsByClassName('scoreDisplay');
    for(let i = 0; i < scores.length; i++) {
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
    ticTacToeGame(player, flag);
}

const resetBoard = () => {
    let squares = document.getElementsByClassName('square');

    for(let i = 0; i < squares.length; i++) 
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
            
            for(let i = 0; i < nx.length; i++)
                fadeIn(nx[i], typeDisplay[i]);
        }
        obj.style.opacity -= 0.2;
    }, 100);
}

const fadeIn = (obj, typeDisplay) => {
    obj.style.opacity = 0.0;
    obj.style.display = typeDisplay;

    console.log(obj);
    console.log(typeDisplay);

    const fade = setInterval(() => {
        if (obj.style.opacity > 0.9) {
            clearInterval(fade);
        }
        obj.style.opacity -= -0.2;
    }, 100);
}
