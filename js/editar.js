import { db } from "./firebase.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const nombreInput = document.getElementById("nombre");
const precioInput = document.getElementById("precio");
const categoriaSelect = document.getElementById("categoria");
const imagenInput = document.getElementById("imagen");
const preview = document.getElementById("preview");

async function cargarProducto() {
    if (!id) {
        alert("Error: no se recibió un ID del producto.");
        return;
    }
    const ref = doc(db, "productos", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        alert("El producto no existe.");
        return;
    }
    const p = snap.data();
    nombreInput.value = p.nombre;
    precioInput.value = p.precio;
    categoriaSelect.value = p.categoria;
    preview.src = p.imagen;
}
cargarProducto();
document.getElementById("formProducto").addEventListener("submit", async (e) => {
    e.preventDefault();
    const ref = doc(db, "productos", id);
    let nuevaImagen = preview.src; 
    if (imagenInput.files.length > 0) {
        const file = imagenInput.files[0];
        nuevaImagen = await subirACloudinary(file);
    }
    await updateDoc(ref, {
        nombre: nombreInput.value,
        precio: Number(precioInput.value),
        categoria: categoriaSelect.value,
        imagen: nuevaImagen
    });
    alert("Producto editado correctamente");
    window.location.href = "/pages/admin.html";
});
async function subirACloudinary(file) {
    const CLOUD_NAME = "dmksggfgb";
    const UPLOAD_PRESET = "preset_publico";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    return data.secure_url;
}
