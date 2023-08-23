/* 2. Faça um script para o cálculo de uma folha de pagamento, sabendo que os descontos são do
Imposto de Renda, que depende do salário bruto (conforme tabela abaixo) e 10% para o INSS e
que o FGTS corresponde a 11% do Salário Bruto, mas não é descontado (é a empresa que deposita).
O Salário Líquido corresponde ao Salário Bruto menos os descontos.
O script deverá pedir ao usuário o valor da sua hora e a quantidade de horas trabalhadas no mês.

Desconto do IR:
Salário Bruto até 900 (inclusive) - isento
Salário Bruto até 1500 (inclusive) - desconto de 5%
Salário Bruto até 2500 (inclusive) - desconto de 10%
Salário Bruto acima de 2500 - desconto de 20% Imprima na tela as informações, dispostas conforme o exemplo abaixo. 

*No exemplo o valor da hora é 5 e a quantidade de hora é 220.*

Salário Bruto: (5h * R$ 220,00)        : R$ 1100,00
(-) IR (5%)                                        : R$   55,00
(-) INSS ( 10%)                                : R$  110,00
FGTS (11%)                                     : R$  121,00
Total de descontos                           : R$  165,00
Salário Liquido                                 : R$  935,00

Impressão na tela conforme o exemplo acima. */

// Implementar o código a partir daqui


// Solicita ao usuário o valor da hora e a quantidade de horas trabalhadas

function calculosalario()
const valorHora = parseFloat(prompt("Digite o valor da sua hora de trabalho: "));
const horasTrabalhadas = parseFloat(prompt("Digite a quantidade de horas trabalhadas no mês: "));

// Calcula o Salário Bruto, o Imposto de Renda e o INSS

const salarioBruto = valorHora * horasTrabalhadas;

let descontoIR = 0;

if (salarioBruto <= 900)
{
    descontoIR = 0;
}
else if (salarioBruto <= 1500)
{
    descontoIR = salarioBruto * 0.05;
}
else if (salarioBruto <= 2500)
{
    descontoIR = salarioBruto * 0.1
}
else
{
    descontoIR = salarioBruto * 0.2
}

const descontoINSS = salarioBruto * 0.1;

// Calcula o FGTS e o Total de Descontos
const fgts = salarioBruto * 0.11;
const totalDescontos = descontoIR + descontoINSS;

// Calcula o Salário Líquido
const salarioLiquido = salarioBruto - totalDescontos;

// Imprime na tela as informações formatadas

console.log("Salário Bruto: (" + valorHora + " * " + horasTrabalhadas + ") : R$ " + salarioBruto.toFixed(2));
console.log("(-) IR (" + (descontoIR * 100 / salarioBruto) + "%)           : R$ " + descontoIR.toFixed(2));
console.log("(-) INSS (10%)                                                : R$ " + descontoINSS.toFixed(2));
console.log("FGTS (11%)                                                    : R$ " + fgts.toFixed(2));
console.log("Total de descontos                                            : R$ " + totalDescontos.toFixed(2));
console.log("Salário Liquido                                               : R$ " + salarioLiquido.toFixed(2));