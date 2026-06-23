import "./Clientes.css";

function Clientes() {
  return (
    <div className="vista-admin clientes-page">
      <h1>Clientes</h1>
      <div className="clientes-grid">
        {clientes.map((cliente) => (
          <article className="cliente-card" key={cliente.correo}>
            <div className="cliente-avatar">{cliente.nombre[0]}</div>
            <h3>{cliente.nombre}</h3>
            <p>{cliente.correo}</p>
            <strong>{cliente.compras} compras</strong>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Clientes;
