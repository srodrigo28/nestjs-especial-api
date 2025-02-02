const contasApagar = [
    { nome: 'energia', preco: 180,     quantidade: 1 },
    { nome: 'agua',    preco: 150.59,  quantidade: 1 },
    { nome: 'carro',   preco: 5550.89, quantidade: 1 }
]

const totalPagar = contasApagar.reduce(
    (total, item) => total + (item.preco * item.quantidade) , 0)

console.log('Total a pagar R$ ' + totalPagar.toFixed(2))