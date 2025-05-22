function generarCalendario() {
    const contenedor = document.getElementById("calendario-contenedor");
    const calendarioDiv = document.getElementById("Calendario");
    contenedor.innerHTML = "";

    // Usamos el año y mes actual
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth(); // 0-11 (Enero-Diciembre)
    const diasEnMes = new Date(año, mes + 1, 0).getDate();

    // Día aleatorio como "hoy" (puede ser cualquier día del mes actual)
    const diaAleatorio = Math.floor(Math.random() * diasEnMes) + 1;

    // Nombres del mes
    const nombresMeses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    calendarioDiv.querySelector("h3").innerText = `${nombresMeses[mes]} ${año}`;

    // Días originales y aleatorizados
    const diasOriginales = ["D", "L", "M", "X", "J", "V", "S"];
    const diasBarajados = [...diasOriginales].sort(() => Math.random() - 0.5);

    // Mapa de día real (0-6) → posición en el grid
    const mapaDiaAColumna = {};
    diasBarajados.forEach((letra, indice) => {
        mapaDiaAColumna[letra] = indice;
    });

    // Encabezados con orden barajado
    for (let i = 0; i < 7; i++) {
        const encabezado = document.createElement("div");
        encabezado.innerText = diasBarajados[i];
        encabezado.style.fontWeight = "bold";
        contenedor.appendChild(encabezado);
    }

    // Objeto para agrupar los días por su día de la semana
    const diasPorSemana = {};
    diasOriginales.forEach(letra => {
        diasPorSemana[letra] = [];
    });

    // Agrupar los días por su día de la semana
    for (let dia = 1; dia <= diasEnMes; dia++) {
        const fecha = new Date(año, mes, dia);
        const diaSemanaReal = fecha.getDay(); // 0 = Domingo ... 6 = Sábado
        const letraDia = diasOriginales[diaSemanaReal];
        diasPorSemana[letraDia].push(dia);
    }

    // Barajar los días dentro de cada grupo de día de la semana
    for (const letra in diasPorSemana) {
        diasPorSemana[letra] = diasPorSemana[letra].sort(() => Math.random() - 0.5);
    }

    // Crear celdas vacías para 6 filas x 7 columnas = 42 espacios
    const calendarioCeldas = new Array(42).fill(null);

    // Llenar las celdas con los días barajados por columna
    for (const letra in diasPorSemana) {
        const columna = mapaDiaAColumna[letra];
        const dias = diasPorSemana[letra];

        let fila = 0;
        for (const dia of dias) {
            const posicion = fila * 7 + columna;
            calendarioCeldas[posicion] = dia;
            fila++;
        }
    }

    // Insertar en el DOM
    calendarioCeldas.forEach(dia => {
        const celda = document.createElement("div");
        if (dia !== null) {
            celda.innerText = dia;
            if (dia === diaAleatorio) {
                celda.classList.add("hoy");
            }
        }
        contenedor.appendChild(celda);
    });
}

document.addEventListener("DOMContentLoaded", generarCalendario);