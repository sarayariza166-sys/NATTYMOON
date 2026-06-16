import { useState } from "react";
import "./catalogo.css";
import logo from "../assets/logo.png";
import nino from "../assets/Niño.png";
import { useNavigate } from "react-router-dom";

function CatalogoNino() {
  const navigate = useNavigate();

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [talla, setTalla] = useState("");

  const productos = [
    {
      id: 1,
      nombre: "Pijama Niño Azul",
      descripcion: "Pijama cómoda y suave para niños.",
      precio: "$95.000",
      tallas: ["2", "4", "6", "8"],
      imagen: nino,
    },
    {
      id: 2,
      nombre: "Pijama Soft Kids",
      descripcion: "Pijama suave ideal para dormir cómodo.",
      precio: "$105.000",
      tallas: ["2", "4", "6"],
      imagen: nino,
    },
    {
      id: 3,
      nombre: "Pijama Estrellas",
      descripcion: "Pijama con diseño de estrellas.",
      precio: "$110.000",
      tallas: ["4", "6", "8"],
      imagen: nino,
    },
    {
      id: 4,
      nombre: "Pijama Invierno",
      descripcion: "Pijama abrigada para días fríos.",
      precio: "$120.000",
      tallas: ["6", "8", "10"],
      imagen: nino,
    },
    {
      id: 5,
      nombre: "Pijama Algodón",
      descripcion: "Pijama de algodón suave y ligera.",
      precio: "$98.000",
      tallas: ["2", "4", "6", "8"],
      imagen: nino,
    },
    {
      id: 6,
      nombre: "Pijama Dinosaurios",
      descripcion: "Pijama divertida con diseño de dinosaurios.",
      precio: "$115.000",
      tallas: ["4", "6", "8", "10"],
      imagen: nino,
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
        Catálogo de Niño
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

export default CatalogoNino;