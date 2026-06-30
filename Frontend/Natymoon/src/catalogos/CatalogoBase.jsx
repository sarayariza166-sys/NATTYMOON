import { useEffect, useMemo, useState } from "react";
import "./catalogo.css";
import PublicNavbar from "../components/PublicNavbar";
import logo from "../assets/logo.png";
import hombre from "../assets/Hombre.png";
import levantadoras from "../assets/Levantadoras.png";
import mujer from "../assets/Mujer.png";
import nina from "../assets/Niña.png";
import nino from "../assets/Niño.png";
import pantuflas from "../assets/Pantuflas.png";

const imagenes = { hombre, mujer, nina, nino, pantuflas, levantadoras };
const coloresBase = ["#e9d7cf", "#bfc7d4", "#20243a"];

function crearProductosDemo(categoria) {
  const imagen = imagenes[categoria] || logo;
  const nombres = [
    "Pijama de Seda Luna Nueva",
    "Set Algodon Soft Cloud",
    "Pijama de Robe Flushma",
    "Pijama de Seda Colorma",
    "Set Algodon Soft Cloud",
    "Pijama de Seda Luna Nueva",
    "Pijama de Robe Flushma",
    "Pijama de Seda Luna Nueva",
    "Pijama de Seda Colorma",
  ];

  return nombres.map((nombre, index) => ({
    id: `${categoria}-${index}`,
    nombre,
    descripcion: "Suave, fresca y comoda para descansar.",
    precio: [135000, 155000, 130000, 125000][index % 4],
    inventario: 20 + index,
    categoria,
    imagen,
    talla: index % 2 === 0 ? "L y XL" : "L y L",
    colores: coloresBase.slice(0, 2 + (index % 2)),
  }));
}

function CatalogoBase({ categoria, titulo }) {
  const [productosGuardados, setProductosGuardados] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [talla, setTalla] = useState("M");

  useEffect(() => {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    setProductosGuardados(productos.filter((producto) => producto.categoria === categoria));
  }, [categoria]);

  const productos = useMemo(() => {
    const normalizados = productosGuardados.map((producto) => ({
      ...producto,
      talla: producto.talla || "L y XL",
      colores: producto.colores || coloresBase,
    }));

    return normalizados.length > 0 ? normalizados : crearProductosDemo(categoria);
  }, [productosGuardados, categoria]);

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return productos;

    return productos.filter((producto) =>
      `${producto.nombre} ${producto.descripcion}`.toLowerCase().includes(texto)
    );
  }, [productos, busqueda]);

  return (
    <div className="catalog-page">
      <PublicNavbar searchValue={busqueda} onSearchChange={setBusqueda} />

      <main className="catalog-main">
        <h1 className="catalog-title">{titulo}</h1>

        <div className="products-grid">
          {productosFiltrados.length === 0 ? (
            <p className="catalog-empty">No se encontraron productos.</p>
          ) : (
            productosFiltrados.map((producto) => (
              <article className="product-card" key={producto.id} onClick={() => setProductoSeleccionado(producto)}>
                <img src={producto.imagen} alt={producto.nombre} />
                <h3>{producto.nombre}</h3>
                <p className="price">${Number(producto.precio).toLocaleString("es-CO")}</p>
              </article>
            ))
          )}
        </div>

        {productosFiltrados.length > 15 && (
          <div className="catalog-pagination">
            <button className="active-page">1</button>
            <button>2</button>
            <button>3</button>
            <span>...</span>
            <button aria-label="Siguiente">›</button>
          </div>
        )}
      </main>

      <FooterCatalogo />

      {productoSeleccionado && (
        <ProductoModal
          producto={productoSeleccionado}
          talla={talla}
          cantidad={cantidad}
          setTalla={setTalla}
          setCantidad={setCantidad}
          cerrar={() => setProductoSeleccionado(null)}
        />
      )}
    </div>
  );
}

function FooterCatalogo() {
  return (
    <footer className="catalog-footer">
      <span>Pijamas de la mejor calidad</span>
      <span>☾ Hechas para tus mejores sueños</span>
      <nav>
        <a href="#sitio">Sitio</a>
        <a href="#talla">Talla</a>
        <a href="#bogs">Bogs</a>
        <a href="#links">Links</a>
      </nav>
    </footer>
  );
}

function ProductoModal({ producto, talla, cantidad, setTalla, setCantidad, cerrar }) {
  return (
    <div className="modal-overlay">
      <div className="modal-producto">
        <button className="cerrar-modal" onClick={cerrar}>X</button>
        <img className="modal-img" src={producto.imagen} alt={producto.nombre} />
        <h2>{producto.nombre}</h2>
        <p className="modal-descripcion">{producto.descripcion}</p>
        <h3 className="modal-precio">${Number(producto.precio).toLocaleString("es-CO")}</h3>
        <label>Talla</label>
        <select value={talla} onChange={(e) => setTalla(e.target.value)}>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        <label>Cantidad</label>
        <input type="number" min="1" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
        <button className="agregar-btn" onClick={() => alert(`${cantidad} producto(s) agregados al carrito`)}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default CatalogoBase;
