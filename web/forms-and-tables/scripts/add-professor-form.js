// @ts-check

import { genId } from "./utils/gen-id.js";

(() => {
  const $addForm = /** @type {HTMLFormElement|null} */ (
    document.forms["add-professor"]
  );

  if ($addForm === null) {
    return;
  }

  $addForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData($addForm);

    /** @type {import("./professors-table.js").Professor} */
    const newProfessor = {
      id: genId(),
      name: data.get("username")?.toString() ?? "",
      document: data.get("document")?.toString() ?? "",
      email: data.get("email")?.toString() ?? "",
      contact_email: data.get("contact_email")?.toString() ?? "",
    };

    const currentProfessors = localStorage.getItem("professors");

    /**
     * @type {import("./professors-table.js").Professor[]}
     */
    const professors =
      currentProfessors === null ? [] : JSON.parse(currentProfessors);

    professors.push(newProfessor);

    localStorage.setItem("professors", JSON.stringify(professors));

    location.href = "./index.html";
  });
})();
