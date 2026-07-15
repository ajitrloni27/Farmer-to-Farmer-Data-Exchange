let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let list = document.getElementById("taskList");
let counter = document.getElementById("counter");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        if (task.done) li.classList.add("completed");
        let span = document.createElement("span");
        span.innerText = task.text;
        span.onclick = () => {
            tasks[index].done = !tasks[index].done;
            saveTasks();
            renderTasks();
        };
        
        let actions = document.createElement("div");
        actions.className = "actions";
        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.onclick = () => {
            let newTask = prompt("Edit task", task.text);
            if (newTask !== null && newTask.trim() !== "") {
                tasks[index].text = newTask;
                saveTasks();
                renderTasks();
            }
        };
        let delBtn = document.createElement("button");
        delBtn.innerText = "Del";
        delBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };
        actions.appendChild(editBtn);
        actions.appendChild(delBtn);
        li.appendChild(span);
        li.appendChild(actions);
        list.appendChild(li);
    });
    counter.innerText = "Tasks: " + tasks.length;
}
function addTask() {
    if (input.value.trim() === "") return;
    tasks.push({
        text: input.value,
        done: false
    });
    input.value = "";
    saveTasks();
    renderTasks();
}
addBtn.onclick = addTask;
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") addTask();
});
renderTasks();
