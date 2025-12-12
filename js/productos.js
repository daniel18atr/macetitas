import { db } from "./firebase.js";
import { collection, getDocs, query, where } 
from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

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
        
        document.addEventListener("click", (e) => {
    if (e.target.textContent === "Agregar al carrito") {
        const id = e.target.getAttribute("data-id");
        agregarAlCarrito(id);
    }
});


        if (pagina === "agregar") {
            botones = `
            <div class="container-button" style="margin-top: 5px">
                <p style="color: rgb(176, 71, 176);" data-id="${doc.id}">Editar</p>
            </div>
            <div class="container-button" style="margin-top: 10px">
                <p style="color: rgb(176, 71, 176);" data-id="${doc.id}">Eliminar</p>
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
}
