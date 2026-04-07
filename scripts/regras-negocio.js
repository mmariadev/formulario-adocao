const cpfsRegistrados = [
    '123.456.789-00',
    '987.654.321-11',
    '111.222.333-44',
];
const form = document.querySelector('form');
const tipoResidencia = document.getElementById('tipo_residencia');
tipoResidencia.addEventListener('change', function() {
    const permitiAnimais = document.querySelector('.permite_animais');
    const quintalSeguro = document.querySelector('.quintal_seguro');
    permitiAnimais.style.display = 'none';
    quintalSeguro.style.display = 'none';
    if (tipoResidencia.value === 'apartamento') {
        permitiAnimais.style.display = 'block';
    }
    if (tipoResidencia.value === 'casa') {
        quintalSeguro.style.display = 'block';
    }
});
const quantasHoras = document.getElementById('quantas_horas_pet_sozinho');
quantasHoras.addEventListener('change', function() {
    const justificativaHoras = document.querySelector('.justificativa_horas');
    const horas = parseInt(quantasHoras.value);
   
    if (horas > 8) {
        justificativaHoras.style.display = 'block';
    } else {
        justificativaHoras.style.display = 'none';
    }
});
function validarEmail(email) {
    if (email.includes('@') && email.includes('.')) {
        return true;
    }
    return false;
}
function validarTelefone(telefone) {
    const padrao = /^\([0-9]{2}\)\s[0-9]{5}-[0-9]{4}$/;
    return padrao.test(telefone);
}
function validarCPF(cpf) {
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
        return false;
    }
    return true;
}
function validarMotivo(motivo) {
    const palavrasRuins = ['quero', 'porque sim', 'sei lá'];
    const motivoLower = motivo.toLowerCase();
    if (motivo.length < 20) {
        return false;
    }
    for (let i = 0; i < palavrasRuins.length; i++) {
        if (motivoLower.includes(palavrasRuins[i])) {
            return false;
        }
    }
    return true;
}
function ehDecisaoRapida(data) {
    if (data === '') {
        return false;
    }
    const dataSelecionada = new Date(data);
    const hoje = new Date();
    const um_dia = 24 * 60 * 60 * 1000;
    const diferenca = hoje - dataSelecionada;
    if (diferenca < um_dia && diferenca >= 0) {
        return true;
    }
    return false;
}
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome_completo').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const cpf = document.getElementById('CPF').value;
    const idade = document.getElementById('idade').value;
    const cidade = document.getElementById('cidade').value;
    const tipoRes = tipoResidencia.value;
    const quintal = document.querySelector('input[name="possui_quintal"]:checked');
    const teve_pet = document.querySelector('input[name="ja_teve_pet"]:checked');
    const horas_sozinho = document.getElementById('quantas_horas_pet_sozinho').value;
    const motivo = document.getElementById('motivo_adoção').value;
    const concorda = document.getElementById('concorda_termos').checked;
    const data_decisao = document.getElementById('data_decisao').value;
    const condicoes_fin = document.querySelector('input[name="condicoes_financeiras"]:checked');
    const permite_animais = document.querySelector('input[name="permite_animais"]:checked');
    const quintal_seguro = document.querySelector('input[name="quintal_seguro"]:checked');
    const erros = [];
    if (nome === '') {
        erros.push('Nome é obrigatório');
    }
    if (email === ' ') {
        erros.push('Email é obrigatório');
    } else {
        if (!validarEmail(email)) {
            erros.push('Email inválido');
        }
    }
    if (telefone === ' ') {
        erros.push('Telefone é obrigatório');
    } else {
        if (!validarTelefone(telefone)) {
            erros.push('Telefone inválido. Use: (xx) 9xxxx-xxxx');
        }
    }
    if (cpf === ' ') {
        erros.push('CPF é obrigatório');
    } else {
        if (!validarCPF(cpf)) {
            erros.push('CPF inválido');
        }
       
        if (cpfsRegistrados.includes(cpf)) {
            erros.push('CPF já registrado no sistema');
        }
    }
    if (idade === '') {
        erros.push('Idade é obrigatória');
    } else {
        if (parseInt(idade) < 18) {
            erros.push('Você deve ter 18 anos ou mais');
        }
    }
    if (cidade === '') {
        erros.push('Cidade é obrigatória');
    }
    if (tipoRes === '') {
        erros.push('Escolha um tipo de residência');
    }
    if (tipoRes === 'apartamento') {
        if (permite_animais === null) {
            erros.push('Indique se o local permite animais');
        }
       
        if (permite_animais && permite_animais.value === 'nao') {
            erros.push('O local deve permitir animais');
        }
    }
    if (tipoRes === 'casa') {
        if (quintal_seguro === null) {
            erros.push('Indique se o quintal é seguro');
        }
    }
    if (tipoRes === 'apartamento' && quintal && quintal.value === 'sim') {
        erros.push('Apartamento não pode ter quintal');
    }
    if (horas_sozinho === '') {
        erros.push('Indique quantas horas o pet fica sozinho');
    } else {
        if (parseInt(horas_sozinho) > 8) {
            const justificativa = document.getElementById('justificativa_horas').value;
            if (justificativa === '') {
                erros.push('Justifique por que o pet fica mais de 8 horas sozinho');
            }
        }
    }
    if (teve_pet === null) {
        erros.push('Indique se já teve um pet');
    }
    if (motivo === '') {
        erros.push('Motivo da adoção é obrigatório');
    } else {
        if (!validarMotivo(motivo)) {
            erros.push('Motivo muito genérico. Seja mais específico');
        }
    }
    if (condicoes_fin === null) {
        erros.push('Indique se tem condições financeiras');
    } else {
        if (condicoes_fin.value === 'nao') {
            erros.push('Você precisa ter condições financeiras para adotar');
        }
    }
   
    if (data_decisao !== '') {
        if (ehDecisaoRapida(data_decisao)) {
            erros.push('Cuidado! Você decidiu adotar muito rápido. Pense melhor!');
        }
    }
    if (concorda === false) {
        erros.push('Você deve concordar com os termos');
    }
    if (erros.length > 0) {
        let mensagem = 'Erros encontrados:\n\n';
        for (let i = 0; i < erros.length; i++) {
            mensagem = mensagem + erros[i] + '\n';
        }
        alert(mensagem);
        return;
    }
    if (teve_pet.value === 'nao') {
        alert('Você nunca teve um pet. A ONG pode fazer acompanhamento!');
    }
    alert('Formulário enviado com sucesso! Telefone: ' + telefone);
    form.reset();
});
