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

const adicionarColab = async () => {
    try {
        const res = await fetch("https://69a37967611ecf5bfc22e438.mockapi.io/lauravbarauna/provasuficiencia/employees", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nome.value,
                salary: Number(salario.value),
                age: Number(idade.value),
            })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Colab criado com sucesso! ", data);

        const cache = JSON.parse(localStorage.getItem("colabs")) || [];
        cache.push(data);
        localStorage.setItem("colabs", JSON.stringify(cache));

        recarregarForm();
        abrirModal();
    } catch (error) {
        console.error(`Erro ao criar colab: ${error}`);
    }
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!formValido()) {
        return;
    }

    adicionarColab();
})

fecharModal.addEventListener("click", fechar);
