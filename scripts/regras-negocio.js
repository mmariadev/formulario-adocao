let cpfCadastrados = ["12345678900", "98765432100", "11122233344"];

document.getElementById("formulario.Adocao").addEventListener("submit", function(event) {

    let idade = parseInt(document.getElementById("idade").value);
    if (idade < 18) {
        alert("Desculpe, você deve ser maior de 18 anos para adotar um pet.");
        event.preventDefault();
        return;
    }

    let telefone = document.getElementById("telefone").value;
    let telefoneRegex = /^\(\d{2}\)\s9\d{4}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
        alert("Desculpe, o telefone deve estar no formato (xx) 9xxxx-xxxx");
        event.preventDefault();
        return;
    }

    console.log("motivo[" + document.getElementById("motivo").value + "]");
    let motivo = document.getElementById("motivo").value;
    let