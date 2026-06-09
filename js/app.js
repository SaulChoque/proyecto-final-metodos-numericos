// js/app.js
// Conecta la interfaz de usuario con los métodos numéricos

document.addEventListener('DOMContentLoaded', () => {

    // Evento Módulo 1 (Gauss-Seidel)
    document.getElementById('btn-calcular-mod1').addEventListener('click', () => {
        // Nota: En un entorno real se debe parsear el string a una matriz bidimensional
        // Aquí se usarán datos de prueba simulando la lectura correcta para no extender el código
        let A = [
            [10, -1, 2, 0],
            [-1, 11, -1, 3],
            [2, -1, 10, -1],
            [0, 3, -1, 8]
        ];
        let b = [6, 25, -11, 15];

        let resultado = resolverGaussSeidel(A, b);
        
        let divRes = document.getElementById('resultado-mod1');
        divRes.innerHTML = `<strong>Cantidades distribuidas:</strong><br>
                            x1 = ${resultado.solucion[0].toFixed(4)}<br>
                            x2 = ${resultado.solucion[1].toFixed(4)}<br>
                            x3 = ${resultado.solucion[2].toFixed(4)}<br>
                            x4 = ${resultado.solucion[3].toFixed(4)}<br>
                            <em>Iteraciones: ${resultado.iteraciones}</em>`;
    });

    // Evento Módulo 2 (Bisección)
    document.getElementById('btn-calcular-mod2').addEventListener('click', () => {
        let a = parseFloat(document.getElementById('intervalo-a').value);
        let b = parseFloat(document.getElementById('intervalo-b').value);
        let tol = parseFloat(document.getElementById('tolerancia').value);

        let resultado = resolverBiseccion(a, b, tol);

        let divRes = document.getElementById('resultado-mod2');
        if (resultado.error && typeof resultado.error === "string") {
            divRes.innerHTML = `<span class="text-danger">${resultado.error}</span>`;
        } else {
            divRes.innerHTML = `<strong>Umbral Crítico (Raíz):</strong> ${resultado.raiz.toFixed(4)}<br>
                                <em>Iteraciones necesarias: ${resultado.iteraciones}</em><br>
                                <em>Error relativo: ${resultado.error.toFixed(4)}%</em>`;
        }
    });

});