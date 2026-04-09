// Simulação de CPFs já cadastrados
const cpfsCadastrados = [
    "123.456.789-00",
    "111.222.333-44"
];


function verificarMoradia() {
    const moradia = document.getElementById("moradia").value;
    const permiteAnimais = document.getElementById("permite_animais");
    const quintal = document.getElementById("tem_quintal");

    if (moradia === "Apartamento") {
        permiteAnimais.style.display = "block";
        quintal.style.display = "none";
    } else if (moradia === "Casa") {
        permiteAnimais.style.display = "none";
        quintal.style.display = "block";
    }
}


function verificarSeTemQuintal() {
    const temQuintal = document.querySelector('input[name="tem_quintal"]:checked');
    const quintalSeguro = document.getElementById("quintal_seguro");

    if (temQuintal && temQuintal.value === "sim") {
        quintalSeguro.style.display = "block";
    } else {
        quintalSeguro.style.display = "none";
    }
}


document.getElementById("formularioAdocao").addEventListener("submit", function (e) {
    e.preventDefault();

    const idade = parseInt(document.getElementById("idade").value);
    const cpf = document.getElementById("CPF").value;
    const telefone = document.getElementById("telefone").value;
    const motivo = document.getElementById("motivo_adoção").value.trim().toLowerCase();
    const concorda = document.getElementById("concorda_termos").checked;
    const horasSozinho = parseInt(document.getElementById("quantas_horas_pet_sozinho").value);
    const jaTevePet = document.querySelector('input[name="ja_teve_pet"]:checked');
    const moradia = document.getElementById("moradia").value;
    const temQuintal = document.querySelector('input[name="tem_quintal"]:checked');

    
    if (idade < 18) {
        alert("Você precisa ter 18 anos ou mais.");
        return;
    }

    
    if (cpfsCadastrados.includes(cpf)) {
        alert("CPF já cadastrado.");
        return;
    }

    
    const telefoneRegex = /^\([0-9]{2}\)\s[0-9]{5}-[0-9]{4}$/;
    if (!telefoneRegex.test(telefone)) {
        alert("Telefone inválido. Use o formato (xx) 9xxxx-xxxx");
        return;
    }

    
    if (!concorda) {
        alert("Você precisa aceitar os termos.");
        return;
    }

    
    if (motivo === "quero" || motivo === "porque sim" || motivo.length < 10) {
        alert("Descreva melhor o motivo da adoção.");
        return;
    }

    
    if (moradia === "Apartamento" && temQuintal && temQuintal.value === "sim") {
        alert("Inconsistência: apartamento não pode ter quintal.");
        return;
    }

    
    if (horasSozinho > 8) {
        const justificativa = prompt("O pet ficará muito tempo sozinho. Justifique:");
        if (!justificativa || justificativa.trim() === "") {
            alert("Justificativa obrigatória.");
            return;
        }
        alert("Alerta: avaliação mais rigorosa será aplicada.");
    }

    
    if (jaTevePet && jaTevePet.value === "nao") {
        alert("Você poderá receber acompanhamento da ONG.");
    }

    
    const hoje = new Date();
    if (hoje.getHours() < 2) { 
        alert("Atenção: decisão pode ser impulsiva.");
    }

    
    const condicaoFinanceira = confirm("Você possui condições financeiras para manter o pet?");
    if (!condicaoFinanceira) {
        alert("Adoção não permitida sem condições financeiras.");
        return;
    }

    alert("Formulário enviado com sucesso!");
});
