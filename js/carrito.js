// js/carrito.js

// --- FUNCIONES DEL CARRITO ---
function obtenerCarrito() {
    const datos = localStorage.getItem("carritoGroove");
    return datos ? JSON.parse(datos) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carritoGroove", JSON.stringify(carrito));
}

function agregarAlCarrito(codigo, nombre, precio, cantidad = 1) {
    const carrito = obtenerCarrito();
    const existente = carrito.find(item => item.codigo === codigo);

    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({ codigo, nombre, precio, cantidad });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
    alert(`¡"${nombre}" se agregó al carrito!`);
}

function eliminarDelCarrito(codigo) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.codigo !== codigo);
    guardarCarrito(carrito);
    actualizarContadorCarrito();
}

function actualizarCantidad(codigo, nuevaCantidad) {
    const carrito = obtenerCarrito();
    const item = carrito.find(item => item.codigo === codigo);
    if (item) {
        item.cantidad = Math.max(1, nuevaCantidad);
    }
    guardarCarrito(carrito);
    actualizarContadorCarrito();
}

function calcularTotal() {
    const carrito = obtenerCarrito();
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const contador = document.getElementById("carrito-cantidad");
    if (contador) {
        contador.textContent = totalItems;
    }
}

// --- FUNCIONES DE SESIÓN DE USUARIO ---
function actualizarHeaderUsuario() {
    const contenedorUsuario = document.getElementById("usuario-nav");
    if (!contenedorUsuario) return;

    const usuarioActivo = JSON.parse(localStorage.getItem("usuario_activo"));

    if (usuarioActivo) {
        // Obtener solo el primer nombre
        const primerNombre = usuarioActivo.nombre.split(" ")[0];
        
        contenedorUsuario.innerHTML = `
            <span style="font-size:14px;">👤 Hola, <strong>${primerNombre}</strong></span>
            <button onclick="cerrarSesion()" style="background:none; border:none; color:#dc3545; cursor:pointer; font-size:13px; text-decoration:underline; margin-left:6px;">Salir</button>
        `;
    } else {
        contenedorUsuario.innerHTML = `
            <a href="login.html" style="text-decoration:none; color:inherit; font-weight:bold; font-size:14px;">Ingresar</a>
        `;
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuario_activo");
    alert("Has cerrado sesión.");
    window.location.reload();
}

// Al cargar cualquier página, actualizar contador y header de usuario
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    actualizarHeaderUsuario();
});