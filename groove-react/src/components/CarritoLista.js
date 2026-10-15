import { calcularTotal } from '../data/carrito';

function CarritoLista({ items, onEliminar }) {
  if (items.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.codigo}>
              <td>{item.nombre}</td>
              <td>${item.precio.toLocaleString('es-CL')}</td>
              <td>{item.cantidad}</td>
              <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onEliminar(item.codigo)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="fw-bold">Total: ${calcularTotal(items).toLocaleString('es-CL')}</p>
    </div>
  );
}

export default CarritoLista;