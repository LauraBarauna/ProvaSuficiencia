const form = document.getElementById("myForm");

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const nome = document.getElementById("nomeInput")
    const salario = document.getElementById("salarioInput")
    const idade = document.getElementById("idadeInput")

    adicionarColab(nome.value, salario.value, idade.value);
})

const adicionarColab = (nome, salario, idade) => {
    fetch("https://dummy.restapiexample.com/api/v1/create", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nome,
            salary: salario,
            age: idade,
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Erro na requisição.");
        return res.json();
    })
    .then(data => {
        console.log("Sucesso: ", data);
    })
    .catch(err => console.error("Erro ao salvar:", err));
}