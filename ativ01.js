/* 1. Faça um script que recebe o salário de um colaborador e o  reajuste segundo o seguinte critério, baseado no salário atual: 

- salários até R$ 280,00 (incluindo) : aumento de 20%
- salários entre R$ 280,00 e R$ 700,00 : aumento de 15%
- salários entre R$ 700,00 e R$ 1500,00 : aumento de 10%
- salários de R$ 1500,00 em diante : aumento de 5% Após o aumento ser realizado,
    
informe na tela:
    
- o salário antes do reajuste;
- o percentual de aumento aplicado;
- o valor do aumento;
- o novo salário, após o aumento. */


// função calcular

function calcular(salario)
{
    let por, valoraumento, salarioreajustado;

    if(salario <= 280.00)
{
    por = 20;
}
else if (salario > 280.00 && salario <= 700.00)
{
    por = 15;
}
else if (salario > 700.00 && salario <= 1500.00)
{
    por = 10;
}
else (salario > 1500.00)
{
    por = 5;
}
valoraumento = (por / 100) * salario;
salarioreajustado = salario + valoraumento;

console.log("Salário anterior: R$ "+ salario);
console.log("Percentual de aumento aplicado: "+por +"%");
console.log("Valor do aumento: R$ "+valoraumento);
console.log("Novo salário reajustado: R$ "+salarioreajustado);
}

// chamando a função calcular

const salario = parseFloat(process.argv[2]);

// fazendo a verificação de salário válido
if (isNaN(salario))
{
    console.log("Informe um valor de salário válido!");
} else
{
    calcular(salario);
}