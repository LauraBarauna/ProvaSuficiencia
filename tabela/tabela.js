
const colabs = [
    {
        id: 12,
        nome: 'Laura',
        salario: 1500,
        idade: 20
    },
    {
        id: 20,
        nome: 'Isabela',
        salario: 500,
        idade: 24
    }
]

const populateTable = () => {

    const table = document.getElementById("tabela");
    let htmlFinal = `
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Salário</th>
                <th>Idade</th>
            </tr>
    `

    for (let i = 0; i < colabs.length; i++) {
        htmlFinal += `
            <td>${colabs[i].id}</td>
                <td>${colabs[i].nome}</td>
                <td>${colabs[i].salario}</td>
                <td>${colabs[i].idade}</td>
            </tr>
        `
    }

    table.innerHTML = htmlFinal;

}

populateTable()

const getColab = () => {

    fetch("https://dummy.restapiexample.com/api/v1/employees")
        .then(res => {
            if (!res) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            return res;
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        })

}

getColab();
