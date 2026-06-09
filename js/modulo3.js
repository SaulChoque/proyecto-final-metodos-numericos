// Interpolación de Newton para curvas continuas
function interpolarNewton(X, Y, valorAInterpolar) {
    let n = X.length;
    let b = Array.from({ length: n }, () => new Array(n).fill(0));

    // Inicializar primera columna con Y
    for (let i = 0; i < n; i++) b[i][0] = Y[i];

    // Tabla de diferencias divididas
    for (let j = 1; j < n; j++) {
        for (let i = 0; i < n - j; i++) {
            b[i][j] = (b[i + 1][j - 1] - b[i][j - 1]) / (X[i + j] - X[i]);
        }
    }

    // Evaluar el polinomio en el punto dado
    let resultado = b[0][0];
    let termino = 1;
    for (let i = 1; i < n; i++) {
        termino *= (valorAInterpolar - X[i - 1]);
        resultado += b[0][i] * termino;
    }

    return resultado;
}