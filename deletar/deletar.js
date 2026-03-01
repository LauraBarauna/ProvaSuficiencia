const form = document.getElementById("myForm");
const id = document.getElementById("idParaRemover");

const modal = document.getElementById("modal");
const textoModal = document.getElementById("frase-modal");
const fecharModal = document.getElementById("fecharModal");

const abrirModal = (frase) => {
    textoModal.textContent = frase;
    modal.classList.remove("hidden");
    recarregarForm();
};

const fechar = () => {
    modal.classList.add("hidden");
};

const recarregarForm = () => {
    id.value = "";
}

const removerColab = async () => {
    try {
        const res = await fetch(`https://69a37967611ecf5bfc22e438.mockapi.io/lauravbarauna/provasuficiencia/employees/${id.value}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            if (res.status = 404) {
                abrirModal(`Colab com id ${id.value} não encontrado!`);
            }
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        let cache = JSON.parse(localStorage.getItem("colabs")) || [];
        cache = cache.filter(colab => colab.id !== id.value);
        localStorage.setItem("colabs", JSON.stringify(cache));
        abrirModal(`Colab com id ${id.value} deletado com sucesso!`);
        console.log(`Colab com id ${id.value} deletado!`);
    } catch (error) {
        console.error(`Erro ao deletar colab com id ${id.value}: ${error}`);
    }

}

const formValido = () => {
    if (!id.value.trim()) {
        abrirModal("Informe um ID para remover.");
        return false;
    }
    return true;
};

form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!formValido()) {
        return;
    }

    removerColab();
})

fecharModal.addEventListener("click", fechar);