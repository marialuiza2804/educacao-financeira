let grafico; // variável global para armazenar o gráfico

function calcularJurosCompostos() {
    const valor = parseFloat(document.getElementById('valor').value);
    const meses = parseInt(document.getElementById('meses').value);
    const taxa = parseFloat(document.getElementById('taxa').value) / 100;
    const resultado = document.getElementById('resultado');

    if (isNaN(valor) || isNaN(meses) || isNaN(taxa) || valor <= 0 || meses <= 0 || taxa < 0) {
        resultado.textContent = "Por favor, insira valores válidos.";
        return;
    }

    let montantes = [];
    let totalInvestido = [];
    let acumulado = 0;

    for (let i = 1; i <= meses; i++) {
        acumulado = (acumulado + valor) * (1 + taxa);
        montantes.push(acumulado);
        totalInvestido.push(valor * i);
    }

    const montanteFinal = montantes[meses - 1];
    const investidoFinal = totalInvestido[meses - 1];
    const rendimento = montanteFinal - investidoFinal;

    resultado.innerHTML = `
        💵 Total investido: R$ ${investidoFinal.toFixed(2)}<br>
        📈 Rendimento: R$ ${rendimento.toFixed(2)}<br>
        🏦 Montante final: <strong>R$ ${montanteFinal.toFixed(2)}</strong>
    `;

    gerarGrafico(totalInvestido, montantes);
}

function gerarGrafico(investido, montante) {
    const ctx = document.getElementById('graficoInvestimento').getContext('2d');

    if (grafico) {
        grafico.destroy(); // destrói o gráfico anterior antes de desenhar outro
    }

    grafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: investido.map((_, i) => `Mês ${i + 1}`),
            datasets: [
                {
                    label: 'Total Investido',
                    data: investido,
                    borderColor: '#00ff88',
                    backgroundColor: 'rgba(0, 255, 136, 0.2)',
                    fill: true,
                    tension: 0.2
                },
                {
                    label: 'Montante Total',
                    data: montante,
                    borderColor: '#007744',
                    backgroundColor: 'rgba(0, 100, 50, 0.3)',
                    fill: true,
                    tension: 0.2
                }
            ]
        },
        options: {
            scales: {
                x: {
                    ticks: { color: '#00ff88' },
                    grid: { color: '#004d26' }
                },
                y: {
                    ticks: { color: '#00ff88' },
                    grid: { color: '#004d26' }
                }
            },
            plugins: {
                legend: {
                    labels: { color: '#00ff88' }
                }
            }
        }
    });
}

function rolarParaCalculadora() {
    document.getElementById('calculadora').scrollIntoView({ behavior: 'smooth' });
}

