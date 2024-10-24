// Referencias al DOM
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const categorySelect = document.getElementById('category-select');
const categoryLists = document.getElementById('category-lists');
// Referencia al botón de limpiar lista
const clearListBtn = document.getElementById('clear-list-btn');

// Cargar tareas del LocalStorage o inicializar si no hay
let storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};

// Renderizar tareas almacenadas
renderTasks(storedTasks);

// Evento para limpiar la lista de tareas
clearListBtn.addEventListener('click', function () {
  if (confirm('Seguro que quieres borrar todas las tareas?')) {
      // Vaciar el objeto de tareas y localStorage
      storedTasks = {};
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
      
      // Renderizar nuevamente para reflejar los cambios
      renderTasks(storedTasks);
  }
});

// Event listener para agregar tareas
todoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskText = todoInput.value.trim();
    const category = categorySelect.value;

    // Verificar si los campos no están vacíos
    if (taskText === '' || category === '') {
        alert("Porfavor ingreas una tarea y selecciona una categoría.");
        return;
    }

    // Asegurarse de que la categoría tenga un array
    if (!Array.isArray(storedTasks[category])) {
        storedTasks[category] = [];
    }

    // Agregar tarea a la categoría
    storedTasks[category].push({ text: taskText, completed: false });

    // Guardar en LocalStorage
    localStorage.setItem('tasks', JSON.stringify(storedTasks));

    // Renderizar tareas
    renderTasks(storedTasks);

    // Limpiar el formulario
    todoInput.value = '';
    categorySelect.value = '';
});

// Función para renderizar tareas
function renderTasks(tasks) {
    // Limpiar las listas actuales antes de volver a renderizar
    categoryLists.innerHTML = '';

    // Iterar sobre cada categoría y sus tareas
    Object.keys(tasks).forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category-list');

        const categoryTitle = document.createElement('h4');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        const ul = document.createElement('ul');
        ul.classList.add('todo-list');

        // Verificar que tasks[category] sea un array antes de iterar
        if (Array.isArray(tasks[category])) {
            tasks[category].forEach((task, index) => {
                const li = document.createElement('li');
                li.textContent = task.text;

                if (task.completed) {
                    li.classList.add('completed');
                }

                const actionsDiv = document.createElement('div');
                actionsDiv.classList.add('todo-actions');

                const completeBtn = document.createElement('button');
                completeBtn.textContent = 'Completada';
                completeBtn.addEventListener('click', () => {
                    task.completed = !task.completed;
                    localStorage.setItem('tasks', JSON.stringify(storedTasks));
                    renderTasks(storedTasks);
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Borrar';
                deleteBtn.addEventListener('click', () => {
                    tasks[category].splice(index, 1);
                    if (tasks[category].length === 0) delete tasks[category];
                    localStorage.setItem('tasks', JSON.stringify(storedTasks));
                    renderTasks(storedTasks);
                });

                actionsDiv.appendChild(completeBtn);
                actionsDiv.appendChild(deleteBtn);
                li.appendChild(actionsDiv);
                ul.appendChild(li);
            });
        }

        categoryDiv.appendChild(ul);
        categoryLists.appendChild(categoryDiv);
    });
}
