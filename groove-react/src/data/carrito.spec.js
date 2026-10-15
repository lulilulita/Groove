import { obtenerCarrito, agregarAlCarrito, calcularTotal} from './carrito';

describe('Logica del carrito', () => {
    beforeEach(() => {
        localStorage.clear();
    }); 

    it('agrega un producto nuevo al carrito', ()=> {
        agregarAlCarrito({ codigo: 'VIN-001', nombre: 'Vinilo', precio: 15000});

        const carrito = obtenerCarrito();
        expect(carrito.length).toBe(1);
        expect(carrito[0].cantidad).toBe(1);
    });

    it('suma la cantidad si el producto ya estaba en el carrito', () => {
        const producto = { codigo: 'VIN-001', nombre: 'Vinilo', precio: 15000};
        agregarAlCarrito(producto);
        agregarAlCarrito(producto);

        const carrito = obtenerCarrito();
        expect(carrito.length).toBe(1);
        expect(carrito[0].cantidad).toBe(2);
    });

    it ('calcula el total multiplicando el precio por cantidad', () => {
        const items = [
            { codigo: 'A', precio: 1000, cantidad: 2},
            { codigo: 'B', precio: 500, cantidad: 3},
        ];

        expect(calcularTotal(items)).toBe(3500);
    });
});    
