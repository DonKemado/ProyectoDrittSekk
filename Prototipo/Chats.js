function mostrarChats() {
    const actual = localStorage.getItem("usuarioActual");
    const contenedor = document.getElementById("Chats");
    contenedor.innerHTML = "<h3>Chats</h3>";

    if (!actual) {
        contenedor.innerHTML += "<p>Debes iniciar sesión para ver tus chats.</p>";
        return;
    }

    const amistades = JSON.parse(localStorage.getItem("amistades")) || [];
    const amigos = amistades
        .filter(a => a.usuario1 === actual || a.usuario2 === actual)
        .map(a => a.usuario1 === actual ? a.usuario2 : a.usuario1);

    if (amigos.length === 0) {
        contenedor.innerHTML += "<p>No tienes amigos aún.</p>";
        return;
    }

    amigos.forEach(nombre => {
        const div = document.createElement("div");
        div.textContent = nombre;
        div.style.cursor = "pointer";
        div.onclick = () => abrirChat(nombre);
        contenedor.appendChild(div);
    });
}

function abrirChat(conAmigo) {
    alert("Aquí abrirías el chat con: " + conAmigo);
}

// Ejecutar al cargar
window.addEventListener("DOMContentLoaded", mostrarChats);
