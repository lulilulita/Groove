import { useState } from 'react';
import { obtenerProductos } from '../data/productosDB';
import TarjetaProducto from '../components/TarjetaProducto';

function Productos({ onAgregar }) {
  const productos = obtenerProductos();
  const [busqueda, setBusqueda] = useState('');

  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-3">Nuestros productos</h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {filtrados.length === 0 && <p>No se encontraron productos.</p>}

      <div className="row g-4">
        {filtrados.map((producto) => (
          <div className="col-12 col-sm-6 col-lg-3" key={producto.codigo}>
            <TarjetaProducto producto={producto} onAgregar={onAgregar} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;