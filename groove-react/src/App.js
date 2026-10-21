import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BarraNavegacion from './components/BarraNavegacion';
import PiePagina from './components/PiePagina';
import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import AdminProductos from './pages/AdminProductos';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import DetalleBlog from './pages/DetalleBlog';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import { obtenerCarrito, agregarAlCarrito, eliminarDelCarrito } from './data/carrito';
import { obtenerSesion, cerrarSesion } from './data/usuariosDB';

function App() {
  const [items, setItems] = useState(() => obtenerCarrito());
  const [usuario, setUsuario] = useState(() => obtenerSesion());

  const manejarAgregar = (producto, cantidad = 1) => {
    setItems(agregarAlCarrito(producto, cantidad));
  };

  const manejarEliminar = (codigo) => {
    setItems(eliminarDelCarrito(codigo));
  };

  const manejarLogin = (usuarioAutenticado) => {
    setUsuario(usuarioAutenticado);
  };

  const manejarLogout = () => {
    cerrarSesion();
    setUsuario(null);
  };

  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <BarraNavegacion cantidad={cantidadTotal} usuario={usuario} onLogout={manejarLogout} />
        <main className="container py-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home onAgregar={manejarAgregar} />} />
            <Route path="/productos" element={<Productos onAgregar={manejarAgregar} />} />
            <Route path="/producto/:codigo" element={<DetalleProducto onAgregar={manejarAgregar} />} />
            <Route path="/carrito" element={<Carrito items={items} onEliminar={manejarEliminar} />} />
            <Route path="/admin" element={<AdminProductos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:slug" element={<DetalleBlog />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login onLogin={manejarLogin} />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </main>
        <PiePagina />
      </div>
    </BrowserRouter>
  );
}

export default App;