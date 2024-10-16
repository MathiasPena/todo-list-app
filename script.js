// Obtener elementos del DOM
const taskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const filterAll = document.getElementById("filter-all");
const filterCompleted = document.getElementById("filter-completed");
const filterPending = document.getElementById("filter-pending");

// Cargar tareas desde Local Storage
document.addEventListener("DOMContentLoaded", loadTasks);

// Agregar tarea
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Filtrar tareas
filterAll.addEventListener("click", () => filterTasks("all"));
filterCompleted.addEventListener("click", () => filterTasks("completed"));
filterPending.addEventListener("click", () => filterTasks("pending"));

// Función para añadir tarea
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Por favor, ingrese una tarea.");
        return;
    }

    // Crear elemento de tarea
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    // Botón para marcar tarea como completada
    const completeButton = document.createElement("button");
    completeButton.textContent = "✓";
    completeButton.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
        saveTasks();
    });

    // Botón para eliminar tarea
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "✗";
    deleteButton.addEventListener("click", () => {
        taskList.removeChild(taskItem);
        saveTasks();
    });

    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
    taskInput.value = ""; // Limpiar el campo de entrada
    saveTasks(); // Guardar tareas en Local Storage
}

// Función para guardar tareas en Local Storage
function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll("li");
    taskItems.forEach(item => {
        tasks.push({
            text: item.childNodes[0].textContent,
            completed: item.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Función para cargar tareas desde Local Storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.textContent = task.text;

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = "✓";
        completeButton.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            saveTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "✗";
        deleteButton.addEventListener("click", () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

// Función para filtrar tareas
function filterTasks(status) {
    const taskItems = document.querySelectorAll("li");
    taskItems.forEach(item => {
        const isCompleted = item.classList.contains("completed");
        if (status === "all" || (status === "completed" && isCompleted) || (status === "pending" && !isCompleted)) {
            item.style.display = "flex"; // Mostrar tarea
        } else {
            item.style.display = "none"; // Ocultar tarea
        }
    });
}
