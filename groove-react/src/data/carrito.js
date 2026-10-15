const CLAVE = 'groove_carrito';

export function obtenerCarrito() {
  const guardado = localStorage.getItem(CLAVE);
  return guardado ? JSON.parse(guardado) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE, JSON.stringify(carrito));
}

export function agregarAlCarrito(producto, cantidad = 1) {
  const carrito = obtenerCarrito();
  const existente = carrito.find((item) => item.codigo === producto.codigo);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({
      codigo: producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad,
    });
  }

  guardarCarrito(carrito);
  return carrito;
}

export function eliminarDelCarrito(codigo) {
  const carrito = obtenerCarrito().filter((item) => item.codigo !== codigo);
  guardarCarrito(carrito);
  return carrito;
}

export function vaciarCarrito() {
  guardarCarrito([]);
}

export function calcularTotal(carrito) {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}