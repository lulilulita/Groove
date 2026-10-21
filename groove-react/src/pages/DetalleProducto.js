import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { obtenerProducto } from '../data/productosDB';

function DetalleProducto({ onAgregar }) {
  const { codigo } = useParams();
  const producto = obtenerProducto(codigo);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  if (!producto) {
    return (
      <div>
        <h2>Producto no encontrado</h2>
        <Link to="/productos">Volver a productos</Link>
      </div>
    );
  }

  const manejarAgregar = () => {
    onAgregar(producto, cantidad);
    setAgregado(true);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
        </ol>
      </nav>

      <div className="row g-4">
        <div className="col-md-5">
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded shadow-sm" />
        </div>

        <div className="col-md-7">
          <h2>{producto.nombre}</h2>
          <p className="text-muted">Código: {producto.codigo}</p>
          <p className="fs-3 fw-bold">${producto.precio.toLocaleString('es-CL')}</p>
          <p>{producto.descripcion}</p>

          <div className="d-flex align-items-center gap-3 my-3">
            <label htmlFor="cantidad" className="form-label mb-0">Cantidad</label>
            <input
              id="cantidad"
              type="number"
              min="1"
              className="form-control w-auto"
              value={cantidad}
              onChange={(e) => {
                setCantidad(Math.max(1, Number(e.target.value) || 1));
                setAgregado(false);
              }}
            />
          </div>

          <button className="btn btn-dark" onClick={manejarAgregar}>
            Añadir al carrito
          </button>

          {agregado && (
            <div className="alert alert-success mt-3">Producto añadido al carrito.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;