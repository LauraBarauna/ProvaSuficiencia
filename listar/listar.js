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


const getColaboradores = async () => {
    try {
        const res = await fetch(`https://69a37967611ecf5bfc22e438.mockapi.io/lauravbarauna/provasuficiencia/employees?page=${paginaAtual}&limit=${itensPorPagina}`);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        console.log("Array atualizado:", data);
        popularTabela(data);
        atualizarInfoPagina(data.length);

    } catch (error) {
        console.error("Fetch error:", error);
    }
};

const atualizarInfoPagina = (quantidadeRetornada) => {
    const info = document.getElementById("infoPagina");
    info.textContent = `Página ${paginaAtual}`;

    console.log('qtd retornada ', quantidadeRetornada)
    console.log('itens por pag ', itensPorPagina)

    if (paginaAtual < 2) {
        document.getElementById("anterior").disabled = true;
    } else {
        document.getElementById("anterior").disabled = false;
    }

    if (quantidadeRetornada < itensPorPagina) {
        document.getElementById("proxima").disabled = true;
    } else {
        document.getElementById("proxima").disabled = false;
    }
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