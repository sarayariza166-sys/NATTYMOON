import { useState } from "react";
import "./catalogo.css";
import logo from "../assets/logo.png";
import levantadora from "../assets/Levantadoras.png";
import { useNavigate } from "react-router-dom";

function CatalogoLevantadora() {
  const navigate = useNavigate();

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [talla, setTalla] = useState("");

  const productos = [
    {
      id: 1,
      nombre: "Levantadora Rosada",
      descripcion: "Levantadora cómoda y elegante para uso diario.",
      precio: "$135.000",
      tallas: ["S", "M", "L", "XL"],
      imagen: levantadora,
    },
    {
      id: 2,
      nombre: "Levantadora Soft",
      descripcion: "Levantadora suave y ligera para casa.",
      precio: "$155.000",
      tallas: ["S", "M", "L"],
      imagen: levantadora,
    },
    {
      id: 3,
      nombre: "Levantadora Deluxe",
      descripcion: "Levantadora premium con diseño elegante.",
      precio: "$130.000",
      tallas: ["M", "L", "XL"],
      imagen: levantadora,
    },
    {
      id: 4,
      nombre: "Levantadora Azul",
      descripcion: "Levantadora azul cómoda y moderna.",
      precio: "$125.000",
      tallas: ["S", "M", "L"],
      imagen: levantadora,
    },
    {
      id: 5,
      nombre: "Levantadora Gris",
      descripcion: "Levantadora gris suave y confortable.",
      precio: "$155.000",
      tallas: ["M", "L", "XL"],
      imagen: levantadora,
    },
    {
      id: 6,
      nombre: "Levantadora Lila",
      descripcion: "Levantadora lila elegante y ligera.",
      precio: "$125.000",
      tallas: ["S", "M", "L", "XL"],
      imagen: levantadora,
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
        Catálogo de Levantadoras
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

export default CatalogoLevantadora;