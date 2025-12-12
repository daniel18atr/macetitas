/*import { db } from "./firebase.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const CLOUD_NAME = "dmksggfgb"; 
const UPLOAD_PRESET = "preset_publico";

async function subirImagen(file) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(url, {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    console.log("Imagen subida:", data);

    return data.secure_url;
}

async function cargarProducto(productId) {
    const productRef = doc(db, "productos", productId);
    const docSnap = await getDoc(productRef);

    if (docSnap.exists()) {
        const producto = docSnap.data();
        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("precio").value = producto.precio;
        document.getElementById("categoria").value = producto.categoria;
    } else {
        console.log("No se encontró el producto");
    }
}

document.getElementById("formProducto").addEventListener("submit", async (e) => {
    e.preventDefault();

    const botonSubmit = e.target.querySelector("button[type='submit']");
    botonSubmit.disabled = true;
    botonSubmit.innerText = "Guardando...";

    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const categoria = document.getElementById("categoria").value;
    const imagen = document.getElementById("imagen").files[0];

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // Obtener el ID del producto desde la URL

    const productRef = doc(db, "productos", productId);
    let imagenUrl = null;

    if (imagen) {
        imagenUrl = await subirImagen(imagen);
    }

    await updateDoc(productRef, {
        nombre,
        precio,
        categoria,
        ...(imagenUrl && { imagen: imagenUrl }) // Solo actualiza la imagen si se subió una nueva
    });

    alert("Producto actualizado correctamente");
    e.target.reset();
    botonSubmit.disabled = false;
    botonSubmit.innerText = "Guardar cambios";
    window.location.href = "admin.html"; // Redirigir a la página de administración
});

// Cargar producto si se está editando
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId) {
        cargarProducto(productId);
    }
};*/
