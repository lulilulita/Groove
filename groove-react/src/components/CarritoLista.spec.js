import { render, screen, fireEvent } from '@testing-library/react';
import CarritoLista from './CarritoLista';

describe('Componente CarritoLista', () => {
  const items = [
    { codigo: 'VIN-001', nombre: 'Vinilo Edición Especial', precio: 15000, cantidad: 1 },
    { codigo: 'TOR-001', nombre: 'Tornamesa Clásica', precio: 89990, cantidad: 2 },
  ];

  it('muestra todos los productos recibidos por props', () => {
    render(<CarritoLista items={items} onEliminar={() => {}} />);

    expect(screen.getByText('Vinilo Edición Especial')).toBeTruthy();
    expect(screen.getByText('Tornamesa Clásica')).toBeTruthy();
  });

  it('llama a onEliminar con el código del producto al hacer clic en Eliminar', () => {
    const onEliminar = jasmine.createSpy('onEliminar');
    render(<CarritoLista items={items} onEliminar={onEliminar} />);

    fireEvent.click(screen.getAllByText('Eliminar')[0]);

    expect(onEliminar).toHaveBeenCalledWith('VIN-001');
  });
});