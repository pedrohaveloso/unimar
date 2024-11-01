// @ts-check

const html = String.raw;

/**
 * @type {Object<string, any>}
 */
const bootstrap = window["bootstrap"];

const $form =
  /** @type {HTMLFormElement} */
  (document.querySelector("#task-form"));

const fields = {
  $id:  /** @type {HTMLInputElement} */
    (document.querySelector('#task-id')),

  $name: /** @type {HTMLInputElement} */
    (document.querySelector('#name')),

  $description: /** @type {HTMLInputElement} */
    (document.querySelector('#description')),

  $status: /** @type {HTMLInputElement} */
    (document.querySelector('#status')),

  $limitDate: /** @type {HTMLInputElement} */
    (document.querySelector('#limit-date')),
}

let tasks = [];

const $taskModal = new bootstrap.Modal(document.querySelector('#task-modal'));

function loadTasks() {
  fetch('api.php?action=list')
    .then(response => response.json())
    .then(data => {
      tasks = data;
      renderTasks();
    });
}

function renderTasks() {
  const $taskList = document.querySelector('#task-list');

  if (!$taskList) {
    return;
  }

  $taskList.innerHTML = '';

  tasks.forEach(task => {
    const statusMap = {
      'pending': 'Pendente',
      'running': 'Em Andamento',
      'completed': 'Concluída'
    };

    $taskList.innerHTML += html`
      <tr>
        <td>${task.name}</td>
        <td>${task.description}</td>
        <td>${statusMap[task.status]}</td>
        <td>${new Date(task.limit_date).toLocaleDateString('pt-BR')}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editTask(${task.id})">
            Editar
          </button>
          
          <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">
            Excluir
          </button>
        </td>
      </tr>
  `;
  });
}

function saveTask() {
  const data = {
    name: fields.$name.value,
    description: fields.$description.value,
    status: fields.$status.value,
    limit_date: fields.$limitDate.value
  };

  const action = fields.$id.value ? 'update' : 'create';

  if (fields.$id.value) {
    data.id = fields.$id.value;
  }

  fetch(`api.php?action=${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(() => {
      loadTasks();
      $taskModal.hide();
      resetForm();
    });
}

const $saveTaskButton = document.querySelector("#save-task-button");

$saveTaskButton?.addEventListener("click", saveTask);

/**
 * @param {number} id 
 */
function editTask(id) {
  const task = tasks.find(t => t.id === id);

  fields.$id.value = task.id;
  fields.$name.value = task.name;
  fields.$description.value = task.description;
  fields.$status.value = task.status;
  fields.$limitDate.value = task.limit_date;

  $taskModal.show();
}

/**
 * @param {number} id 
 */
function deleteTask(id) {
  if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
    fetch(`api.php?action=delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then(response => response.json())
      .then(() => loadTasks());
  }
}

function resetForm() {
  $form.reset();
  fields.$taskId.value = '';
}

document.addEventListener('DOMContentLoaded', loadTasks);