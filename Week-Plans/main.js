const startDaysOfWeek = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let daysOBJ = document.getElementsByClassName('title');

    for (let i = 0; i < daysOBJ.length; i++) 
        daysOBJ[i].innerText = days[i]; 
}

startDaysOfWeek();