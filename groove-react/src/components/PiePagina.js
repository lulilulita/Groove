function PiePagina() {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <div className="container text-center">
        <p className="mb-3">&copy; 2026 Groove Vinilos. Todos los derechos reservados.</p>
        <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-4 mb-0">
          <li>
            <a className="link-light" href="https://www.discogs.com" target="_blank" rel="noopener noreferrer">
              Discogs
            </a>
          </li>
          <li>
            <a className="link-light" href="https://www.riaa.com" target="_blank" rel="noopener noreferrer">
              RIAA
            </a>
          </li>
          <li>
            <a className="link-light" href="https://www.recordstoreday.com" target="_blank" rel="noopener noreferrer">
              Record Store Day
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default PiePagina;