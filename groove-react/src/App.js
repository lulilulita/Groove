import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BarraNavegacion from './components/BarraNavegacion';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import { obtenerCarrito, agregarAlCarrito, eliminarDelCarrito } from './data/carrito';
import AdminProductos from './pages/AdminProductos';
import DetalleProducto from './pages/DetalleProducto';

function App() {
  const [items, setItems] = useState(() => obtenerCarrito());

  const manejarAgregar = (producto, cantidad = 1) => {
  setItems(agregarAlCarrito(producto, cantidad));
  };

  const manejarEliminar = (codigo) => {
    setItems(eliminarDelCarrito(codigo));
  };

  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0);

  return (
    <BrowserRouter>
      <BarraNavegacion cantidad={cantidadTotal} />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos onAgregar={manejarAgregar} />} />
          <Route path="/carrito" element={<Carrito items={items} onEliminar={manejarEliminar} />} />
          <Route path="/admin" element={<AdminProductos />} />
          <Route path="/producto/:codigo" element={<DetalleProducto onAgregar={manejarAgregar} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;