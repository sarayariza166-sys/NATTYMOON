import "./ordenCompra.css";

function OrdenCompra() {
  const orden = {
    estado: "Pendiente",
    fecha_entrega: "2026-06-20",
    precio_total: 350000,
    metodo_pago: "Nequi",
    direccion: "Cra 15 # 93-45, Bogotá",
  };

  const productos = [
    {
      nombre: "Pijama Luna Rosa",
      cantidad: 2,
      precio: 45000,
    },
    {
      nombre: "Pijama Estrellitas",
      cantidad: 1,
      precio: 65000,
    },
  ];

  return (
    <div className="orden-container">
      <h1>Orden de Compra</h1>

      <div className="info-orden">
        <div className="card">
          <h3>Estado</h3>
          <p>{orden.estado}</p>
        </div>

        <div className="card">
          <h3>Fecha estimada de entrega</h3>
          <p>{orden.fecha_entrega}</p>
        </div>

        <div className="card">
          <h3>Método de pago</h3>
          <p>{orden.metodo_pago}</p>
        </div>

        <div className="card">
          <h3>Dirección de envío</h3>
          <p>{orden.direccion}</p>
        </div>
      </div>

      <h2>Productos Comprados</h2>

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
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>
                ${producto.precio.toLocaleString("es-CO")}
              </td>
              <td>
                $
                {(
                  producto.precio * producto.cantidad
                ).toLocaleString("es-CO")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total">
        <h2>
          Total: $
          {orden.precio_total.toLocaleString("es-CO")}
        </h2>
      </div>

      <button className="btn-volver">
        Volver a mis compras
      </button>
    </div>
  );
}

export default OrdenCompra;