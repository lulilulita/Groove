import { productos as productosIniciales } from './productos';

const CLAVE = 'groove_productos';

function cargar() {
  const guardado = localStorage.getItem(CLAVE);
  if (guardado) return JSON.parse(guardado);
  localStorage.setItem(CLAVE, JSON.stringify(productosIniciales));
  return [...productosIniciales];
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

// READ
export function obtenerProductos() {
  return cargar();
}

export function obtenerProducto(codigo) {
  return cargar().find((p) => p.codigo === codigo);
}

// CREATE
export function crearProducto(producto) {
  const lista = cargar();
  if (lista.some((p) => p.codigo === producto.codigo)) {
    throw new Error('Ya existe un producto con ese código.');
  }
  lista.push(producto);
  guardar(lista);
  return producto;
}

// UPDATE
export function actualizarProducto(codigo, cambios) {
  const lista = cargar();
  const i = lista.findIndex((p) => p.codigo === codigo);
  if (i === -1) return null;
  lista[i] = { ...lista[i], ...cambios, codigo };
  guardar(lista);
  return lista[i];
}

// DELETE
export function eliminarProducto(codigo) {
  const lista = cargar();
  const nueva = lista.filter((p) => p.codigo !== codigo);
  guardar(nueva);
  return nueva.length < lista.length;
}