import CarritoLista from '../components/CarritoLista';

function Carrito({ items, onEliminar }) {
  return (
    <div>
      <h2 className="mb-4">Mi carrito</h2>
      <CarritoLista items={items} onEliminar={onEliminar} />
    </div>
  );
}

export default Carrito;