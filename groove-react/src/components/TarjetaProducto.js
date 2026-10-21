import { Link } from 'react-router-dom';

function TarjetaProducto({ producto, onAgregar }) {
  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/producto/${producto.codigo}`}>
        <img
          src={producto.imagen}
          className="card-img-top"
          alt={producto.nombre}
          style={{ height: '180px', objectFit: 'cover' }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          <Link to={`/producto/${producto.codigo}`} className="text-dark text-decoration-none">
            {producto.nombre}
          </Link>
        </h5>
        <p className="card-text text-muted small">{producto.descripcion}</p>
        <p className="fw-bold mt-auto">${producto.precio.toLocaleString('es-CL')}</p>
        <button className="btn btn-dark" onClick={() => onAgregar(producto)}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

export default TarjetaProducto;