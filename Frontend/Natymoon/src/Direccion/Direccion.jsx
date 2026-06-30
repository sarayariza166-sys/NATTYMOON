import { useState } from "react";
import "./direccion.css";

function Direccion() {
  const [direccion, setDireccion] = useState({
    linea_direccion: "",
    ciudad: "",
    telefono_contacto: "",
  });

  const handleChange = (e) => {
    setDireccion({
      ...direccion,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      id_usuario: 6,
      ...direccion,
    });

    alert("Dirección guardada correctamente");
  };

  return (
    <div className="direccion-container">
      <div className="direccion-card">
        <h1>Agregar Dirección</h1>

        <p>
          Ingresa la dirección donde deseas recibir tus
          pedidos.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Dirección</label>

            <input
              type="text"
              name="linea_direccion"
              placeholder="Ej: Calle 50 #12-25"
              value={direccion.linea_direccion}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Ciudad</label>

            <input
              type="text"
              name="ciudad"
              placeholder="Ej: Cali"
              value={direccion.ciudad}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Teléfono de contacto</label>

            <input
              type="text"
              name="telefono_contacto"
              placeholder="Ej: 3023456789"
              value={direccion.telefono_contacto}
              onChange={handleChange}
            />
          </div>

          <button type="submit">
            Guardar Dirección
          </button>
        </form>
      </div>
    </div>
  );
}

export default Direccion;