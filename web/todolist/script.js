// @ts-check

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {'pending' | 'running' | 'completed'} status
 * @property {string} limitDate
 */

/**
 * @typedef {Object} TaskFormData
 * @property {string} [id]
 * @property {string} name
 * @property {string} description
 * @property {Task['status']} status
 * @property {string} limitDate
 */

/**
 * @typedef {Object} DOMElements
 * @property {HTMLFormElement} form
 * @property {HTMLElement} taskList
 * @property {HTMLElement} modal
 * @property {Object} fields
 */

const html = String.raw;

const config = {
  token: /** @type {string} */ (window["token"]),
  bootstrap: /** @type {Object<string, any>} */ (window["bootstrap"]),
  api: {
    baseUrl: "api.php",
    headers: { "Content-Type": "application/json" },
  },
  statusMap: {
    pending: "Pendente",
    running: "Em Andamento",
    completed: "Concluída",
  },
};

const dom = {
  form: /** @type {HTMLFormElement} */ (document.querySelector("#task-form")),
  taskList: document.querySelector("#task-list"),
  modal: document.querySelector("#task-modal"),
  saveButton: document.querySelector("#save-task-button"),
  fields: {
    id: /** @type {HTMLInputElement} */ (document.querySelector("#task-id")),
    name: /** @type {HTMLInputElement} */ (document.querySelector("#name")),
    description: /** @type {HTMLInputElement} */ (
      document.querySelector("#description")
    ),
    status: /** @type {HTMLInputElement} */ (document.querySelector("#status")),
    limitDate: /** @type {HTMLInputElement} */ (
      document.querySelector("#limit-date")
    ),
  },
};

const api = {
  /**
   * @param {string} action
   * @param {Object} options
   * @param {?string} query
   * @return {Promise<any>}
   */
  request: (action, options = {}, query = null) =>
    fetch(
      `${config.api.baseUrl}?action=${action}&token=${config.token}${
        query === null ? "" : `&${query}`
      }`,
      options
    ).then((response) => response.json()),

  /**
   * @return {Promise<Task[]>}
   */
  getTasks: () => api.request("list"),

  /**
   * @param {TaskFormData} data
   * @return {Promise<Task>}
   */
  createTask: (data) =>
    api.request("create", {
      method: "POST",
      headers: config.api.headers,
      body: JSON.stringify(data),
    }),

  /**
   * @param {TaskFormData} data
   * @return {Promise<Task>}
   */
  updateTask: (data) =>
    api.request("update", {
      method: "PUT",
      headers: config.api.headers,
      body: JSON.stringify(data),
    }),

  /**
   * @param {number} id
   * @return {Promise<void>}
   */
  deleteTask: (id) =>
    api.request(
      "delete",
      {
        method: "DELETE",
        headers: config.api.headers,
      },
      `id=${id}`
    ),
};

const taskModal = new config.bootstrap.Modal(dom.modal);

const view = {
  /**
   * @param {Task} task
   * @return {string}
   */
  createTaskRow: (task) => html`
    <tr>
      <td>${task.name}</td>
      <td>${task.description}</td>
      <td>${config.statusMap[task.status]}</td>
      <td>${new Date(`${task.limitDate} 00:00:00`).toLocaleDateString()}</td>
      <td>
        <button class="btn btn-sm btn-warning" data-edit-task="${task.id}">
          Editar
        </button>
        <button class="btn btn-sm btn-danger" data-delete-task="${task.id}">
          Excluir
        </button>
      </td>
    </tr>
  `,

  /**
   * @param {Task[]} tasks
   * @return {void}
   */
  renderTasks: (tasks) => {
    if (!dom.taskList) {
      return;
    }

    dom.taskList.innerHTML = tasks.map(view.createTaskRow).join("");
  },

  /**
   * @param {Task} task
   * @return {void}
   */
  fillFormWithTask: (task) => {
    const { fields } = dom;

    fields.id.value = String(task.id);
    fields.name.value = task.name;
    fields.description.value = task.description;
    fields.status.value = task.status;
    fields.limitDate.value = task.limitDate;
  },
};

const state = {
  tasks: /** @type {Task[]} */ ([]),

  /**
   * @param {Task[]} newTasks
   */
  setTasks: (newTasks) => {
    state.tasks = [...newTasks];
    view.renderTasks(state.tasks);
  },
};

const actions = {
  /**
   * @return {Promise<void>}
   */
  loadTasks: () => api.getTasks().then(state.setTasks).catch(console.error),

  /**
   * @return {TaskFormData}
   */
  getFormData: () => ({
    id: dom.fields.id.value,
    name: dom.fields.name.value,
    description: dom.fields.description.value,
    status: /** @type {Task['status']} */ (dom.fields.status.value),
    limitDate: dom.fields.limitDate.value,
  }),

  /**
   * @return {void}
   */
  resetForm: () => {
    dom.form.reset();
    dom.fields.id.value = "";
  },

  /**
   * @return {Promise<void>}
   */
  saveTask: async () => {
    const data = actions.getFormData();
    const saveFunction = data.id ? api.updateTask : api.createTask;

    return saveFunction(data)
      .then(() => {
        actions.loadTasks();
        taskModal.hide();
        actions.resetForm();
      })
      .catch(console.error);
  },

  /**
   * @param {number} id
   * @return {void}
   */
  editTask: (id) => {
    const task = state.tasks.find((t) => t.id == id);
    if (task) {
      view.fillFormWithTask(task);
      taskModal.show();
    }
  },

  /**
   * @param {number} id
   * @return {Promise<void>}
   */
  deleteTask: (id) =>
    confirm("Tem certeza que deseja excluir esta tarefa?")
      ? api.deleteTask(id).then(actions.loadTasks)
      : Promise.resolve(),
};

const bindEvents = () => {
  document.addEventListener("DOMContentLoaded", actions.loadTasks);

  dom.modal?.addEventListener("hidden.bs.modal", actions.resetForm);
  dom.saveButton?.addEventListener("click", actions.saveTask);

  dom.taskList?.addEventListener("click", (event) => {
    const target = /** @type {HTMLElement} */ (event.target);

    const editId = target.getAttribute("data-edit-task");
    const deleteId = target.getAttribute("data-delete-task");

    if (editId) actions.editTask(Number(editId));
    if (deleteId) actions.deleteTask(Number(deleteId));
  });
};

(() => bindEvents())();
