import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import "./cupones.css";

const cuponesBase = [
  { id: 1, codigo: "BIENVENIDA15", descripcion: "15% de descuento en tu primera compra", descuento: 15, fechaVencimiento: "31/12/2026", usado: false },
  { id: 2, codigo: "NATTY20", descripcion: "20% de descuento en compras superiores a $150.000", descuento: 20, fechaVencimiento: "31/12/2026", usado: false },
  { id: 3, codigo: "PIJAMALOVE", descripcion: "10% de descuento en toda la tienda", descuento: 10, fechaVencimiento: "31/12/2026", usado: false },
  { id: 4, codigo: "NATTYKIDS", descripcion: "5% de descuento en pijamas infantiles", descuento: 5, fechaVencimiento: "31/12/2026", usado: false },
];

function Cupones() {
  const navigate = useNavigate();
  const [cupones] = useState(cuponesBase);
  const [filtro, setFiltro] = useState("todos");

  const cuponesFiltrados = filtro === "todos"
    ? cupones
    : cupones.filter((cupon) => filtro === "disponibles" ? !cupon.usado : cupon.usado);

  const copiar = (codigo) => {
    navigator.clipboard.writeText(codigo);
    alert("Cupon copiado");
  };

  return (
    <div className="cupones-page">
      <PublicNavbar />

      <div className="contenedor-cupones">
        <div className="banner">
          <div>
            <h1>Cupones y Descuentos</h1>
            <p>Aprovecha nuestras promociones y ahorra en tus pijamas favoritas.</p>
          </div>
          <div className="banner-icono">%</div>
        </div>

        <div className="filtros">
          <button className={filtro === "todos" ? "activo" : ""} onClick={() => setFiltro("todos")}>Todos ({cupones.length})</button>
          <button className={filtro === "disponibles" ? "activo" : ""} onClick={() => setFiltro("disponibles")}>Disponibles ({cupones.filter((c) => !c.usado).length})</button>
          <button className={filtro === "usados" ? "activo" : ""} onClick={() => setFiltro("usados")}>Usados ({cupones.filter((c) => c.usado).length})</button>
        </div>

        <div className="cupones-grid">
          {cuponesFiltrados.map((cupon) => (
            <div key={cupon.id} className={`cupon-card ${cupon.usado ? "cupon-usado" : ""}`}>
              <div className="descuento"><h2>{cupon.descuento}%</h2><span>DTO.</span></div>
              <div className="info">
                <h3>{cupon.codigo}</h3>
                <p>{cupon.descripcion}</p>
                <p className="fecha">Valido hasta: {cupon.fechaVencimiento}</p>
              </div>
              <div className="acciones">
                <span className={cupon.usado ? "usado" : "disponible"}>{cupon.usado ? "Usado" : "Disponible"}</span>
                <button disabled={cupon.usado} onClick={() => copiar(cupon.codigo)}>COPIAR</button>
              </div>
            </div>
          ))}
        </div>

        <div className="codigo-extra">
          <div>
            <h3>¿Tienes un codigo de cupon?</h3>
            <p>Ingresa tu codigo en el carrito de compras para aplicar tu descuento.</p>
          </div>
          <button onClick={() => navigate("/carrito")}>IR AL CARRITO</button>
        </div>
      </div>
    </div>
  );
}

export default Cupones;
