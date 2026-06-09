// Resolución de Sistemas de EDO mediante RK4 para dinámica social
function resolverEDO_RK4(t0, y0, tn, h, cParam) {
    // y0 = [N, M, D]
    let t = t0;
    let y = [...y0];
    
    let historial = { t: [t], N: [y[0]], M: [y[1]], D: [y[2]] };

    // Ecuaciones de dinámica social provistas por el desafío
    function ecuaciones(t, vars) {
        let N = vars[0];
        let M = vars[1];
        let D = vars[2];

        let a = 0.005; // Tasa de contagio
        let b = 0.02;  // Retorno a neutralidad
        let c = cParam;// Efectividad del diálogo
        let k = 0.04;  // Reacción institucional
        let r = 0.03;  // Desgaste de mediadores

        let dN = -a * N * M + b * D;
        let dM = a * N * M - c * M * D;
        let dD = k * M - r * D;

        return [dN, dM, dD];
    }

    while (t < tn) {
        let k1 = ecuaciones(t, y);
        
        let y_k2 = y.map((val, idx) => val + 0.5 * h * k1[idx]);
        let k2 = ecuaciones(t + 0.5 * h, y_k2);

        let y_k3 = y.map((val, idx) => val + 0.5 * h * k2[idx]);
        let k3 = ecuaciones(t + 0.5 * h, y_k3);

        let y_k4 = y.map((val, idx) => val + h * k3[idx]);
        let k4 = ecuaciones(t + h, y_k4);

        // Actualización de variables vectoriales
        for (let i = 0; i < y.length; i++) {
            y[i] = y[i] + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
            if (y[i] < 0) y[i] = 0; // Evitar poblaciones negativas
        }
        t += h;

        historial.t.push(t.toFixed(1));
        historial.N.push(y[0]);
        historial.M.push(y[1]);
        historial.D.push(y[2]);
    }

    return historial;
}