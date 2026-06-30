import "./Pedidos.css";
import { useNavigate } from "react-router-dom";

const pedidos = [
  { id: "P-001", cliente: "Laura Gomez", estado: "Pendiente", total: "$135.000" },
  { id: "P-002", cliente: "Carlos Ruiz", estado: "Enviado", total: "$155.000" },
  { id: "P-003", cliente: "Ana Torres", estado: "Entregado", total: "$125.000" },
];

function Pedidos() {

  const navigate = useNavigate();

  return (
    <div className="vista-admin pedidos-page">
      <h1>Pedidos</h1>

      <div className="admin-table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.cliente}</td>

                <td>
                  <span className="estado-pedido">
                    {pedido.estado}
                  </span>
                </td>

                <td>{pedido.total}</td>

                <td className="acciones">
                  <button
                    className="btn-detalle"
                    onClick={() => navigate("/detalle-orden")}
                  >
                    Detalle
                  </button>

                  <button
                    className="btn-productos"
                    onClick={() => navigate("/productos-orden")}
                  >
                    Productos
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Pedidos;