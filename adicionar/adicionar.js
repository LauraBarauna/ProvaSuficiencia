const form = document.getElementById("myForm");
const nome = document.getElementById("nomeInput")
const salario = document.getElementById("salarioInput")
const idade = document.getElementById("idadeInput")

const modal = document.getElementById("modalErro");
const fecharModal = document.getElementById("fecharModal");

const abrirModal = () => {
    modal.classList.remove("hidden");
};

const fechar = () => {
    modal.classList.add("hidden");
};

const recarregarForm = () => {
    nome.value = "";
    salario.value = "";
    idade.value = "";
}

const formValido = () => {
    return nome.value.trim() !== "" && salario.value.trim() !== "" && idade.value.trim() !== "";
}

const adicionarColab = (nome, salario, idade) => {
    fetch("https://69a37967611ecf5bfc22e438.mockapi.io/lauravbarauna/provasuficiencia/employees", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nome,
            salary: Number(salario),
            age: Number(idade),
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Erro na requisição.");
        return res.json();
    })
    .then(data => {
        console.log("Sucesso: ", data);
        recarregarForm();
        abrirModal();
    })
    .catch(err => console.error("Erro ao salvar:", err));
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!formValido()) {
        return;
    }
    
    adicionarColab(nome.value, salario.value, idade.value);
})

fecharModal.addEventListener("click", fechar);
