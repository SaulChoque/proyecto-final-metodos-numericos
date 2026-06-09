// js/modulo1.js
// Método de Gauss-Seidel para Sistemas de Ecuaciones Lineales

function resolverGaussSeidel(A, b, maxIter = 50, tol = 0.0001) {
    let n = b.length;
    let x = new Array(n).fill(0); 
    let iter = 0;
    let error = 100;

    while (iter < maxIter && error > tol) {
        let x_old = [...x];
        for (let i = 0; i < n; i++) {
            let suma = 0;
            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    suma += A[i][j] * x[j];
                }
            }
            x[i] = (b[i] - suma) / A[i][i];
        }

        // Calcular error
        error = 0;
        for (let i = 0; i < n; i++) {
            error = Math.max(error, Math.abs((x[i] - x_old[i]) / x[i]));
        }
        iter++;
    }

    return { solucion: x, iteraciones: iter, errorFinal: error };
}