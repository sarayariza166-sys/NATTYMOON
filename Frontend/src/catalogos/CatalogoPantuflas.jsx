import { useState } from "react";
import "./catalogo.css";
import logo from "../assets/logo.png";
import pantuflas from "../assets/Pantuflas.png";
import { useNavigate } from "react-router-dom";

function CatalogoPantuflas() {
  const navigate = useNavigate();

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [talla, setTalla] = useState("");

  const productos = [
    {
      id: 1,
      nombre: "Pantuflas Rosadas",
      descripcion: "Pantuflas suaves y cómodas para el hogar.",
      precio: "$45.000",
      tallas: ["35", "36", "37", "38", "39"],
      imagen: pantuflas,
    },
    {
      id: 2,
      nombre: "Pantuflas Soft",
      descripcion: "Pantuflas ultra suaves tipo peluche.",
      precio: "$50.000",
      tallas: ["35", "36", "37", "38", "39", "40"],
      imagen: pantuflas,
    },
    {
      id: 3,
      nombre: "Pantuflas Luna",
      descripcion: "Pantuflas ligeras y confortables.",
      precio: "$55.000",
      tallas: ["36", "37", "38", "39", "40"],
      imagen: pantuflas,
    },
    {
      id: 4,
      nombre: "Pantuflas Comfort",
      descripcion: "Pantuflas ideales para uso diario.",
      precio: "$48.000",
      tallas: ["35", "36", "37", "38", "39"],
      imagen: pantuflas,
    },
    {
      id: 5,
      nombre: "Pantuflas Plush",
      descripcion: "Pantuflas tipo peluche extra suave.",
      precio: "$52.000",
      tallas: ["36", "37", "38", "39", "40"],
      imagen: pantuflas,
    },
    {
      id: 6,
      nombre: "Pantuflas Premium",
      descripcion: "Pantuflas de alta calidad y confort.",
      precio: "$60.000",
      tallas: ["36", "37", "38", "39", "40", "41"],
      imagen: pantuflas,
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
        Catálogo de Pantuflas
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

export default CatalogoPantuflas;