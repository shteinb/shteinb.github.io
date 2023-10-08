// Array to hold all tasks
let tasks = [];

// Function to add a new subtask input field in the DOM
function addSubtaskField() {
    const subtaskDiv = document.createElement('div');
    subtaskDiv.innerHTML = `
        <input type="text" class="form-control mb-2" placeholder="Subtask">
    `;
    document.getElementById('subtasks').appendChild(subtaskDiv);
}

// Function to add a new task to the tasks array
function addTask() {
    const taskValue = document.getElementById("todoInput").value;
    const taskDate = document.getElementById("todoDate").value;
    const colorValue = document.getElementById("colorSelect").value;

    // Extract subtasks from the DOM
    const subtasksDiv = document.getElementById("subtasks");
    const subtasksInputs = subtasksDiv.querySelectorAll('input');
    
    let subtasks = [];
    subtasksInputs.forEach((input) => {
        if(input.value) {
            subtasks.push({
                text: input.value,
                checked: false
            });
        }
    });

    // Add the main task to the tasks array if it's not empty
    if (taskValue) {
        tasks.push({
            text: taskValue,
            date: taskDate,
            color: colorValue,
            subtasks: subtasks,
            checked: false
        });
    }
    
    renderTasks();  // Render updated tasks
    
    // Reset all input fields
    document.getElementById("todoInput").value = "";
    document.getElementById("todoDate").value = "";
    document.getElementById("colorSelect").value = "Default";
    document.getElementById("subtasks").innerHTML = ""; // Clear subtask inputs
}

// Function to render tasks and subtasks on the screen
function renderTasks() {
    const list = document.getElementById("todoList");
    list.innerHTML = '';
    
    // Loop through tasks array to render each task
    tasks.forEach((task, taskIndex) => {
        const listItem = document.createElement("li");
        listItem.className = `list-group-item ${task.color}`;

        // Create HTML for subtasks
        let subtasksHTML = '';
        task.subtasks.forEach((subtask, index) => {
            subtasksHTML += `
            <div class="d-flex justify-content-between align-items-center mt-2">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="subtask${taskIndex}${index}" ${subtask.checked ? 'checked' : ''} onchange="toggleSubtask(${taskIndex}, ${index})">
                    <label class="form-check-label" for="subtask${taskIndex}${index}">${subtask.text}</label>
                </div>
                <button class="btn btn-danger btn-sm" onclick="deleteSubtask(${taskIndex}, ${index})">Delete</button>
            </div>
            `;
        });

        // Set the HTML content for the list item
        listItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div class="form-check d-flex align-items-center">
                    <input class="form-check-input" type="checkbox" ${task.checked ? 'checked' : ''} onchange="toggleTask(${taskIndex})">
                    <label class="form-check-label me-2" style="margin-left: 0.5rem;">${task.text}</label> 
                    ${task.date ? '<span class="badge bg-secondary me-2">' + task.date + '</span>' : ''}
                </div>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${taskIndex})">Delete</button>
            </div>
            ${subtasksHTML}
        `;

        list.appendChild(listItem);
    });
}

// Function to handle toggling of main task
function toggleTask(index) {
    tasks[index].checked = !tasks[index].checked;
    tasks[index].subtasks.forEach(subtask => subtask.checked = tasks[index].checked); // Synchronize subtask status with main task
    if (tasks[index].checked) celebrateTask();
    renderTasks();
}

// Function to handle toggling of subtasks
function toggleSubtask(taskIndex, subtaskIndex) {
    tasks[taskIndex].subtasks[subtaskIndex].checked = !tasks[taskIndex].subtasks[subtaskIndex].checked;
    renderTasks();
}

// Function to show a short celebration animation when a task is completed
function celebrateTask() {
    const celebrationDiv = document.getElementById('celebration');
    celebrationDiv.style.display = 'block';
    setTimeout(() => {
        celebrationDiv.style.display = 'none';
    }, 3000); 
}

// Function to delete a main task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Function to delete a subtask from a main task
function deleteSubtask(taskIndex, subtaskIndex) {
    tasks[taskIndex].subtasks.splice(subtaskIndex, 1);
    renderTasks();
}
