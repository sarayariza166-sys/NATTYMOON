import "./Configuracion.css";

function Configuracion() {
  return (
    <div className="vista-admin configuracion-page">
      <h1>Configuracion</h1>
      <form className="config-form">
        <label>
          Nombre de la tienda
          <input defaultValue="NattyMoon" />
        </label>
        <label>
          Correo de contacto
          <input defaultValue="contacto@nattymoon.com" />
        </label>
        <label>
          Envio principal
          <select defaultValue="colombia">
            <option value="colombia">Envios a toda Colombia</option>
            <option value="ciudad">Solo ciudad principal</option>
          </select>
        </label>
        <button type="button">Guardar cambios</button>
      </form>
    </div>
  );
}

export default Configuracion;
