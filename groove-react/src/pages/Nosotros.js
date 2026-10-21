function Nosotros() {
  return (
    <div className="text-center">
      <section className="mb-5">
        <h2>¿Quiénes somos?</h2>
        <div className="mx-auto" style={{ maxWidth: '800px' }}>
          <p>
            Groove es una tienda chilena dedicada a mantener viva la cultura del vinilo.
            Creemos que la música suena distinta cuando se escucha en un formato físico,
            con todos sus rituales: sacar el disco de su funda, ponerlo en la tornamesa
            y dejar que suene de lado a lado.
          </p>
          <p>
            Trabajamos con sellos nacionales e internacionales para traer tanto ediciones
            de colección como los últimos lanzamientos en vinilo, además de tornamesas,
            accesorios y todo lo necesario para cuidar tu colección.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=700"
          alt="Colección de discos de vinilo"
          className="img-fluid d-block mx-auto rounded shadow-sm"
          style={{ maxWidth: '700px' }}
        />
      </section>

      <section className="mb-5">
        <h2>El equipo</h2>
        <div className="mx-auto" style={{ maxWidth: '800px' }}>
          <p>
            Groove nació en 2025 gracias a Sylvie y Glace, dos melómanos que
            decidieron transformar su pasión por el audio analógico en un proyecto real.
            Hoy el equipo sigue creciendo, siempre con la misma idea: acercar el vinilo
            a nuevas generaciones sin perder el respeto por los coleccionistas de siempre.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/flagged/photo-1574134299924-c9f3d4196de2?q=80&w=1170&auto=format&fit=crop"
          alt="Equipo de Groove Vinilos"
          className="img-fluid d-block mx-auto rounded shadow-sm"
          style={{ maxWidth: '700px' }}
        />
      </section>

      <section className="mb-5">
        <h2>El arte del sonido analógico</h2>
        <p>Descubre cómo se fabrican los discos de vinilo que tanto nos apasionan.</p>
        <div className="d-flex justify-content-center">
          <div className="ratio ratio-16x9 shadow-sm" style={{ maxWidth: '800px' }}>
            <iframe
              src="https://www.youtube.com/embed/KfibEYQNhjA"
              title="Fabricación de vinilos"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Nosotros;