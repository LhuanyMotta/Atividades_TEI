/* 1. O Hipermercado Assaí está com uma promoção de carnes que é imperdível. Confira:
    
                     Até 5 Kg               Acima de 5 Kg
    
    File Duplo      R$ 4,90 por Kg          R$ 5,80 por Kg
    
    Alcatra         R$ 5,90 por Kg          R$ 6,80 por Kg
    
    Picanha         R$ 6,90 por Kg          R$ 7,80 por Kg    

Para atender a todos os clientes, cada cliente poderá levar apenas um dos tipos de carne
da promoção, porém não há limites para a quantidade de carne por cliente. Se compra for
feita no cartão Assaí o cliente receberá ainda um desconto de 5% sobre o total a compra. 

Escreva um script que peça o tipo e a quantidade de carne comprada pelo usuário e gere
um cupom fiscal, contendo as informações da compra: tipo e quantidade de carne, preço
total, tipo de pagamento, valor do desconto e valor a pagar. */

// Preços das carnes
const precos = {
    'fileDuplo': { até5Kg: 4.90, acima5Kg: 5.80 },
    'alcatra': { até5Kg: 5.90, acima5Kg: 6.80 },
    'picanha': { até5Kg: 6.90, acima5Kg: 7.80 }
  };
  
  // Perguntar ao usuário o tipo de carne e a quantidade comprada
  const tipoCarne = prompt("Digite o tipo de carne (fileDuplo, alcatra ou picanha):");
  const quantidade = parseFloat(prompt("Digite a quantidade em Kg:"));
  
  // Verificar se o tipo de carne é válido
  if (!precos[tipoCarne]) {
    console.log("Tipo de carne inválido.");
  } else {
    const precoPorKg = (quantidade <= 5) ? precos[tipoCarne].até5Kg : precos[tipoCarne].acima5Kg;
    const totalAPagar = precoPorKg * quantidade;
  
    // Perguntar sobre o tipo de pagamento
    const tipoPagamento = prompt("Tipo de pagamento (cartao ou outro):").toLowerCase();
  
    let desconto = 0;
    if (tipoPagamento === "cartao") {
      desconto = totalAPagar * 0.05;
    }
  
    const valorFinal = totalAPagar - desconto;
  
    // Gerar o cupom fiscal
    console.log("Cupom Fiscal:");
    console.log(`Tipo de carne: ${tipoCarne}`);
    console.log(`Quantidade: ${quantidade} Kg`);
    console.log(`Preço total: R$ ${totalAPagar.toFixed(2)}`);
    console.log(`Tipo de pagamento: ${tipoPagamento}`);
    console.log(`Desconto: R$ ${desconto.toFixed(2)}`);
    console.log(`Valor a pagar: R$ ${valorFinal.toFixed(2)}`);
  }
  