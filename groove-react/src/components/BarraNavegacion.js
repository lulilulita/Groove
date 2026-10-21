import { NavLink } from 'react-router-dom';

function BarraNavegacion({ cantidad }) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Groove</NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Mostrar menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
                <NavLink className="nav-link" to="/admin">Administración</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">Productos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/blogs">Blogs</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
            </li>
          </ul>
          
          <NavLink className="btn btn-outline-light" to="/carrito">
            🛒 Carrito <span className="badge bg-light text-dark">{cantidad}</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default BarraNavegacion;