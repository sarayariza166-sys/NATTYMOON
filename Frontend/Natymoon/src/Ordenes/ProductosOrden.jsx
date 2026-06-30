import { useNavigate } from "react-router-dom";
import "./ProductosOrden.css";

function ProductosOrden() {

  const navigate = useNavigate();

  return (
    <div className="productos-page">

      <div className="banner-productos">
        <h1>Detalle de Orden</h1>
        <p>Aquí puedes ver los productos que contiene tu orden.</p>
      </div>

      <div className="tabla-card">

        <h2>Productos en esta orden</h2>

        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Pijama Luna Rosa</td>
              <td>2</td>
              <td>$45.000</td>
              <td>$90.000</td>
            </tr>

            <tr>
              <td>Pijama Estrellitas</td>
              <td>1</td>
              <td>$65.000</td>
              <td>$65.000</td>
            </tr>
          </tbody>
        </table>

      </div>

      <div className="resumen-card">
        <div>
          <h3>Total productos</h3>
          <p>3</p>
        </div>

        <div>
          <h1>$155.000</h1>
        </div>
      </div>

      <div className="botones">
        <button onClick={() => navigate(-1)}>
          Volver a mis compras
        </button>

        <button
          className="comprar"
          onClick={() => navigate("/home")}
        >
          Continuar comprando
        </button>
      </div>

    </div>
  );
}

export default ProductosOrden;