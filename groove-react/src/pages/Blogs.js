import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

function Blogs() {
  return (
    <div>
      <h2 className="text-center mb-4">Noticias importantes</h2>

      <div className="row g-4">
        {blogs.map((blog) => (
          <div className="col-12 col-md-6" key={blog.slug}>
            <div className="card h-100 shadow-sm">
              <img
                src={blog.imagen}
                className="card-img-top"
                alt={blog.alt}
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h3 className="h5">{blog.titulo}</h3>
                <p className="card-text">{blog.resumen}</p>
                <Link to={`/blog/${blog.slug}`} className="btn btn-dark mt-auto">
                  Ver caso →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;