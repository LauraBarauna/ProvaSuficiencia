const tabela = document.getElementById("tabela");
const paginacao = document.getElementById("paginacao");
const info = document.getElementById("info");

let paginaAtual = 1;
const itensPorPagina = 5;

const tabelaVazia = () => {
    const alerta = document.createElement("div");
    alerta.classList.add("alerta-vazio");

    alerta.innerHTML = `
        <strong>Lista vazia</strong>
        <span>Nenhum colaborador cadastrado no momento.</span>
    `;

    info.appendChild(alerta);
}

const popularTabela = (colabs) => {
    const conteudoTabela = document.getElementById("body-tabela");
    let htmlFinal = '';

    if (colabs.length === 0) {
        tabelaVazia();
        return;
    }

    for (let i = 0; i < colabs.length; i++) {
        htmlFinal += `
            <tr>
                <td>${colabs[i].id}</td>
                <td>${colabs[i].name}</td>
                <td>${colabs[i].salary}</td>
                <td>${colabs[i].age}</td>
            </tr>
        `
    }

    tabela.classList.remove("hidden");
    paginacao.classList.remove("hidden");
    conteudoTabela.innerHTML = htmlFinal;
}

const aplicarPaginacao = (dados) => {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;

    const dadosPagina = dados.slice(inicio, fim);

    popularTabela(dadosPagina);
    atualizarInfoPagina(dados.length);
};

const getColaboradores = async () => {
    try {
        let dados = JSON.parse(localStorage.getItem("colabs"));

        if (!dados) {
            const res = await fetch(`https://69a37967611ecf5bfc22e438.mockapi.io/lauravbarauna/provasuficiencia/employees`);
            dados = await res.json();

            localStorage.setItem("colabs", JSON.stringify(dados));
        }

        aplicarPaginacao(dados);
    } catch (error) {
        console.error(error);
    }
};

const atualizarInfoPagina = (totalItens) => {
    const totalPaginas = Math.ceil(totalItens / itensPorPagina);

    document.getElementById("infoPagina").textContent =
        `Página ${paginaAtual} de ${totalPaginas}`;

    document.getElementById("anterior").disabled = paginaAtual === 1;
    document.getElementById("proxima").disabled = paginaAtual === totalPaginas;
};

document.getElementById("anterior").addEventListener("click", () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        getColaboradores();
    }
});

document.getElementById("proxima").addEventListener("click", () => {
    paginaAtual++;
    getColaboradores();
});

getColaboradores();