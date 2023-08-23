/* Faça um script que leia um número e exiba o dia correspondente da semana.
(1-Domingo, 2- Segunda, etc.), se digitar outro valor deve aparecer valor inválido. */

// Solicita ao usuário um número correspondente ao dia da semana
const numeroDia = parseInt(prompt("Digite um número (1 a 7) correspondente ao dia da semana:"));

// Verifica o número digitado e exibe o dia da semana correspondente
let diaSemana = "";

switch (numeroDia) {
    case 1:
        diaSemana = "Domingo";
        break;
    case 2:
        diaSemana = "Segunda-feira";
        break;
    case 3:
        diaSemana = "Terça-feira";
        break;
    case 4:
        diaSemana = "Quarta-feira";
        break;
    case 5:
        diaSemana = "Quinta-feira";
        break;
    case 6:
        diaSemana = "Sexta-feira";
        break;
    case 7:
        diaSemana = "Sábado";
        break;
    default:
        diaSemana = "Valor inválido";
}

// Imprime na tela o resultado
console.log(diaSemana);
