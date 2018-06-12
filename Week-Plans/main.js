const setTitles = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let daysOBJ = document.getElementsByClassName('title');

  for (let i = 0; i < daysOBJ.length; i++) {
    daysOBJ[i].innerText = days[i];

    let newOption = document.createElement('option');
    newOption.innerText = days[i];
    newOption.value = i;
    newOption.classList.add('modal-select-option');
    document.getElementById('modal-select').appendChild(newOption);
  }
}

const setDaysOfWeek = () => {
  let dayOfWeekObjs = document.getElementsByClassName('dayOfWeek');

  for (let i = 1; i < dayOfWeekObjs.length; i++) {
    for (let j = 0; j < 5; j++) {
      let newNode = document.createElement('div');
      newNode.classList.add('note-empty');
      dayOfWeekObjs[i].appendChild(newNode);
    }
  }
}

setTitles();
setDaysOfWeek();

/* 
  Drag and Drop Functionality 
  Objects need to have the mousedown event in order to drag them.
*/

let objBeingDragged = null;
let parentOfDragged = null;
let isMouseDown = false;
let mouseOffSet = { x: 0, y: 0 };
let savePosition = { x: 0, y: 0 };

let dropZoneObj = null;

const onMouseDown = (e) => {
  e.preventDefault();

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  isMouseDown = true;
  objBeingDragged = e.target;
  objBeingDragged.style.opacity = "0.5";
  mouseOffset = { x: objBeingDragged.offsetLeft - e.clientX, y: objBeingDragged.offsetTop - e.clientY };
  savePosition = { x: objBeingDragged.style.left, y: objBeingDragged.style.top };

  objBeingDragged.classList.add('no-click');

  parentOfDragged = objBeingDragged.parentElement;
}

const onMouseUp = (e) => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);

  objBeingDragged.classList.remove('no-click');

  if (dropZoneObj) {
    parentOfDragged.removeChild(parentOfDragged.childNodes[0]);
    dropZoneObj.appendChild(objBeingDragged);
    resetObj();
  }

  isMouseDown = false;
  objBeingDragged.style.opacity = "1.0";
  objBeingDragged.style.left = savePosition.x;
  objBeingDragged.style.top = savePosition.y;
  objBeingDragged = null;
  parentOfDragged = null;
}

const onMouseMove = (e) => {
  e.preventDefault();
  if (isMouseDown) {
    objBeingDragged.style.left = e.clientX + mouseOffset.x + "px";
    objBeingDragged.style.top = e.clientY + mouseOffset.y + "px";
  }
}

const resetObj = () => {
  if (dropZoneObj) {
    dropZoneObj.style.border = "none";
    dropZoneObj.style.backgroundColor = "beige";
    dropZoneObj = null;
  }
}

const startDragEvents = () => {
  let objNoteEmpty = document.getElementsByClassName('note-empty');

  const onMouseEnter = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    dropZoneObj = e.target;
    dropZoneObj.style.backgroundColor = "lemonchiffon";
    dropZoneObj.style.border = "3px dashed lightcoral";
  }

  const onMouseLeave = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    resetObj();
  }

  for (let i = 0; i < objNoteEmpty.length; i++) {
    note = objNoteEmpty[i];
    note.addEventListener('mouseenter', onMouseEnter);
    note.addEventListener('mouseleave', onMouseLeave);
  }
}

document.getElementById('test').onmousedown = onMouseDown;

startDragEvents();

/* Modal Functionality */

const startModal = () => {
  document.getElementById("addButton").onclick = () => {
    document.getElementById("modal-background").style.display = "block";
  }

  document.getElementById('exitButton').onclick = () => {
    document.getElementById('modal-background').style.display = "none";
  }
}

startModal();

