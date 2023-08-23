// Solicita ao usuário o salário atual do colaborador
const salarioAtual = parseFloat(prompt("Digite o salário atual do colaborador:"));

let percentualAumento = 0;
let novoSalario = 0;

if (salarioAtual <= 280) {
    percentualAumento = 20;
} else if (salarioAtual <= 700) {
    percentualAumento = 15;
} else if (salarioAtual <= 1500) {
    percentualAumento = 10;
} else {
    percentualAumento = 5;
}

const aumento = (salarioAtual * percentualAumento) / 100;
novoSalario = salarioAtual + aumento;

// Imprime na tela as informações formatadas
console.log("Salário antes do reajuste: R$ " + salarioAtual.toFixed(2));
console.log("Percentual de aumento aplicado: " + percentualAumento + "%");
console.log("Valor do aumento: R$ " + aumento.toFixed(2));
console.log("Novo salário após o aumento: R$ " + novoSalario.toFixed(2));