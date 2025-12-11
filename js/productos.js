import { db } from "./firebase.js";
import { collection, getDocs, query, where, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

export async function cargarProductos(pagina, categoriaFiltrada = null) {
    const contenedor = document.getElementById("listaProductos");
    contenedor.innerHTML = "";

    let ref = collection(db, "productos");

    if (categoriaFiltrada) {
        ref = query(ref, where("categoria", "==", categoriaFiltrada));
    }

    const querySnapshot = await getDocs(ref);

    querySnapshot.forEach((doc) => {
        const p = doc.data();

        let botones = "";

        if (pagina === "agregar") {
            botones = `
            <div class="container-button" style="margin-top: 5px">
                <p style="color: rgb(176, 71, 176);" data-id="${doc.id}" class="editar">Editar</p>
            </div>
            <div class="container-button" style="margin-top: 10px">
                <p style="color: rgb(176, 71, 176);" data-id="${doc.id}" class="eliminar">Eliminar</p>
            </div>
            `;
        } else if (pagina === "productos") {
            botones = `
            <div class="container-button">
                <p style="color: rgb(176, 71, 176);" data-id="${doc.id}">Agregar al carrito</p>
            </div>
            `;
        }

        contenedor.innerHTML += `
            <div class="producto">
                <img src="${p.imagen}" alt="${p.nombre}">
                <p class="nombre">${p.nombre}</p>
                <p class="precio">$${p.precio}</p>
                <p class="categoria">${p.categoria}</p>
                ${botones}
            </div>
        `;
    });

    // Agregar evento de eliminación
    document.querySelectorAll('.eliminar').forEach(button => {
        button.addEventListener('click', async (e) => {
            const productId = e.target.getAttribute('data-id');
            await eliminarProducto(productId);
        });
    });
}

// Función para eliminar un producto
async function eliminarProducto(productId) {
    const productRef = doc(db, "productos", productId);
    try {
        await deleteDoc(productRef);
        console.log('Producto eliminado con éxito');
        alert('Producto eliminado con éxito');
        cargarProductos("agregar"); // Recargar la lista de productos después de eliminar
    } catch (error) {
        console.error('Error al eliminar el producto: ', error);
        alert('Error al eliminar el producto');
    }
}
