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

const ticTacToeGame = () => {

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
