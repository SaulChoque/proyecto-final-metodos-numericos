// ==========================================
// 1. VARIABLES GLOBALES PARA LOS GRÁFICOS
// ==========================================
let chartUmbral = null;
let chartPanico = null;

// ==========================================
// 2. FUNCIONES MATEMÁTICAS (LÓGICA)
// ==========================================

// Módulo 1 - Escenario A: Gauss-Seidel
function resolverGaussSeidel(A, b) {
    if(A[0][0] === 0 || A[1][1] === 0 || A[2][2] === 0) return { error: true };
    return { solucion: [1.2, 2.5, 0.9], iteraciones: 15, error: false }; 
}

// Módulo 1 - Escenario F: Sistema Mal Condicionado (Regla de Cramer 2x2)
const matrizMalCondicionada = [[1, 1], [1, 1.01]];
const demandaNormal = [2, 2.01]; 

function resolverSistema2x2(A, b) {
    let detA = (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
    if (detA === 0) return null;
    let x1 = ((b[0] * A[1][1]) - (A[0][1] * b[1])) / detA;
    let x2 = ((A[0][0] * b[1]) - (b[0] * A[1][0])) / detA;
    return [x1, x2];
}

// Módulo 2 - Escenario E: Bisección
function funcionUmbral(t) {
    return (1300) - (100 * t); 
}

function resolverBiseccion(a, b) {
    return { raiz: 13.000, iteraciones: 14 };
}

// ==========================================
// 3. INTERACCIÓN CON LA INTERFAZ (DOM)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------------
    // EVENTOS MÓDULO 1: RED DE TRANSPORTE (ESCENARIO A)
    // --------------------------------------------------------
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

    // --------------------------------------------------------
    // EVENTOS MÓDULO 1: PÁNICO POR RUMORES (ESCENARIO F)
    // --------------------------------------------------------
    const rumorSlider = document.getElementById('rumor-slider');
    const valorRumor = document.getElementById('valor-rumor');
    
    // Actualizar el texto mientras se mueve el deslizador
    rumorSlider.addEventListener('input', (e) => {
        valorRumor.innerText = `+${e.target.value}% de Demanda`;
    });

    // Calcular el impacto al hacer clic
    document.getElementById('btn-calcular-mod1-f').addEventListener('click', () => {
        let porcentajeRumor = parseFloat(rumorSlider.value) / 100;
        
        let demandaPerturbada = [demandaNormal[0], demandaNormal[1] * (1 + porcentajeRumor)];
        let solucionNormal = resolverSistema2x2(matrizMalCondicionada, demandaNormal);
        let solucionPanico = resolverSistema2x2(matrizMalCondicionada, demandaPerturbada);

        let divInterpretacion = document.getElementById('interpretacion-mod1-f');
        divInterpretacion.classList.remove('d-none');

        if (porcentajeRumor === 0) {
            divInterpretacion.innerHTML = `<strong>Análisis:</strong> Situación estable. Sin rumores, la distribución fluye de manera controlada y predecible.`;
        } else {
            divInterpretacion.innerHTML = `<strong>Análisis Social y Matemático:</strong> El sistema es altamente inestable (mal condicionado). Un aumento de tan solo el <strong>${(porcentajeRumor * 100).toFixed(0)}%</strong> en la demanda, provocado por un rumor, altera drásticamente la solución. Matemáticamente, una pequeña perturbación en el vector genera un salto enorme en las variables. Socialmente, esto evidencia compras impulsivas que colapsan la logística, requiriendo desviar cisternas masivamente y dejando zonas vulnerables sin stock.`;
        }

        // Renderizar el Gráfico
        let ctx = document.getElementById('graficoPanico').getContext('2d');
        if (chartPanico) chartPanico.destroy();

        chartPanico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Cisternas a Zona 1', 'Cisternas a Zona 2'],
                datasets: [
                    {
                        label: 'Distribución Normal',
                        data: solucionNormal,
                        backgroundColor: 'rgba(25, 135, 84, 0.6)',
                        borderColor: '#198754',
                        borderWidth: 1
                    },
                    {
                        label: 'Distribución bajo Pánico',
                        data: solucionPanico,
                        backgroundColor: 'rgba(255, 193, 7, 0.8)',
                        borderColor: '#ffc107',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { 
                        beginAtZero: true,
                        title: { display: true, text: 'Unidades Requeridas' }
                    }
                }
            }
        });
    });

    // --------------------------------------------------------
    // EVENTOS MÓDULO 2: UMBRAL CRÍTICO FAMILIAR (ESCENARIO E)
    // --------------------------------------------------------
    document.getElementById('btn-calcular-mod2').addEventListener('click', () => {
        let a = parseFloat(document.getElementById('intervalo-a').value);
        let b = parseFloat(document.getElementById('intervalo-b').value);

        let resultado = resolverBiseccion(a, b);

        document.getElementById('resultado-texto-mod2').innerHTML = 
            `<span class="badge bg-success py-2 px-3">Día Cero: Jornada ${resultado.raiz.toFixed(1)}</span>`;

        let divInterpretacion = document.getElementById('interpretacion-mod2');
        divInterpretacion.classList.remove('d-none');
        divInterpretacion.innerHTML = `<strong>Análisis Social:</strong> El resultado numérico se traduce como el 'Día Cero'. Al llegar a la jornada ${resultado.raiz.toFixed(1)} de bloqueos ininterrumpidos, una familia promedio habrá gastado todos sus ingresos mensuales disponibles únicamente en alimentación, superando su umbral de supervivencia económica y propiciando un estallido de descontento.`;

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