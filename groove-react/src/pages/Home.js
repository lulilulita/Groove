import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="p-5 bg-light rounded-3 text-center">
      <h1 className="display-5">Groove</h1>
      <p className="lead">
        Tu tienda de discos de vinilo, tornamesas y cultura analógica en Chile.
      </p>
      <Link to="/productos" className="btn btn-dark btn-lg">Ver productos</Link>
    </div>
  );
}

export default Home;