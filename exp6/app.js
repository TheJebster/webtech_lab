// DOM elements
const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const counter = document.getElementById("counter");

// State
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// 1. Create a task object
function createTask(text) {
    return {
        id: Date.now(),
        text: text,
        done: false
    };
}

// 2. Add a new task
function addTask(text) {
    tasks.push(createTask(text));
    saveAndRender();
}

// 3. Toggle task completion
function toggleTask(id) {
    tasks = tasks.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
    );
    saveAndRender();
}

// 4. Delete a task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
}

// 5. Save tasks to localStorage and redraw
function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// 6. Count uncompleted tasks
function countOpen() {
    return tasks.filter(t => !t.done).length;
}

// 7. Filter tasks based on current filter
function getVisible() {
    if (currentFilter === "open") return tasks.filter(t => !t.done);
    if (currentFilter === "completed") return tasks.filter(t => t.done);
    return tasks;
}

// 8. Build a DOM list row for a task
function taskItem(t) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = t.done;
    checkbox.addEventListener("change", () => toggleTask(t.id));

    const span = document.createElement("span");
    span.textContent = t.text;
    if (t.done) {
        span.style.textDecoration = "line-through";
        span.style.color = "#888";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => deleteTask(t.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
}

// 9. Render tasks to screen
function renderTasks() {
    list.innerHTML = "";
    getVisible().forEach(t => {
        list.appendChild(taskItem(t));
    });
    counter.textContent = countOpen() + " left";
}

// 10. Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text !== "") {
        addTask(text);
    }
    input.value = "";
}

form.addEventListener("submit", handleSubmit);

// Filter buttons
function setFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
    if (filter === "all") document.getElementById("filterAll").classList.add("active");
    if (filter === "open") document.getElementById("filterOpen").classList.add("active");
    if (filter === "completed") document.getElementById("filterCompleted").classList.add("active");
    renderTasks();
}

document.getElementById("filterAll").addEventListener("click", () => setFilter("all"));
document.getElementById("filterOpen").addEventListener("click", () => setFilter("open"));
document.getElementById("filterCompleted").addEventListener("click", () => setFilter("completed"));

// Initial render
renderTasks();
