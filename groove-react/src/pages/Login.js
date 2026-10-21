import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { esCorreoValido } from '../data/validaciones';
import { iniciarSesion } from '../data/usuariosDB';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const nuevos = {};

    if (!form.email.trim()) {
      nuevos.email = 'Ingresa tu correo.';
    } else if (form.email.length > 100) {
      nuevos.email = 'El correo no puede superar los 100 caracteres.';
    } else if (!esCorreoValido(form.email)) {
      nuevos.email = 'Correo inválido. Permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com.';
    }

    if (!form.password) {
      nuevos.password = 'Ingresa tu contraseña.';
    } else if (form.password.length < 4 || form.password.length > 10) {
      nuevos.password = 'La contraseña debe tener entre 4 y 10 caracteres.';
    }

    return nuevos;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    const usuario = iniciarSesion(form.email, form.password);
    if (!usuario) {
      setErrores({ password: 'Correo o contraseña incorrectos.' });
      return;
    }

    onLogin(usuario);
    navigate('/');
  };

  return (
    <div className="col-md-6 col-lg-4 mx-auto">
      <h2 className="text-center mb-4">Iniciar sesión</h2>

      <form onSubmit={manejarEnvio} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="ejemplo@duoc.cl"
            className={`form-control ${errores.email ? 'is-invalid' : ''}`}
            value={form.email}
            onChange={manejarCambio}
          />
          <div className="invalid-feedback">{errores.email}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            className={`form-control ${errores.password ? 'is-invalid' : ''}`}
            value={form.password}
            onChange={manejarCambio}
          />
          <div className="invalid-feedback">{errores.password}</div>
        </div>

        <button type="submit" className="btn btn-dark w-100">Ingresar</button>
      </form>

      <p className="text-center mt-3">
        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;