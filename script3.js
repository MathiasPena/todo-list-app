document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const successMessage = document.getElementById('successMessage');
  
  if (taskInput.value.trim() !== '') {
    // Crear elementos de la tarea
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item todo-item';

    const taskText = document.createElement('span');
    taskText.innerText = taskInput.value;
    taskText.className = 'task-text';

    const actionBtns = document.createElement('div');

    // Botón de editar
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '✏️';
    editBtn.className = 'btn btn-warning btn-sm me-2';
    editBtn.addEventListener('click', () => editTask(taskText));

    // Botón de eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.addEventListener('click', () => deleteTask(listItem));

    // Botón de completar
    const completeBtn = document.createElement('input');
    completeBtn.type = 'checkbox';
    completeBtn.className = 'form-check-input me-2';
    completeBtn.addEventListener('change', () => markComplete(taskText, completeBtn));

    // Añadir botones
    actionBtns.appendChild(completeBtn);
    actionBtns.appendChild(editBtn);
    actionBtns.appendChild(deleteBtn);

    listItem.appendChild(taskText);
    listItem.appendChild(actionBtns);

    taskList.appendChild(listItem);

    // Limpiar el input y mostrar mensaje de éxito
    taskInput.value = '';
    successMessage.style.display = 'block';
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 1500);
  }
}

function editTask(taskText) {
  const newTask = prompt("Edit your task:", taskText.innerText);
  if (newTask && newTask.trim() !== '') {
    taskText.innerText = newTask;
  }
}

function deleteTask(taskItem) {
  taskItem.remove();
}

function markComplete(taskText, completeBtn) {
  if (completeBtn.checked) {
    taskText.classList.add('completed');
  } else {
    taskText.classList.remove('completed');
  }
}
