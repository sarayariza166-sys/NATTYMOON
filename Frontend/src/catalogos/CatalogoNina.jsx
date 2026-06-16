import { useState } from "react";
import "./catalogo.css";
import logo from "../assets/logo.png";
import nina from "../assets/Niña.png";
import { useNavigate } from "react-router-dom";

function CatalogoNina() {
  const navigate = useNavigate();

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [talla, setTalla] = useState("");

  const productos = [
    {
      id: 1,
      nombre: "Pijama Estrellitas",
      descripcion: "Pijama infantil suave con diseño de estrellitas.",
      precio: "$95.000",
      tallas: ["2", "4", "6", "8"],
      imagen: nina,
    },
    {
      id: 2,
      nombre: "Pijama Unicornio",
      descripcion: "Pijama con diseño de unicornio mágico.",
      precio: "$105.000",
      tallas: ["2", "4", "6", "8"],
      imagen: nina,
    },
    {
      id: 3,
      nombre: "Pijama Princesa",
      descripcion: "Pijama de princesa cómodo y suave.",
      precio: "$110.000",
      tallas: ["4", "6", "8", "10"],
      imagen: nina,
    },
    {
      id: 4,
      nombre: "Pijama Nube",
      descripcion: "Pijama ligera con diseño de nubes.",
      precio: "$98.000",
      tallas: ["2", "4", "6", "8"],
      imagen: nina,
    },
    {
      id: 5,
      nombre: "Pijama Corazones",
      descripcion: "Pijama con estampado de corazones.",
      precio: "$115.000",
      tallas: ["4", "6", "8", "10"],
      imagen: nina,
    },
    {
      id: 6,
      nombre: "Pijama Dulces Sueños",
      descripcion: "Pijama suave para dormir cómodamente.",
      precio: "$120.000",
      tallas: ["2", "4", "6", "8", "10"],
      imagen: nina,
    },
  ];

  return (
    <div className="catalog-page">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="menu">☰</div>

        <div
          className="logo-navbar"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="NattyMoon" />
          <h1>NattyMoon</h1>
        </div>

        <div className="icons">
          <span>🔍</span>
          <span>👤</span>
          <span>🛍️</span>
        </div>
      </nav>

      {/* TITULO */}
      <h1 className="catalog-title">
        Catálogo de Niña
      </h1>

      {/* PRODUCTOS */}
      <div className="products-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="product-card">

            <img
              src={producto.imagen}
              alt={producto.nombre}
            />

            <h3>{producto.nombre}</h3>

            <p className="price">{producto.precio}</p>

            <button
              onClick={() => {
                setProductoSeleccionado(producto);
                setCantidad(1);
                setTalla(producto.tallas[0]);
              }}
            >
              Ver producto
            </button>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {productoSeleccionado && (
        <div className="modal-overlay">

          <div className="modal-producto">

            <button
              className="cerrar-modal"
              onClick={() => setProductoSeleccionado(null)}
            >
              ✖
            </button>

            <img
              className="modal-img"
              src={productoSeleccionado.imagen}
              alt={productoSeleccionado.nombre}
            />

            <h2>{productoSeleccionado.nombre}</h2>

            <p className="modal-descripcion">
              {productoSeleccionado.descripcion}
            </p>

            <h3 className="modal-precio">
              {productoSeleccionado.precio}
            </h3>

            <label>Talla</label>
            <select
              value={talla}
              onChange={(e) => setTalla(e.target.value)}
            >
              {productoSeleccionado.tallas.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <label>Cantidad</label>
            <input
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />

            <button
              className="agregar-btn"
              onClick={() =>
                alert(
                  `${cantidad} producto(s) agregados al carrito`
                )
              }
            >
              Agregar al carrito
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default CatalogoNina;