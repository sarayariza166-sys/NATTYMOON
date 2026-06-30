import "./DetalleOrden.css";

function DetalleOrden() {
  return (
    <div className="detalle-page">

      <div className="banner-detalle">
        <div>
          <h1>Detalle de Orden</h1>
          <p>Inicio &gt; Mis Compras &gt; Detalle de Orden</p>
        </div>
      </div>

      <div className="orden-info">
        <div>
          <span>Orden #</span>
          <h3>NM-2025-000123</h3>
        </div>

        <div>
          <span>Fecha</span>
          <h3>15/may/2025</h3>
        </div>

        <div>
          <span>Estado</span>
          <h3 className="estado">Entregado</h3>
        </div>

        <div>
          <span>Total</span>
          <h3>$185.900</h3>
        </div>
      </div>

      <div className="seguimiento">
        <h2>Estado de la orden</h2>

        <div className="timeline">
          <div className="step">
            <div className="circle active"></div>
            <h4>Confirmado</h4>
            <p>15/may/2025</p>
          </div>

          <div className="step">
            <div className="circle active"></div>
            <h4>En preparación</h4>
            <p>16/may/2025</p>
          </div>

          <div className="step">
            <div className="circle active"></div>
            <h4>Enviado</h4>
            <p>17/may/2025</p>
          </div>

          <div className="step">
            <div className="circle active"></div>
            <h4>Entregado</h4>
            <p>20/may/2025</p>
          </div>
        </div>

        <div className="mensaje-ok">
          ¡Tu orden fue entregada con éxito el 20 de mayo de 2025!
        </div>
      </div>

      <div className="grid-detalle">

        <div className="card">
          <h2>Productos</h2>

          <div className="producto">
            <div>
              <h3>Pijama Dulces Sueños</h3>
              <p>Talla M | Color Rosa</p>
              <p>Cantidad: 1</p>
            </div>
            <strong>$89.900</strong>
          </div>

          <div className="producto">
            <div>
              <h3>Pijama Estrellitas</h3>
              <p>Talla L | Color Lila</p>
              <p>Cantidad: 1</p>
            </div>
            <strong>$96.000</strong>
          </div>
        </div>

        <div className="card">
          <h2>Información de envío</h2>

          <p>María Fernanda Gómez</p>
          <p>300 123 4567</p>
          <p>Cra 15 # 93-45</p>
          <p>Bogotá, Cundinamarca</p>

          <br />

          <p>Envío Estándar</p>
          <strong>20/may/2025</strong>
        </div>

        <div className="card">
          <h2>Resumen de tu orden</h2>

          <div className="fila-resumen">
            <span>Subtotal</span>
            <span>$185.900</span>
          </div>

          <div className="fila-resumen">
            <span>Envío</span>
            <span>$0</span>
          </div>

          <div className="fila-resumen">
            <span>Descuento</span>
            <span>$0</span>
          </div>

          <hr />

          <div className="fila-total">
            <strong>Total Pagado</strong>
            <strong>$185.900</strong>
          </div>
        </div>

        <div className="card">
          <h2>Pago</h2>

          <p>Tarjeta de Crédito</p>
          <strong>VISA •••• 4242</strong>
        </div>

      </div>

    </div>
  );
}

export default DetalleOrden;