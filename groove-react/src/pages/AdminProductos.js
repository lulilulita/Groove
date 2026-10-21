import { useState } from 'react';
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../data/productosDB';

const FORM_VACIO = { codigo: '', nombre: '', descripcion: '', precio: '', imagen: '' };
const IMAGEN_POR_DEFECTO = 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600';

function AdminProductos() {
  const [lista, setLista] = useState(() => obtenerProductos());
  const [form, setForm] = useState(FORM_VACIO);
  const [editando, setEditando] = useState(null);
  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const nuevos = {};
    if (form.codigo.trim().length < 3) {
      nuevos.codigo = 'El código debe tener al menos 3 caracteres.';
    }
    if (!form.nombre.trim()) {
      nuevos.nombre = 'El nombre es obligatorio.';
    } else if (form.nombre.length > 100) {
      nuevos.nombre = 'El nombre no puede superar los 100 caracteres.';
    }
    if (form.descripcion.length > 500) {
      nuevos.descripcion = 'La descripción no puede superar los 500 caracteres.';
    }
    const precio = Number(form.precio);
    if (form.precio === '' || isNaN(precio) || precio < 0) {
      nuevos.precio = 'El precio debe ser un número mayor o igual a 0.';
    }
    return nuevos;
  };

  const cancelar = () => {
    setForm(FORM_VACIO);
    setEditando(null);
    setErrores({});
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    const datos = {
      codigo: form.codigo.trim(),
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      imagen: form.imagen.trim() || IMAGEN_POR_DEFECTO,
    };

    try {
      if (editando) {
        actualizarProducto(editando, datos);
      } else {
        crearProducto(datos);
      }
    } catch (error) {
      setErrores({ codigo: error.message });
      return;
    }

    setLista(obtenerProductos());
    cancelar();
  };

  const iniciarEdicion = (producto) => {
    setEditando(producto.codigo);
    setForm({
      codigo: producto.codigo,
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      precio: String(producto.precio),
      imagen: producto.imagen || '',
    });
    setErrores({});
  };

  const manejarEliminar = (codigo) => {
    if (!window.confirm('¿Seguro que quieres eliminar este producto?')) return;
    eliminarProducto(codigo);
    setLista(obtenerProductos());
  };

  return (
    <div>
      <h2 className="mb-4">Administración de productos</h2>

      <div className="table-responsive mb-5">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((p) => (
              <tr key={p.codigo}>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>${p.precio.toLocaleString('es-CL')}</td>
                <td>
                  <button
                    className="btn btn-dark btn-sm me-2"
                    onClick={() => iniciarEdicion(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => manejarEliminar(p.codigo)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{editando ? 'Editar producto' : 'Agregar nuevo producto'}</h3>
      <form onSubmit={manejarEnvio} noValidate className="col-md-8 col-lg-6">
        <div className="mb-3">
          <label htmlFor="codigo" className="form-label">Código *</label>
          <input
            id="codigo"
            name="codigo"
            className={`form-control ${errores.codigo ? 'is-invalid' : ''}`}
            value={form.codigo}
            onChange={manejarCambio}
            disabled={editando !== null}
          />
          <div className="invalid-feedback">{errores.codigo}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre *</label>
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
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="3"
            className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
            value={form.descripcion}
            onChange={manejarCambio}
          />
          <div className="invalid-feedback">{errores.descripcion}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio *</label>
          <input
            id="precio"
            name="precio"
            type="number"
            className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
            value={form.precio}
            onChange={manejarCambio}
          />
          <div className="invalid-feedback">{errores.precio}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">URL de la imagen</label>
          <input
            id="imagen"
            name="imagen"
            className="form-control"
            value={form.imagen}
            onChange={manejarCambio}
          />
        </div>

        <button type="submit" className="btn btn-dark me-2">
          {editando ? 'Guardar cambios' : 'Agregar producto'}
        </button>
        {editando && (
          <button type="button" className="btn btn-outline-secondary" onClick={cancelar}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}

export default AdminProductos;