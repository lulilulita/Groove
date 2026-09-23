

// Validar correo según dominios permitidos
function esCorreoValido(correo) {
  const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
  return regex.test(correo.trim());
}

// Validar RUN chileno sin puntos ni guión (Ej: 19011022K)
function esRunValido(run) {
  const cleanRun = run.trim().toUpperCase();
  if (!/^[0-9]{7,8}[0-9K]$/.test(cleanRun)) return false;

  const cuerpo = cleanRun.slice(0, -1);
  let dv = cleanRun.slice(-1);

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  let dvEsperado = 11 - (suma % 11);
  if (dvEsperado === 11) dvEsperado = '0';
  else if (dvEsperado === 10) dvEsperado = 'K';
  else dvEsperado = dvEsperado.toString();

  return dv === dvEsperado;
}