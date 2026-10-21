const CLAVE_USUARIOS = 'groove_usuarios';
const CLAVE_SESION = 'groove_usuario_activo';

export function obtenerUsuarios() {
  const guardado = localStorage.getItem(CLAVE_USUARIOS);
  return guardado ? JSON.parse(guardado) : [];
}

export function registrarUsuario(usuario) {
  const usuarios = obtenerUsuarios();
  const email = usuario.email.trim().toLowerCase();
  const run = usuario.run.trim().toUpperCase();

  if (usuarios.some((u) => u.email === email)) {
    throw new Error('Ya existe una cuenta con ese correo.');
  }
  if (usuarios.some((u) => u.run === run)) {
    throw new Error('Ya existe una cuenta con ese RUN.');
  }

  usuarios.push({ ...usuario, email, run, tipo: 'cliente' });
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

export function iniciarSesion(email, password) {
  const usuario = obtenerUsuarios().find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password
  );
  if (!usuario) return null;
  localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
  return usuario;
}

export function obtenerSesion() {
  const guardado = localStorage.getItem(CLAVE_SESION);
  return guardado ? JSON.parse(guardado) : null;
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}