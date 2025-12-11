import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

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

function recargarPagina() {
    setTimeout(() => {
        window.location.reload();
    }, 1000); // 1 segundo
}

document.getElementById("formProducto").addEventListener("submit", async (e) => {
    e.preventDefault();

    const botonSubmit = e.target.querySelector("button[type='submit']");
    botonSubmit.disabled = true;
    botonSubmit.innerText = "Agregando...";

    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const imagen = document.getElementById("imagen").files[0];
    const categoria = document.getElementById("categoria").value;

    if (!imagen) {
        alert("Seleccioná una imagen");
        botonSubmit.disabled = false;
        botonSubmit.innerText = "Agregar producto";
        return;
    }

    if (!categoria) {
        alert("Elegí una categoría");
        botonSubmit.disabled = false;
        botonSubmit.innerText = "Agregar producto";
        return;
    }

    const imagenUrl = await subirImagen(imagen);

    await addDoc(collection(db, "productos"), {
        nombre,
        precio,
        imagen: imagenUrl,
        categoria
    });

    alert("Producto agregado correctamente");
    e.target.reset();

    botonSubmit.disabled = false;
    botonSubmit.innerText = "Agregar producto";

    recargarPagina("agregar");
});
