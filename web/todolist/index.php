<?php

session_start();

$_SESSION['token'] = random_int(0, PHP_INT_MAX)
  . uniqid()
  . random_int(0, PHP_INT_MAX)
  . time();

?>

<!DOCTYPE html>

<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Gerenciador de tarefas" />

  <title>Gerenciador de tarefas</title>

  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
    crossorigin="anonymous" />

  <link rel="shortcut icon"
    href="https://moodle.unimar.br/theme/image.php/eguru/theme/1730741549/favicon"
    type="image/x-icon">
</head>

<body>
  <script lang="js" id="token-script">
    window["token"] = `<?= $_SESSION['token']; ?>`;
    document.querySelector("#token-script")?.remove();
  </script>

  <div class="container mt-5">
    <h1 class="mb-4">Lista de Tarefas</h1>

    <button class="btn btn-primary mb-3" data-bs-toggle="modal"
      data-bs-target="#task-modal">
      Nova Tarefa
    </button>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Data Limite</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody id="task-list"></tbody>
      </table>
    </div>
  </div>

  <div class="modal fade" id="task-modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Tarefa</h5>

          <button type="button" class="btn-close"
            data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <form id="task-form">
            <input type="hidden" id="task-id" />

            <div class="mb-3">
              <label class="form-label">Nome</label>

              <input type="text" class="form-control" id="name" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Descrição</label>

              <textarea class="form-control" id="description"></textarea>
            </div>

            <div class="mb-3">
              <label class="form-label">Status</label>

              <select class="form-select" id="status">
                <option value="pending">Pendente</option>
                <option value="running">Em Andamento</option>
                <option value="completed">Concluída</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Data Limite</label>

              <input type="date" class="form-control" id="limit-date"
                required />
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary"
            data-bs-dismiss="modal">
            Fechar
          </button>

          <button type="button" class="btn btn-primary" id="save-task-button">
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>

  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>

  <script type="module" src="script.js" defer></script>
</body>

</html>