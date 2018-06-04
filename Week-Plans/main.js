const startDaysOfWeek = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let daysOBJ = document.getElementsByClassName('title');

    for (let i = 0; i < daysOBJ.length; i++)
        daysOBJ[i].innerText = days[i];
}

startDaysOfWeek();

let objBeingDragged = null;
let isMouseDown = false;
let mouseOffSet = { x: 0, y: 0 };

const onMouseDown = (e) => {
    e.preventDefault();
    console.log('mouseDown');
    console.log(e.target);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    isMouseDown = true;
    objBeingDragged = e.target;
    objBeingDragged.style.opacity = "0.5";
    mouseOffset = { x: objBeingDragged.offsetLeft - e.clientX, y: objBeingDragged.offsetTop - e.clientY };
}

const onMouseUp = (e) => {
    console.log('mouseUp');
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    isMouseDown = false;
    objBeingDragged.style.opacity = "1.0";
    objBeingDragged = null;
}

const onMouseMove = (e) => {
    console.log('mouseMove');
    e.preventDefault();
    if (isMouseDown) {
        objBeingDragged.style.left = e.clientX + mouseOffset.x + "px";
        objBeingDragged.style.top = e.clientY + mouseOffset.y + "px";
    }
}

document.getElementById('test').onmousedown = onMouseDown;