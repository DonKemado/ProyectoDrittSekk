// Función para enviar solicitud
function enviarSolicitud(destinatario) {
    const remitente = localStorage.getItem("usuarioActual");
    if (!remitente) return alert("Debes iniciar sesión para enviar solicitudes.");

    let solicitudes = JSON.parse(localStorage.getItem("solicitudesAmistad")) || [];

    // Evitar duplicados
    if (solicitudes.some(s => s.remitente === remitente && s.destinatario === destinatario)) {
        return alert("Ya has enviado una solicitud a ese usuario.");
    }

    solicitudes.push({ remitente, destinatario });
    localStorage.setItem("solicitudesAmistad", JSON.stringify(solicitudes));
    alert("Solicitud enviada a " + destinatario);
    mostrarNotificaciones(); // refrescar
}

// Función para aceptar una solicitud
function aceptarSolicitud(remitente) {
    const actual = localStorage.getItem("usuarioActual");
    let solicitudes = JSON.parse(localStorage.getItem("solicitudesAmistad")) || [];
    solicitudes = solicitudes.filter(s => !(s.remitente === remitente && s.destinatario === actual));
    localStorage.setItem("solicitudesAmistad", JSON.stringify(solicitudes));

    // Guardar amistad
    let amistades = JSON.parse(localStorage.getItem("amistades")) || [];
    amistades.push({ usuario1: actual, usuario2: remitente });
    localStorage.setItem("amistades", JSON.stringify(amistades));

    alert("Has aceptado la solicitud de " + remitente);
    mostrarNotificaciones(); // refrescar
}


// Mostrar solicitudes si estás logueado
function mostrarNotificaciones() {
    const actual = localStorage.getItem("usuarioActual");
    const contenedor = document.getElementById("contenedorNotificaciones");
    contenedor.innerHTML = "";

    if (!actual) {
        contenedor.innerHTML = "<p>Debes iniciar sesión para ver notificaciones.</p>";
        return;
    }

    const solicitudes = JSON.parse(localStorage.getItem("solicitudesAmistad")) || [];
    const recibidas = solicitudes.filter(s => s.destinatario === actual);

    if (recibidas.length === 0) {
        contenedor.innerHTML = "<p>No tienes solicitudes.</p>";
        return;
    }

    recibidas.forEach(s => {
        const div = document.createElement("div");
        div.className = "solicitud";

        div.innerHTML = `
            <p><strong>${s.remitente}</strong> te ha enviado una solicitud.</p>
            <button onclick="aceptarSolicitud('${s.remitente}')">Aceptar</button>
        `;
        contenedor.appendChild(div);
    });
}

// Mostrar automáticamente al cargar
window.addEventListener("DOMContentLoaded", mostrarNotificaciones);
