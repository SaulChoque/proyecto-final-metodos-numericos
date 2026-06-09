let chartUmbral = null;

// Simulación de funciones de cálculo (Deben estar implementadas en sus respectivos archivos)
function resolverGaussSeidel(A, b) {
    // Si la matriz tiene ceros en la diagonal principal y no se puede pivotar, el sistema colapsa
    if(A[0][0] === 0 || A[1][1] === 0 || A[2][2] === 0) return { error: true };
    return { solucion: [1.2, 2.5, 0.9], iteraciones: 15, error: false }; 
}

function funcionUmbral(t) {
    // Modelo simulado: f(t) = Ingreso - CostoAcumulado. 
    // Supongamos que en el día 13 se agota el dinero.
    return (1300) - (100 * t); 
}

function resolverBiseccion(a, b) {
    return { raiz: 13.000, iteraciones: 14 };
}

document.addEventListener('DOMContentLoaded', () => {

    // --- MÓDULO 1 ---
    document.getElementById('btn-calcular-mod1').addEventListener('click', () => {
        let A = [
            [parseFloat(document.getElementById('a00').value), parseFloat(document.getElementById('a01').value), parseFloat(document.getElementById('a02').value)],
            [parseFloat(document.getElementById('a10').value), parseFloat(document.getElementById('a11').value), parseFloat(document.getElementById('a12').value)],
            [parseFloat(document.getElementById('a20').value), parseFloat(document.getElementById('a21').value), parseFloat(document.getElementById('a22').value)]
        ];
        let b = [parseFloat(document.getElementById('b0').value), parseFloat(document.getElementById('b1').value), parseFloat(document.getElementById('b2').value)];

        let resultado = resolverGaussSeidel(A, b);
        let tbody = document.getElementById('tabla-resultados-mod1');
        let divInterpretacion = document.getElementById('interpretacion-mod1');
        
        tbody.innerHTML = ''; 
        divInterpretacion.classList.remove('d-none');

        if(resultado.error) {
            tbody.innerHTML = `<tr><td colspan="2" class="text-danger fw-bold">Colapso del Sistema Logístico</td></tr>`;
            divInterpretacion.className = 'alert alert-danger mt-3';
            divInterpretacion.innerHTML = `<strong>Análisis Social:</strong> El cálculo arroja valores que no convergen. Esto es la demostración matemática del colapso logístico. Significa que las zonas quedarán inevitablemente desabastecidas, indicando a las autoridades que la única solución física es la intervención y el desbloqueo de las vías principales.`;
        } else {
            resultado.solucion.forEach((valor, index) => {
                let tr = document.createElement('tr');
                tr.innerHTML = `<strong>Zona ${index + 1}</strong><td>${(valor * 10).toFixed(0)} Vehículos</td>`;
                tbody.appendChild(tr);
            });
            divInterpretacion.className = 'alert alert-info mt-3';
            divInterpretacion.innerHTML = `<strong>Análisis Social:</strong> El cálculo convergió en ${resultado.iteraciones} iteraciones. Matemáticamente, existe una solución. Socialmente, esto significa que, a pesar de los bloqueos, es logísticamente posible evitar el desabastecimiento redistribuyendo el flujo por rutas alternas.`;
        }
    });

    // --- MÓDULO 2 ---
    document.getElementById('btn-calcular-mod2').addEventListener('click', () => {
        let a = parseFloat(document.getElementById('intervalo-a').value);
        let b = parseFloat(document.getElementById('intervalo-b').value);

        let resultado = resolverBiseccion(a, b);

        document.getElementById('resultado-texto-mod2').innerHTML = 
            `<span class="badge bg-success py-2 px-3">Día Cero: Jornada ${resultado.raiz.toFixed(1)}</span>`;

        let divInterpretacion = document.getElementById('interpretacion-mod2');
        divInterpretacion.classList.remove('d-none');
        divInterpretacion.innerHTML = `<strong>Análisis Social:</strong> El resultado numérico se traduce como el 'Día Cero'. Al llegar a la jornada ${resultado.raiz.toFixed(1)} de bloqueos ininterrumpidos, una familia promedio habrá gastado todos sus ingresos mensuales disponibles únicamente en alimentación, superando su umbral de supervivencia económica y propiciando un estallido de descontento.`;

        // Generar Gráfico
        let xValues = [], yValues = [];
        for (let i = a; i <= b; i += 1) {
            xValues.push(`Día ${i}`);
            yValues.push(funcionUmbral(i));
        }

        let ctx = document.getElementById('graficoUmbral').getContext('2d');
        if (chartUmbral) chartUmbral.destroy();

        chartUmbral = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xValues,
                datasets: [
                    {
                        label: 'Poder Adquisitivo Restante (Bs)',
                        data: yValues,
                        borderColor: '#198754',
                        backgroundColor: 'rgba(25, 135, 84, 0.1)',
                        fill: true,
                        tension: 0.3
                    }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    });
});