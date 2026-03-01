
const colabs = []

const popularTabela = () => {
    const table = document.getElementById("body-tabela");
    let htmlFinal = '';

    for (let i = 0; i < colabs.length; i++) {
        htmlFinal += `
            <td>${colabs[i].id}</td>
                <td>${colabs[i].name}</td>
                <td>${colabs[i].salary}</td>
                <td>${colabs[i].age}</td>
            </tr>
        `
    }

    table.innerHTML = htmlFinal;
}


const getColaboradores = async () => {
    try {
        const res = await fetch("https://69a37967611ecf5bfc22e438.mockapi.io/lauravbarauna/provasuficiencia/employees");

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        colabs.push(...data);

        console.log("Array atualizado:", colabs);
        popularTabela();

    } catch (error) {
        console.error("Fetch error:", error);
    }
};

getColaboradores();
