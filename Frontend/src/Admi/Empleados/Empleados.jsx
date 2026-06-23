import { useState } from "react";
import "./Empleados.css";

const empleadosIniciales = [
  { id: 1, nombre: "Mariana Lopez", correo: "mariana@nattymoon.com", cargo: "Administradora", estado: "Activo" },
  { id: 2, nombre: "Daniel Perez", correo: "daniel@nattymoon.com", cargo: "Ventas", estado: "Activo" },
  { id: 3, nombre: "Sofia Ramirez", correo: "sofia@nattymoon.com", cargo: "Inventario", estado: "Activo" },
];

function Empleados() {
  const [empleados, setEmpleados] = useState(empleadosIniciales);

  const eliminarCuenta = (id) => {
    const confirmar = confirm(
      "Seguro que quieres eliminar esta cuenta de empleado?"
    );

    if (!confirmar) return;

    setEmpleados(
      empleados.filter((empleado) => empleado.id !== id)
    );
  };

  return (
    <div className="vista-admin empleados-page">
      <h1>Empleados</h1>

      <div className="empleados-grid">
        {empleados.length === 0 ? (
          <p className="empleados-vacio">
            No hay empleados registrados.
          </p>
        ) : (
          empleados.map((empleado) => (
            <article className="empleado-card" key={empleado.id}>
              <div className="empleado-avatar">
                {empleado.nombre[0]}
              </div>

              <h3>{empleado.nombre}</h3>
              <p>{empleado.correo}</p>
              <span className="empleado-cargo">{empleado.cargo}</span>
              <strong>{empleado.estado}</strong>

              <button
                className="btn-eliminar-cuenta"
                onClick={() => eliminarCuenta(empleado.id)}
              >
                Eliminar cuenta
              </button>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default Empleados;
