// Regla del Trapecio Compuesta
function integrarTrapecio(X, Y) {
    let n = X.length - 1;
    let suma = Y[0] + Y[n];
    for (let i = 1; i < n; i++) {
        suma += 2 * Y[i];
    }
    let h = (X[n] - X[0]) / n;
    return (h / 2) * suma;
}

// Regla de Simpson 1/3 Compuesta (Requiere n par / número de puntos impar)
function integrarSimpson13(X, Y) {
    let n = X.length - 1;
    let h = (X[n] - X[0]) / n;
    let suma = Y[0] + Y[n];

    for (let i = 1; i < n; i++) {
        if (i % 2 === 0) {
            suma += 2 * Y[i];
        } else {
            suma += 4 * Y[i];
        }
    }
    return (h / 3) * suma;
}