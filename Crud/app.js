const API = "http://localhost:3001";

let editando = false;

// ---------------- CATEGORIAS ----------------
async function cargarCategorias() {
  const r = await fetch(API + "/categorias");
  const data = await r.json();

  const sel = document.getElementById("id_categoria");
  sel.innerHTML = "";

  data.forEach((c) => {
    sel.innerHTML += `
      <option value="${c.id_categoria}">
        ${c.nombre_categoria}
      </option>
    `;
  });
}

// ---------------- LISTAR ----------------
async function cargar() {
  const r = await fetch(API + "/productos");
  const data = await r.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  data.forEach((p) => {
    lista.innerHTML += `
      <div class="card">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion || ""}</p>
        <p>💲 ${Number(p.precio).toFixed(2)}</p>
        <p>📏 ${p.talla || "-"}</p>
        <p>📦 ${p.stock || 0}</p>

        <button onclick="editar(${p.id_producto}, '${p.nombre}', '${p.descripcion}', ${p.precio}, '${p.talla}', ${p.stock}, ${p.id_categoria})">
          Editar
        </button>

        <button onclick="eliminar(${p.id_producto})">
          Eliminar
        </button>
      </div>
    `;
  });
}

// ---------------- GUARDAR (CREAR / EDITAR) ----------------
async function guardar() {
  const data = {
    id_producto: Number(document.getElementById("id_producto").value),
    id_categoria: Number(document.getElementById("id_categoria").value),
    nombre: document.getElementById("nombre").value,
    descripcion: document.getElementById("descripcion").value,
    precio: Number(document.getElementById("precio").value),
    talla: document.getElementById("talla").value,
    stock: Number(document.getElementById("stock").value),
  };

  await fetch(API + "/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  limpiar();
  cargar();
}

// ---------------- EDITAR (SOLO LLENA CAMPOS) ----------------
function editar(id, nombre, desc, precio, talla, stock, cat) {
  document.getElementById("id_producto").value = id;
  document.getElementById("nombre").value = nombre;
  document.getElementById("descripcion").value = desc;
  document.getElementById("precio").value = precio;
  document.getElementById("talla").value = talla;
  document.getElementById("stock").value = stock;
  document.getElementById("id_categoria").value = cat;
}

// ---------------- LIMPIAR ----------------
function limpiar() {
  document.getElementById("id_producto").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("talla").value = "";
  document.getElementById("stock").value = "";
}

// ---------------- ELIMINAR ----------------
async function eliminar(id) {
  await fetch(`${API}/productos/${id}`, { method: "DELETE" });
  cargar();
}

// INIT
cargar();
cargarCategorias();
