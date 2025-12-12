import { db } from "./firebase.js";
import { collection, getDocs, query, where, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import { agregarAlCarrito } from "./carrito.js";

export async function cargarProductos(pagina, categoriaFiltrada = null) {
    const contenedor = document.getElementById("listaProductos");
    contenedor.innerHTML = "";

    let ref = collection(db, "productos");

    if (categoriaFiltrada) {
        ref = query(ref, where("categoria", "==", categoriaFiltrada));
    }

    const querySnapshot = await getDocs(ref);

    querySnapshot.forEach((docSnap) => {
        const p = docSnap.data();

        let botones = "";

        if (pagina === "agregar") {
            botones = `
            <div class="container-button" style="margin-top: 5px">
                <a href="/pages/editar.html?id=${docSnap.id}">
                    <p style="color: rgb(176, 71, 176);" class="editar">Editar</p>
                </a>
            </div>
            <div class="container-button" style="margin-top: 10px">
                <p style="color: rgb(176, 71, 176);" data-id="${docSnap.id}" class="eliminar">Eliminar</p>
            </div>
            `;
        } else if (pagina === "productos") {
            botones = `
            <div class="container-button">
                <p class="btn-agregar" 
                    style="color: rgb(176, 71, 176);" 
                    data-id="${docSnap.id}"
                    data-nombre="${p.nombre}"
                    data-precio="${p.precio}"
                    data-imagen="${p.imagen}">
                    Agregar al carrito
                </p>
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

    document.querySelectorAll('.eliminar').forEach(button => {
        button.addEventListener('click', async (e) => {
            const productId = e.target.getAttribute('data-id');
            await eliminarProducto(productId);
        });
    });

    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener("click", (e) => {
            const producto = {
                id: e.target.dataset.id,
                nombre: e.target.dataset.nombre,
                precio: Number(e.target.dataset.precio),
                imagen: e.target.dataset.imagen
            };

            agregarAlCarrito(producto);
            alert("Producto agregado correctamente");

        });
    });
}

//eliminar un producto 
async function eliminarProducto(productId) {
    const productRef = doc(db, "productos", productId);
    try {
        await deleteDoc(productRef);
        alert('Producto eliminado con éxito');
        cargarProductos("agregar");
    } catch (error) {
        alert('Error al eliminar el producto');
        console.error(error);
    }
}


