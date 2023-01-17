function parOuImpar(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const numeroAleatorioEntreZeroeDez = parOuImpar(0, 10)


const soma = Number(process.argv[3]) + Number(numeroAleatorioEntreZeroeDez)

const devPar = process.argv[2] === "par"
const devImpar = process.argv[2] === "impar"

if (devPar &&  soma % 2 === 0) {
    console.log(`Você escolheu par e o computador escolheu ìmpar. O resultado foi ${soma}. Você ganhou!`)
} else if (devImpar && soma % 2 !== 0) {
    console.log(`Você escolheu ìmpar e o computador escolheu par. O resultado foi ${soma}. Você ganhou!`)
} else if(devPar &&  soma % 2 !== 0){
    console.log(`Você escolheu par e o computador escolheu ìmpar. O resultado foi ${soma}. O computador ganhou!`)
}else if (devImpar && soma % 2 === 0) {
    console.log(`Você escolheu ìmpar e o computador escolheu par. O resultado foi ${soma}. O computador ganhou!`)
}

