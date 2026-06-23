import { leerProductos } from "../data/catalogos";
import "./Dashboard.css";

function Dashboard() {
  const productos = leerProductos();
  const totalInventario = productos.reduce(
    (total, producto) => total + Number(producto.inventario || 0),
    0
  );

  const cards = [
    { label: "Productos", value: productos.length },
    { label: "Inventario", value: totalInventario },
    { label: "Pedidos", value: 12 },
    { label: "Clientes", value: 48 },
  ];

  return (
    <div className="vista-admin">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        {cards.map((card) => (
          <article className="dashboard-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </div>

      <section className="panel-admin">
        <h2>Resumen rapido</h2>
        <p>Desde aqui puedes revisar productos, pedidos, clientes y ajustes generales de NattyMoon.</p>
      </section>
    </div>
  );
}

export default Dashboard;
