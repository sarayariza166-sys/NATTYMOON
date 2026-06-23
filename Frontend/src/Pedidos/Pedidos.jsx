import "./Pedidos.css";

const pedidos = [
  { id: "P-001", cliente: "Laura Gomez", estado: "Pendiente", total: "$135.000" },
  { id: "P-002", cliente: "Carlos Ruiz", estado: "Enviado", total: "$155.000" },
  { id: "P-003", cliente: "Ana Torres", estado: "Entregado", total: "$125.000" },
];

function Pedidos() {
  return (
    <div className="vista-admin pedidos-page">
      <h1>Pedidos</h1>
      <div className="admin-table-card">
        <table>
          <thead>
            <tr><th>ID</th><th>Cliente</th><th>Estado</th><th>Total</th></tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.cliente}</td>
                <td><span className="estado-pedido">{pedido.estado}</span></td>
                <td>{pedido.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pedidos;
