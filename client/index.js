document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
});

// Botões de excluir e editar
document
  .querySelector("table tbody")
  .addEventListener("click", function (event) {
    if (event.target.className === "btnExcluir") {
      excluirItem(event.target.dataset.id);
    }
    if (event.target.className === "btnEditar") {
      editarItem(event.target.dataset.id);
    }
  });

// Importando os botões de atualização e procura
const btnAtualizar = document.querySelector("#btnAtualizar");
const btnProcurar = document.querySelector("#btnProcurar");

btnProcurar.onclick = function () {
  const valorProcura = document.querySelector("#inProcurar").value;
  fetch("http://localhost:5000/search/" + valorProcura)
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
};

function excluirItem(id) {
  fetch("http://localhost:5000/delete/" + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
}

function editarItem(id) {
  const colAtualizar = document.querySelector("#colAtualizar");
  colAtualizar.hidden = false;
  document.querySelector("#inAtualizar").dataset.id = id;
}

btnAtualizar.onclick = function () {
  const inAtualizar = document.querySelector("#inAtualizar");
  console.log(inAtualizar);
  fetch("http://localhost:5000/update", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: inAtualizar.dataset.id,
      item: inAtualizar.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
};

// Importando o botão de adicionar
const addBtn = document.querySelector("#btnAdicionar");

addBtn.onclick = function () {
  const inItem = document.querySelector("#inItem");
  const item = inItem.value;
  inItem.value = "";
  fetch("http://localhost:5000/insert", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ item: item }),
  })
    .then((response) => response.json())
    .then((data) => inserirItem(data["data"]));
};

function inserirItem(data) {
  console.log(data);
  const table = document.querySelector("table tbody");
  const isTableData = table.querySelector(".no-data");
  let tableHtml = "<tr>";

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === "data_Hora") {
        data[key] = new Date(data[key]).toLocaleString();
      }
      tableHtml += `<td>${data[key]}</td>`;
    }
  }

  tableHtml += `<td><button class="btnEditar" data-id=${data.id}>Editar</td>`;
  tableHtml += `<td><button class="btnExcluir" data-id=${data.id}>Excluir</td>`;
  tableHtml += "</tr>";

  if (isTableData) {
    table.innerHTML = tableHtml;
  } else {
    const newRow = table.insertRow();
    newRow.innerHTML = tableHtml;
  }
}

function loadHTMLTable(data) {
  const table = document.querySelector("table tbody");
  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    return;
  }

  // Comunicando a tabela frontend com o banco de dados
  let tableHtml = "";
  data.forEach(function ({ id, item, dataHora }) {
    tableHtml += "<tr>";
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${item}</td>`;
    tableHtml += `<td>${new Date(dataHora).toLocaleString()}</td>`;
    tableHtml += `<td><button class="btnEditar" data-id=${id}>Editar</td>`;
    tableHtml += `<td><button class="btnExcluir" data-id=${id}>Excluir</td>`;
    tableHtml += "</tr>";
  });
  table.innerHTML = tableHtml;
}
