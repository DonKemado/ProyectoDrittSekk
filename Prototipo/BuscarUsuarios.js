function buscarUsuario() {
    const termino = document.getElementById("inputBusqueda").value.toLowerCase();
    const usuarioActual = localStorage.getItem("usuarioActual");
    const resultados = document.getElementById("resultadosBusqueda");
    resultados.innerHTML = "";

    console.log("Usuario actual:", usuarioActual); // Depuración

    if (!usuarioActual) {
        resultados.innerHTML = "<p>Debes iniciar sesión para buscar usuarios.</p>";
        resultados.style.display = "block"; // Mostrar el contenedor
        return;
    }

    const todosUsuarios = ["usuario1", "usuario2"];
    let visibles = [];

    if (usuarioActual === "admin") {
        visibles = todosUsuarios;
    } else if (usuarioActual === "usuario1") {
        visibles = ["usuario2"];
    } else if (usuarioActual === "usuario2") {
        visibles = ["usuario1"];
    }

    if (visibles.length === 0) {
        resultados.innerHTML = "<p>No hay usuarios visibles para tu cuenta.</p>";
        resultados.style.display = "block"; // Mostrar el contenedor
        return;
    }

    const encontrados = termino ? visibles.filter(u => u.includes(termino)) : visibles;

    if (encontrados.length === 0) {
        resultados.innerHTML = "<p>No se encontraron usuarios.</p>";
        resultados.style.display = "block"; // Mostrar el contenedor
        return;
    }

    encontrados.forEach(nombre => {
        const div = document.createElement("div");
        div.className = "resultadoUsuario";
        div.innerHTML = `
            <p><strong>${nombre}</strong></p>
            <button onclick="enviarSolicitud('${nombre}')">Enviar solicitud</button>
        `;
        resultados.appendChild(div);
    });

    resultados.style.display = "block"; // Mostrar el contenedor
}

// Añade un event listener para el input
document.getElementById("inputBusqueda").addEventListener("input", buscarUsuario);