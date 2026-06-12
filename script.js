const taskInput =
document.getElementById("taskInput");

const dueDate =
document.getElementById("dueDate");

const pendingTasks =
document.getElementById("pendingTasks");

const completedTasks =
document.getElementById("completedTasks");

const themeToggle =
document.getElementById("themeToggle");

/* LOAD TASKS */

window.onload = () => {

    loadTasks();

};

/* ADD TASK */

function addTask(){

    const taskText =
    taskInput.value.trim();

    if(taskText === ""){

        alert("Please enter a task");

        return;
    }

    const task = {

        text: taskText,

        time: new Date().toLocaleString(),

        dueDate: dueDate.value ||

        "No Due Date",

        completed:false
    };

    saveTask(task);

    createTask(task);

    taskInput.value = "";

    dueDate.value = "";
}

/* CREATE TASK */

function createTask(task){

    const li =
    document.createElement("li");

    li.classList.add("task-item");

    const taskContent =
    document.createElement("div");

    taskContent.classList.add("task-content");

    taskContent.innerHTML = `
        <span>${task.text}</span>

        <span class="task-time">
            📅 Due: ${task.dueDate}
        </span>

        <span class="task-time">
            🕒 Added: ${task.time}
        </span>
    `;

    const buttonBox =
    document.createElement("div");

    buttonBox.classList.add("task-buttons");

    /* COMPLETE BUTTON */

    if(!task.completed){

        const completeBtn =
        document.createElement("button");

        completeBtn.textContent = "Complete";

        completeBtn.classList.add("complete-btn");

        completeBtn.onclick = () => {

            li.remove();

            task.completed = true;

            updateTasks();

            createTask(task);
        };

        buttonBox.appendChild(completeBtn);
    }

    /* DELETE BUTTON */

    const deleteBtn =
    document.createElement("button");

    deleteBtn.textContent = "Delete";

    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = () => {

        li.remove();

        deleteTask(task);

    };

    buttonBox.appendChild(deleteBtn);

    li.appendChild(taskContent);

    li.appendChild(buttonBox);

    if(task.completed){

        completedTasks.appendChild(li);
    }

    else{

        pendingTasks.appendChild(li);
    }

}

/* SAVE TASK */

function saveTask(task){

    let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(task);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

/* LOAD TASKS */

function loadTasks(){

    let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {

        createTask(task);

    });

}

/* UPDATE TASKS */

function updateTasks(){

    let tasks = [];

    document
    .querySelectorAll(".task-item")
    .forEach(item => {

        const spans =
        item.querySelectorAll("span");

        const text =
        spans[0].textContent;

        const dueDate =
        spans[1]
        .textContent
        .replace("📅 Due: ","");

        const time =
        spans[2]
        .textContent
        .replace("🕒 Added: ","");

        const completed =
        item.parentElement.id ===
        "completedTasks";

        tasks.push({
            text,
            dueDate,
            time,
            completed
        });

    });

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

/* DELETE TASK */

function deleteTask(task){

    let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.filter(t =>

        !(

            t.text === task.text &&
            t.time === task.time

        )

    );

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

/* THEME TOGGLE */

themeToggle.onclick = () => {

    document.body.classList.toggle(
        "light-mode"
    );

    if(
        document.body.classList.contains(
            "light-mode"
        )
    ){

        themeToggle.innerHTML = "☀️";
    }

    else{

        themeToggle.innerHTML = "🌙";
    }

};