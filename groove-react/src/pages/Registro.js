import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { esCorreoValido, esRunValido } from '../data/validaciones';
import { regionesYComunas } from '../data/regionesComunas';
import { registrarUsuario } from '../data/usuariosDB';

const FORM_VACIO = {
  run: '',
  nombre: '',
  apellidos: '',
  email: '',
  password: '',
  confirmar: '',
  fechaNacimiento: '',
  region: '',
  comuna: '',
  direccion: '',
};

function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState(FORM_VACIO);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  const regionElegida = regionesYComunas.find((r) => r.region === form.region);
  const comunas = regionElegida ? regionElegida.comunas : [];

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    // Al cambiar la región, se reinicia la comuna
    setForm({ ...form, [name]: value, ...(name === 'region' ? { comuna: '' } : {}) });
  };

  const validar = () => {
    const nuevos = {};

    if (!esRunValido(form.run)) {
      nuevos.run = 'RUN inválido. Formato: 7-8 dígitos + DV, sin puntos ni guión (Ej: 19011022K).';
    }

    if (!form.nombre.trim()) {
      nuevos.nombre = 'El nombre es obligatorio.';
    } else if (form.nombre.length > 50) {
      nuevos.nombre = 'El nombre no puede superar los 50 caracteres.';
    }

    if (!form.apellidos.trim()) {
      nuevos.apellidos = 'Los apellidos son obligatorios.';
    } else if (form.apellidos.length > 100) {
      nuevos.apellidos = 'Los apellidos no pueden superar los 100 caracteres.';
    }

    if (!form.email.trim()) {
      nuevos.email = 'El correo es obligatorio.';
    } else if (form.email.length > 100) {
      nuevos.email = 'El correo no puede superar los 100 caracteres.';
    } else if (!esCorreoValido(form.email)) {
      nuevos.email = 'Correo inválido. Permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com.';
    }

    if (!form.password) {
      nuevos.password = 'La contraseña es obligatoria.';
    } else if (form.password.length < 4 || form.password.length > 10) {
      nuevos.password = 'La contraseña debe tener entre 4 y 10 caracteres.';
    }

    if (form.confirmar !== form.password) {
      nuevos.confirmar = 'Las contraseñas no coinciden.';
    }

    if (!form.region) nuevos.region = 'Selecciona una región.';
    if (!form.comuna) nuevos.comuna = 'Selecciona una comuna.';

    if (!form.direccion.trim()) {
      nuevos.direccion = 'La dirección es obligatoria.';
    } else if (form.direccion.length > 300) {
      nuevos.direccion = 'La dirección no puede superar los 300 caracteres.';
    }

    return nuevos;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    setErrorGeneral('');
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    try {
      registrarUsuario({
        run: form.run,
        nombre: form.nombre.trim(),
        apellidos: form.apellidos.trim(),
        email: form.email,
        password: form.password,
        fechaNacimiento: form.fechaNacimiento,
        region: form.region,
        comuna: form.comuna,
        direccion: form.direccion.trim(),
      });
    } catch (error) {
      setErrorGeneral(error.message);
      return;
    }

    window.alert('Cuenta creada con éxito. Ahora puedes iniciar sesión.');
    navigate('/login');
  };

  const campo = (name, etiqueta, { tipo = 'text', col = 'col-12', placeholder = '' } = {}) => (
    <div className={col}>
      <label htmlFor={name} className="form-label">{etiqueta}</label>
      <input
        id={name}
        name={name}
        type={tipo}
        placeholder={placeholder}
        className={`form-control ${errores[name] ? 'is-invalid' : ''}`}
        value={form[name]}
        onChange={manejarCambio}
      />
      <div className="invalid-feedback">{errores[name]}</div>
    </div>
  );

  return (
    <div className="col-lg-8 mx-auto">
      <h2 className="text-center mb-4">Registro de usuario</h2>

      {errorGeneral && <div className="alert alert-danger">{errorGeneral}</div>}

      <form onSubmit={manejarEnvio} noValidate>
        <div className="row g-3">
          {campo('run', 'RUN (sin puntos ni guión, Ej: 19011022K) *', { placeholder: '19011022K' })}
          {campo('nombre', 'Nombre *', { col: 'col-md-6' })}
          {campo('apellidos', 'Apellidos *', { col: 'col-md-6' })}
          {campo('email', 'Correo electrónico *', { tipo: 'email', placeholder: 'ejemplo@duoc.cl' })}
          {campo('password', 'Contraseña (4 a 10 caracteres) *', { tipo: 'password', col: 'col-md-6' })}
          {campo('confirmar', 'Confirmar contraseña *', { tipo: 'password', col: 'col-md-6' })}
          {campo('fechaNacimiento', 'Fecha de nacimiento (opcional)', { tipo: 'date' })}

          <div className="col-md-6">
            <label htmlFor="region" className="form-label">Región *</label>
            <select
              id="region"
              name="region"
              className={`form-select ${errores.region ? 'is-invalid' : ''}`}
              value={form.region}
              onChange={manejarCambio}
            >
              <option value="">-- Selecciona la región --</option>
              {regionesYComunas.map((r) => (
                <option key={r.region} value={r.region}>{r.region}</option>
              ))}
            </select>
            <div className="invalid-feedback">{errores.region}</div>
          </div>

          <div className="col-md-6">
            <label htmlFor="comuna" className="form-label">Comuna *</label>
            <select
              id="comuna"
              name="comuna"
              className={`form-select ${errores.comuna ? 'is-invalid' : ''}`}
              value={form.comuna}
              onChange={manejarCambio}
              disabled={!form.region}
            >
              <option value="">-- Selecciona la comuna --</option>
              {comunas.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="invalid-feedback">{errores.comuna}</div>
          </div>

          {campo('direccion', 'Dirección *')}
        </div>

        <button type="submit" className="btn btn-dark w-100 mt-4">Registrarse</button>
      </form>

      <p className="text-center mt-3">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
}

export default Registro;