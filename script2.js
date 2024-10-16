document.getElementById("addTaskBtn").addEventListener("click", function() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById("taskList");
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button onclick="editTask(this)">✏️</button>
                <button onclick="deleteTask(this)">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);

        taskInput.value = ""; // Clear the input field
        document.getElementById("successMessage").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("successMessage").classList.add("hidden");
        }, 2000);
    }
});

function editTask(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.querySelector("span").innerText;
    const newTaskText = prompt("Edit your task:", taskText);
    
    if (newTaskText) {
        li.querySelector("span").innerText = newTaskText;
    }
}

function deleteTask(button) {
    const li = button.parentElement.parentElement;
    li.remove();
}
