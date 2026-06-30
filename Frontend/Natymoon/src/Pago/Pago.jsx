import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import "./Pago.css";

function Pago() {
  const navigate = useNavigate();

  const [metodoPago, setMetodoPago] = useState("nequi");

  return (
    <div className="pago-page">
      <PublicNavbar />

      <div className="pago-banner">
        <div>
          <h1>Pago</h1>
          <p>
            Elige tu método de pago y completa tu compra
            de forma segura.
          </p>
        </div>
      </div>

      <div className="resumen-card">

        <h2>Resumen de tu orden</h2>

        <div className="producto-pago">
          <div>
            <h3>Pijama Luna Rosa</h3>
            <p>Talla: M | Color: Rosa</p>
            <p>Cantidad: 2</p>
          </div>
          <strong>$90.000</strong>
        </div>

        <div className="producto-pago">
          <div>
            <h3>Pijama Estrellitas</h3>
            <p>Talla: L | Color: Lila</p>
            <p>Cantidad: 1</p>
          </div>
          <strong>$65.000</strong>
        </div>

        <div className="totales">
          <div>
            <span>Subtotal</span>
            <span>$155.000</span>
          </div>

          <div>
            <span>Envío</span>
            <span>$8.000</span>
          </div>

          <div className="total-final">
            <span>Total a pagar</span>
            <span>$163.000</span>
          </div>
        </div>

      </div>

      <div className="metodos-card">

        <h2>Selecciona tu método de pago</h2>

        <div
          className={`metodo ${metodoPago === "nequi" ? "activo" : ""}`}
          onClick={() => setMetodoPago("nequi")}
        >
          <input
            type="radio"
            checked={metodoPago === "nequi"}
            readOnly
          />

          <div>
            <h3>Nequi</h3>
            <p>
              Serás redirigido a Nequi para autorizar
              el pago de forma segura.
            </p>
          </div>
        </div>

        <div
          className={`metodo ${metodoPago === "daviplata" ? "activo" : ""}`}
          onClick={() => setMetodoPago("daviplata")}
        >
          <input
            type="radio"
            checked={metodoPago === "daviplata"}
            readOnly
          />

          <div>
            <h3>Daviplata</h3>
            <p>
              Serás redirigido a Daviplata para autorizar
              el pago de forma segura.
            </p>
          </div>
        </div>

        <button
          className="btn-pagar"
          onClick={() =>
            alert(`Pago con ${metodoPago}`)
          }
        >
          Pagar $163.000
        </button>

        <button
          className="btn-volver"
          onClick={() => navigate("/detalle-orden")}
        >
          Volver a mi orden
        </button>

      </div>
    </div>
  );
}

export default Pago;