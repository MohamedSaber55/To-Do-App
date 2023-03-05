let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let tasksDiv = document.querySelector('.tasks');





let arrayOfTasks = [];
getDataFromLocalStorage();

if (localStorage.getItem('tasks')) {
    arrayOfTasks = JSON.parse(localStorage.getItem('tasks'))
}

submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    }
}

tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        deleteTask(e.target.parentElement.getAttribute("data-id"));
    }
    if (e.target.classList.contains("task")) {
        toggleTaskStatus(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done")
    }
})


function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    arrayOfTasks.push(task);
    addTasksToPage(arrayOfTasks)
    addToLocalStorage(arrayOfTasks);
}

function addTasksToPage(arrayOfTasks) {
    tasksDiv.innerHTML = "";
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "delete";
        span.appendChild(document.createTextNode("DELETE"))
        div.appendChild(span);
        tasksDiv.appendChild(div);
        if (task.completed) {
            div.className = "task done";
        }
    });
}

function addToLocalStorage(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addTasksToPage(tasks);
    }
}


function deleteTask(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addToLocalStorage(arrayOfTasks);
}

function toggleTaskStatus(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
        }
    }
    addToLocalStorage(arrayOfTasks);
}