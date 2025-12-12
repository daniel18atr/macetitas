
export function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

export function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar producto
export function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();

    const existe = carrito.find(p => p.id === producto.id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
}

export function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);

    const contador = document.getElementById("contador-carrito");
    if (contador) contador.textContent = total;
}

// Quitar producto del carrito
export function eliminarDelCarrito(id) {
    let carrito = obtenerCarrito();
    const item = carrito.find(p => p.id === id);
    if (!item) return;
    if (item.cantidad > 1) {
        item.cantidad--;
    } else {
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
}
