import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import { useCarrito } from "../context/CarritoContext";
import "./Carrito.css";

const cupones = {
  BIENVENIDA15: 15,
  NATTY20: 20,
  PIJAMALOVE: 10,
  NATTYKIDS: 5,
};

function Carrito() {
  const navigate = useNavigate();

  const {
    carrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
  } = useCarrito();

  const [codigo, setCodigo] = useState("");
  const [descuento, setDescuento] = useState(0);

  const subtotal = carrito.reduce(
    (total, producto) =>
      total + Number(producto.precio) * Number(producto.cantidad),
    0
  );

  const valorDescuento = subtotal * (descuento / 100);
  const total = subtotal - valorDescuento;

  const aplicarCupon = () => {
    const porcentaje = cupones[codigo.trim().toUpperCase()];
    if (!porcentaje) {
      alert("Cupón no válido");
      return;
    }
    setDescuento(porcentaje);
    alert(`Cupón aplicado: ${porcentaje}%`);
  };

  const irAPago = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }
    navigate("/pago");
  };

  return (
    <div className="carrito-container">
      <PublicNavbar />

      <h1 className="titulo-carrito">Tu Carrito de Compras</h1>

      <div className="contenido-carrito">
        <div className="productos-grid">
          {carrito.length === 0 ? (
            <p className="carrito-vacio">Tu carrito está vacío.</p>
          ) : (
            carrito.map((producto) => (
              <div key={`${producto.id}-${producto.talla}`} className="producto-card">
                {producto.imagen ? (
                  <img src={producto.imagen} alt={producto.nombre} />
                ) : (
                  <div className="imagen-producto">Producto</div>
                )}

                <h4>{producto.nombre}</h4>
                <p>Talla: {producto.talla}</p>

                <div className="cantidad">
                  <button onClick={() => disminuirCantidad(producto.id, producto.talla)}>-</button>
                  <span>{producto.cantidad}</span>
                  <button onClick={() => aumentarCantidad(producto.id, producto.talla)}>+</button>
                </div>

                <strong>
                  ${(Number(producto.precio) * Number(producto.cantidad)).toLocaleString("es-CO")}
                </strong>

                <button className="btn-eliminar" onClick={() => eliminarProducto(producto.id, producto.talla)}>
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        <div className="resumen">
          <h2>Resumen del Pedido</h2>

          <div className="fila">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString("es-CO")}</span>
          </div>

          <div className="fila">
            <span>Envío</span>
            <span>Gratis</span>
          </div>

          <div className="fila">
            <span>Descuento</span>
            <span>-${valorDescuento.toLocaleString("es-CO")}</span>
          </div>

          <hr />

          <div className="fila total">
            <span>Total</span>
            <span>${total.toLocaleString("es-CO")}</span>
          </div>

          <input
            type="text"
            placeholder="Código de descuento"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />

          <button className="btn-cupon" onClick={aplicarCupon}>Aplicar cupón</button>
          <button className="btn-pago" onClick={irAPago}>Proceder al Pago</button>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
