// Usuarios predeterminados
const usuarios = [
    { usuario: "usuario1", clave: "1234" },
    { usuario: "usuario2", clave: "4321" },
    { usuario: "admin", clave: "admin1234" }
];

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error");

    const encontrado = usuarios.find(u => u.usuario === user && u.clave === pass);

    if (encontrado) {
        // Acceso permitido
        localStorage.setItem("usuarioActual", user);
        window.location.href = "../index.html"; // Cambia esto según tu página principal
    } else {
        errorMsg.textContent = "Usuario o contraseña incorrectos.";
    }
});
