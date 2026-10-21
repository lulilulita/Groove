import { NavLink } from 'react-router-dom';

function BarraNavegacion({ cantidad, usuario, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">Administración</NavLink>
            </li>
          </ul>

          <div className="d-flex flex-wrap align-items-center gap-2">
            {usuario ? (
              <>
                <span className="text-light">Hola, {usuario.nombre}</span>
                <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <NavLink className="btn btn-outline-light btn-sm" to="/login">Iniciar sesión</NavLink>
                <NavLink className="btn btn-light btn-sm" to="/registro">Crear cuenta</NavLink>
              </>
            )}

            <NavLink className="btn btn-outline-light" to="/carrito">
              🛒 Carrito <span className="badge bg-light text-dark">{cantidad}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default BarraNavegacion;