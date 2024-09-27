// @ts-check

import { genId } from "./utils/gen-id.js";

/**
 * @typedef {{
 *    id:string; name:string; document:string; email:string;
 *    contact_email:string
 * }} Professor
 */

(() => {
  const $professorsTable = document.querySelector("#professors-table");

  if ($professorsTable === null) return;

  $professorsTable.innerHTML = getProfessors()
    .map((professor) => {
      return `
        <tr>
          <td data-label="Registro">${professor["id"]}</td>
          <td data-label="Nome completo">${professor["name"]}</td>
          <td data-label="CPF">${professor["document"]}</td>
          <td data-label="E-mail institucional">${professor["email"]}</td>
          <td data-label="E-mail de contato">${professor["contact_email"]}</td>
          <td data-label="Ações">
            <a href="#">Alterar</a>
            <a href="#">Excluir</a>
          </td>
        </tr>
      `;
    })
    .join("");

  /** @return {Professor[]} */
  function getProfessors() {
    const professors = localStorage.getItem("professors");

    if (professors !== null) {
      return /** @type {Professor[]} */ (JSON.parse(professors));
    }

    localStorage.setItem(
      "professors",
      JSON.stringify(__initialProfessorsList())
    );

    return __initialProfessorsList();
  }
})();

/**
 * @todo temporário
 */
function __initialProfessorsList() {
  return [
    {
      id: genId(),
      name: "Ana Clara Souza",
      document: "123.456.789-00",
      email: "ana.souza@universidade.edu",
      contact_email: "ana.souza@gmail.com",
    },
    {
      id: genId(),
      name: "Bruno Lima Oliveira",
      document: "234.567.890-11",
      email: "bruno.oliveira@universidade.edu",
      contact_email: "bruno.lima@hotmail.com",
    },
    {
      id: genId(),
      name: "Carlos Eduardo Santos",
      document: "345.678.901-22",
      email: "carlos.santos@universidade.edu",
      contact_email: "carlosedu@outlook.com",
    },
    {
      id: genId(),
      name: "Daniela Fernandes Costa",
      document: "456.789.012-33",
      email: "daniela.costa@universidade.edu",
      contact_email: "dani.costa@gmail.com",
    },
    {
      id: genId(),
      name: "Eduardo Pereira Silva",
      document: "567.890.123-44",
      email: "eduardo.silva@universidade.edu",
      contact_email: "eduardop@hotmail.com",
    },
  ];
}
