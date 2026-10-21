import { useState } from 'react';
import { esCorreoValido } from '../data/validaciones';

const FORM_VACIO = { nombre: '', email: '', asunto: '', mensaje: '' };

function Contacto() {
  const [form, setForm] = useState(FORM_VACIO);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setEnviado(false);
  };

  const validar = () => {
    const nuevos = {};

    if (!form.nombre.trim()) {
      nuevos.nombre = 'El nombre es obligatorio.';
    } else if (form.nombre.length > 100) {
      nuevos.nombre = 'El nombre no puede superar los 100 caracteres.';
    }

    if (!form.email.trim()) {
      nuevos.email = 'El correo es obligatorio.';
    } else if (form.email.length > 100) {
      nuevos.email = 'El correo no puede superar los 100 caracteres.';
    } else if (!esCorreoValido(form.email)) {
      nuevos.email = 'Correo inválido. Permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com.';
    }

    if (!form.asunto.trim()) {
      nuevos.asunto = 'El asunto es obligatorio.';
    }

    if (!form.mensaje.trim()) {
      nuevos.mensaje = 'El mensaje no puede estar vacío.';
    } else if (form.mensaje.length > 500) {
      nuevos.mensaje = 'El mensaje no puede superar los 500 caracteres.';
    }

    return nuevos;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    setEnviado(true);
    setForm(FORM_VACIO);
  };

  return (
    <div className="col-md-8 col-lg-6 mx-auto">
      <h2 className="text-center">Contáctanos</h2>
      <p className="text-center text-muted mb-4">
        ¿Tienes dudas sobre algún vinilo o pedido? Escríbenos.
      </p>

      {enviado && (
        <div className="alert alert-success">
          ¡Mensaje enviado con éxito! Te responderemos a la brevedad.
        </div>
      )}

      <form onSubmit={manejarEnvio} noValidate>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre completo *</label>
          <input
            id="nombre"
            name="nombre"
            className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
            value={form.nombre}
            onChange={manejarCambio}
          />
          <div className="invalid-feedback">{errores.nombre}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico *</label>
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
          <label htmlFor="asunto" className="form-label">Asunto *</label>
          <input
            id="asunto"
            name="asunto"
            placeholder="Ej: Consulta sobre stock"
            className={`form-control ${errores.asunto ? 'is-invalid' : ''}`}
            value={form.asunto}
            onChange={manejarCambio}
          />
          <div className="invalid-feedback">{errores.asunto}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label">Mensaje *</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="5"
            placeholder="Escribe tu mensaje aquí..."
            className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
            value={form.mensaje}
            onChange={manejarCambio}
          />
          <div className="form-text">{form.mensaje.length} / 500 caracteres</div>
          <div className="invalid-feedback">{errores.mensaje}</div>
        </div>

        <button type="submit" className="btn btn-dark w-100">Enviar mensaje</button>
      </form>
    </div>
  );
}

export default Contacto;