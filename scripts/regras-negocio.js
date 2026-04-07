const form= document.getElementById("formulario.Adocao");

const cpfCadastrados = ["12345678900", "98765432100", "11122233344"]; 

form.addEventListener("submit", function(event) {
    event.preventDefault();     

    let nome= document.getElementById("nome_completo").value;
    let email= document.getElementById("email").value;
    let telefone= document.getElementById("telefone").value;
    let cpf= document.getElementById("CPF").value;
    let idade= document.getElementById("idade").value;
    let cidade= document.getElementById("cidade").value;
    let tipo_residencia= document.getElementById("tipo_residencia").value;
    let possui_quintal= document.querySelector('input[name="possui_quintal"]:checked').value;
    let ja_teve_pet= document.querySelector('input[name="ja_teve_pet"]:checked').value;
    let quantas_horas_pet_sozinho= document.getElementById("quantas_horas_pet_sozinho").value;
    let motivo_adoção= document.getElementById("motivo_adoção").value;
    let concorda_termos= document.getElementById("concorda_termos").checked;

    
    