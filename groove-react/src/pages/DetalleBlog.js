import { Link, useParams } from 'react-router-dom';
import { blogs } from '../data/blogs';

function DetalleBlog() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div>
        <h2>Artículo no encontrado</h2>
        <Link to="/blogs">Volver a blogs</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto" style={{ maxWidth: '800px' }}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/blogs">Blogs</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{blog.titulo}</li>
        </ol>
      </nav>

      <h2 className="mb-3">{blog.titulo}</h2>
      <img src={blog.imagen} alt={blog.alt} className="img-fluid rounded shadow-sm mb-4" />
      {blog.parrafos.map((parrafo, i) => (
        <p key={i}>{parrafo}</p>
      ))}
    </div>
  );
}

export default DetalleBlog;