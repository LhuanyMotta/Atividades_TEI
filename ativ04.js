/* 4. Um posto está vendendo combustíveis com a seguinte tabela de descontos:
- Álcool: até 20 litros, desconto de 3% por litro acima de 20 litros, desconto de 5% por litro
- Gasolina: até 20 litros, desconto de 4% por litro acima de 20 litros, desconto de 6% por litro

Escreva um algoritmo que leia o número de litros vendidos, o tipo de combustível (codificado da
seguinte forma: A-álcool, G-gasolina), calcule e imprima o valor a ser pago pelo cliente sabendo-se
que o preço do litro da gasolina é R$ 2,50 o preço do litro do álcool é R$ 1,90 */

// Preços dos combustíveis
const precoGasolina = 2.50;
const precoAlcool = 1.90;

// Ler o número de litros vendidos e o tipo de combustível
const numeroLitros = parseFloat(prompt("Digite o número de litros vendidos:"));
const tipoCombustivel = prompt("Digite o tipo de combustível (A - Álcool, G - Gasolina):").toUpperCase();

// Calcular desconto e valor a ser pago
let desconto = 0;
let valorTotal = 0;

if (tipoCombustivel === "A") {
    if (numeroLitros <= 20) {
        desconto = numeroLitros * 0.03;
    } else {
        desconto = numeroLitros * 0.05;
    }
    valorTotal = numeroLitros * (precoAlcool - desconto);
} else if (tipoCombustivel === "G") {
    if (numeroLitros <= 20) {
        desconto = numeroLitros * 0.04;
    } else {
        desconto = numeroLitros * 0.06;
    }
    valorTotal = numeroLitros * (precoGasolina - desconto);
} else {
    console.log("Tipo de combustível inválido. Use A para Álcool ou G para Gasolina.");
    // Encerrar o programa
    process.exit(1);
}

// Exibir o valor a ser pago pelo cliente
console.log(`Valor a ser pago: R$ ${valorTotal.toFixed(2)}`);
