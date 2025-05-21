document.addEventListener("DOMContentLoaded", function () {
    const usuario = localStorage.getItem("usuarioActual");
    let opciones;

    if (usuario) {
        opciones = [
            { nombre: "Bienvenida" },
            { nombre: "Cerrar sesión", enlace: "#", esBoton: true },
            { nombre: "Opción Y", enlace: "paginaY.html" },
            { nombre: "Opción Z", enlace: "paginaZ.html" },
            { nombre: "Opción A", enlace: "paginaA.html" },
            { nombre: "Opción B", enlace: "paginaB.html" },
            { nombre: "Opción C", enlace: "paginaC.html" },
            { nombre: "Opción D", enlace: "paginaD.html" }
        ];
    } else {
        opciones = [
            { nombre: "Login", enlace: "./Otras/prototipoLogin.html" },
            { nombre: "Opción Y", enlace: "paginaY.html" },
            { nombre: "Opción Z", enlace: "paginaZ.html" },
            { nombre: "Opción A", enlace: "paginaA.html" },
            { nombre: "Opción B", enlace: "paginaB.html" },
            { nombre: "Opción C", enlace: "paginaC.html" },
            { nombre: "Opción D", enlace: "paginaD.html" }
        ];
    }

    function mezclar(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function cerrarSesion() {
        localStorage.removeItem("usuarioActual");
        window.location.href = "index.html"; // o location.reload();
    }

    function generarMenu() {
        const contenedor = document.getElementById("MenuBurguer");
        contenedor.innerHTML = "";
        const opcionesMezcladas = mezclar([...opciones]);

        opcionesMezcladas.forEach(opcion => {
            if (opcion.nombre === "Bienvenida") {
                const info = document.createElement("span");
                info.textContent = `Bienvenido ${usuario}`;
                contenedor.appendChild(info);
            } else if (opcion.esBoton) {
                const boton = document.createElement("button");
                boton.textContent = "Cerrar sesión";
                boton.style.margin = "0 10px";
                boton.style.cursor = "pointer";
                boton.addEventListener("click", cerrarSesion);
                contenedor.appendChild(boton);
            } else {
                const enlace = document.createElement("a");
                enlace.textContent = opcion.nombre;
                enlace.href = opcion.enlace;
                enlace.style.margin = "0 10px";
                enlace.style.textDecoration = "none";
                contenedor.appendChild(enlace);
            }
        });
    }

    window.onload = generarMenu;
});