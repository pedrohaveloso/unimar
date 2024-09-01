// @ts-check

(async () => {
  const $professorsTable = document.querySelector("#professors-table");

  if ($professorsTable === null) return;

  $professorsTable.innerHTML = (await getProfessors())
    .map((professor) => {
      return `
        <tr>
          <td>${professor["id"]}</td>
          <td>${professor["name"]}</td>
          <td>${professor["document"]}</td>
          <td>${professor["email"]}</td>
          <td>${professor["contact_email"]}</td>
          <td>
            <a href="#">Alterar</a>
            <a href="#">Excluir</a>
          </td>
        </tr>
      `;
    })
    .join("");

  /**
   * @typedef {{
   *    id:string; name:string; document:string; email:string;
   *    contact_email:string
   * }} Professor
   */

  /** @return {Promise<Professor[]>} */
  async function getProfessors() {
    // poderia ser um fetch, hein... mas só um [object] bruto:

    return [
      {
        id: "001",
        name: "Ana Clara Souza",
        document: "123.456.789-00",
        email: "ana.souza@universidade.edu",
        contact_email: "ana.souza@gmail.com",
      },
      {
        id: "002",
        name: "Bruno Lima Oliveira",
        document: "234.567.890-11",
        email: "bruno.oliveira@universidade.edu",
        contact_email: "bruno.lima@hotmail.com",
      },
      {
        id: "003",
        name: "Carlos Eduardo Santos",
        document: "345.678.901-22",
        email: "carlos.santos@universidade.edu",
        contact_email: "carlosedu@outlook.com",
      },
      {
        id: "004",
        name: "Daniela Fernandes Costa",
        document: "456.789.012-33",
        email: "daniela.costa@universidade.edu",
        contact_email: "dani.costa@gmail.com",
      },
      {
        id: "005",
        name: "Eduardo Pereira Silva",
        document: "567.890.123-44",
        email: "eduardo.silva@universidade.edu",
        contact_email: "eduardop@hotmail.com",
      },
      {
        id: "006",
        name: "Fernanda Ribeiro Alves",
        document: "678.901.234-55",
        email: "fernanda.alves@universidade.edu",
        contact_email: "fernandarib@outlook.com",
      },
      {
        id: "007",
        name: "Gabriel Martins Sousa",
        document: "789.012.345-66",
        email: "gabriel.sousa@universidade.edu",
        contact_email: "gabrielsousa@gmail.com",
      },
      {
        id: "008",
        name: "Helena Carvalho Rocha",
        document: "890.123.456-77",
        email: "helena.rocha@universidade.edu",
        contact_email: "helena.rocha@hotmail.com",
      },
      {
        id: "009",
        name: "Igor Almeida Mendes",
        document: "901.234.567-88",
        email: "igor.mendes@universidade.edu",
        contact_email: "igor.almeida@outlook.com",
      },
      {
        id: "010",
        name: "Juliana Santos Lima",
        document: "012.345.678-99",
        email: "juliana.lima@universidade.edu",
        contact_email: "julianalima@gmail.com",
      },
      {
        id: "011",
        name: "Lucas Costa Pereira",
        document: "123.456.789-10",
        email: "lucas.pereira@universidade.edu",
        contact_email: "lucasp@hotmail.com",
      },
      {
        id: "012",
        name: "Mariana Silva Lopes",
        document: "234.567.890-21",
        email: "mariana.lopes@universidade.edu",
        contact_email: "mariana.lopes@outlook.com",
      },
      {
        id: "013",
        name: "Nathalia Mendes Ribeiro",
        document: "345.678.901-32",
        email: "nathalia.ribeiro@universidade.edu",
        contact_email: "nathaliam@gmail.com",
      },
      {
        id: "014",
        name: "Otávio Souza Fernandes",
        document: "456.789.012-43",
        email: "otavio.fernandes@universidade.edu",
        contact_email: "otavio.fernandes@hotmail.com",
      },
      {
        id: "015",
        name: "Paula Gonçalves Martins",
        document: "567.890.123-54",
        email: "paula.martins@universidade.edu",
        contact_email: "paulagon@outlook.com",
      },
      {
        id: "016",
        name: "Renato Silva Rocha",
        document: "678.901.234-65",
        email: "renato.rocha@universidade.edu",
        contact_email: "renatorocha@gmail.com",
      },
      {
        id: "017",
        name: "Simone Costa Almeida",
        document: "789.012.345-76",
        email: "simone.almeida@universidade.edu",
        contact_email: "simone.almeida@hotmail.com",
      },
      {
        id: "018",
        name: "Thiago Nunes Moreira",
        document: "890.123.456-87",
        email: "thiago.moreira@universidade.edu",
        contact_email: "thiago.moreira@outlook.com",
      },
      {
        id: "019",
        name: "Viviane Ferreira Lima",
        document: "901.234.567-98",
        email: "viviane.lima@universidade.edu",
        contact_email: "viviane.lima@gmail.com",
      },
      {
        id: "020",
        name: "Wagner Ramos Silva",
        document: "012.345.678-09",
        email: "wagner.silva@universidade.edu",
        contact_email: "wagnersilva@hotmail.com",
      },
    ];
  }
})();
