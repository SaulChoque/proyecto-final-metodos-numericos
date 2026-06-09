// js/modulo2.js
// Método de Bisección para Raíces de Ecuaciones

// Función de ejemplo: Evalúa un punto crítico (Ej: Costo vs Ingreso)
function funcionUmbral(x) {
    return Math.pow(x, 2) - 4 * x - 5; 
}

function resolverBiseccion(a, b, tol, maxIter = 100) {
    if (funcionUmbral(a) * funcionUmbral(b) >= 0) {
        return { error: "El intervalo no contiene una raíz o hay múltiples raíces." };
    }

    let xr = a;
    let iter = 0;
    let errorActual = 100;

    while (errorActual > tol && iter < maxIter) {
        let xr_old = xr;
        xr = (a + b) / 2;

        if (funcionUmbral(xr) * funcionUmbral(a) < 0) {
            b = xr;
        } else {
            a = xr;
        }

        if (iter > 0) {
            errorActual = Math.abs((xr - xr_old) / xr) * 100;
        }
        iter++;
    }

    return { raiz: xr, iteraciones: iter, error: errorActual };
}