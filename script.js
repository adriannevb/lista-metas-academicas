let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function render() {
    const todoList = document.querySelector("#todo-list");
    const doneList = document.querySelector("#done-list");

    todoList.innerHTML = "";
    doneList.innerHTML = "";

    tarefas.forEach((t, index) => {
        const item = document.createElement("li");

        item.innerHTML = `
            <div class="top">
                <div>
                    <input type="checkbox" ${t.concluida ? "checked" : ""} data-index="${index}">
                    <span>${t.titulo}</span>
                </div>
                <div class="buttons">
                    <button class="edit" data-index="${index}">Editar</button>
                    <button class="delete" data-index="${index}">Excluir</button>
                </div>
            </div>
            ${t.desc ? `<p class="desc">${t.desc}</p>` : ""}
        `;

        if (t.concluida) {
            doneList.appendChild(item);
        } else {
            todoList.appendChild(item);
        }
    });
}

document.querySelector("#form-add-todo").addEventListener("submit", e => {
    e.preventDefault();

    const titulo = e.target.task.value.trim();
    const desc = e.target.desc.value.trim();

    if (!titulo) {
        alert("A tarefa precisa de um título!");
        return;
    }

    tarefas.push({
        titulo,
        desc,
        concluida: false
    });

    salvar();
    render();

    e.target.task.value = "";
    e.target.desc.value = "";
});

document.addEventListener("click", e => {

    // marcar concluída
    if (e.target.type === "checkbox") {
        const index = e.target.getAttribute("data-index");
        tarefas[index].concluida = e.target.checked;
        salvar();
        render();
    }

    // excluir
    if (e.target.classList.contains("delete")) {
        const index = e.target.getAttribute("data-index");
        tarefas.splice(index, 1);
        salvar();
        render();
    }

    // editar
    if (e.target.classList.contains("edit")) {
        const index = e.target.getAttribute("data-index");
        const novoTitulo = prompt("Novo título:", tarefas[index].titulo);
        const novaDesc = prompt("Nova descrição:", tarefas[index].desc || "");

        if (novoTitulo.trim() !== "") {
            tarefas[index].titulo = novoTitulo;
            tarefas[index].desc = novaDesc;
        }

        salvar();
        render();
    }
});

render();
