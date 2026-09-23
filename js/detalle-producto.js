// 1. Leer el parámetro "codigo" desde la URL
const parametros = new URLSearchParams(window.location.search);
const codigoBuscado = parametros.get("codigo");

// 2. Buscar en el arreglo el producto con ese código
const producto = productos.find(p => p.codigo === codigoBuscado);

// 3. Si lo encontramos, mostrarlo en la página
if (producto) {
  document.getElementById("detalle-nombre").textContent = producto.nombre;
  document.getElementById("detalle-nombre-miga").textContent = producto.nombre;
  document.getElementById("detalle-precio").textContent = "$" + producto.precio.toLocaleString("es-CL");
  document.getElementById("detalle-codigo").textContent = producto.codigo;
  document.getElementById("detalle-descripcion").textContent = producto.descripcion;
  document.getElementById("detalle-img").src = producto.imagen;
  document.getElementById("detalle-img").alt = producto.nombre;
} else {
  document.getElementById("detalle-nombre").textContent = "Producto no encontrado";
  document.getElementById("detalle-descripcion").textContent = "El producto que buscas no existe.";
}

// 4. Lógica para añadir al carrito al presionar el botón
document.addEventListener("DOMContentLoaded", () => {
  const btnAñadir = document.getElementById("btn-añadir-detalle");

  if (btnAñadir) {
    btnAñadir.addEventListener("click", () => {
      if (!producto) {
        alert("No se puede agregar un producto que no existe.");
        return;
      }

      // Obtener la cantidad digitada por el usuario
      const cantidadInput = document.getElementById("cantidad");
      const cantidad = parseInt(cantidadInput.value) || 1;

      // Llamar a la función de tu js/carrito.js
      if (typeof agregarAlCarrito === "function") {
        agregarAlCarrito(producto.codigo, producto.nombre, producto.precio, cantidad);
      } else {
        alert("Error: Asegúrate de cargar js/carrito.js en el HTML antes de este archivo.");
      }
    });
  }
});