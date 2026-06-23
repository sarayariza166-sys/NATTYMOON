import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import logo from "../assets/logo.png";
import "./PublicNavbar.css";

function PublicNavbar({ searchValue = "", onSearchChange, onSearchSubmit }) {
  const navigate = useNavigate();
  const { totalItems } = useCarrito();
  const [usuarioAbierto, setUsuarioAbierto] = useState(false);
  const [buscadorAbierto, setBuscadorAbierto] = useState(false);
  const [busquedaLocal, setBusquedaLocal] = useState("");
  const valorBusqueda = onSearchChange ? searchValue : busquedaLocal;

  const cambiarBusqueda = (valor) => {
    if (onSearchChange) onSearchChange(valor);
    else setBusquedaLocal(valor);
  };

  const enviarBusqueda = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit(valorBusqueda.trim());
  };

  return (
    <nav className="public-navbar">
      <button className="public-menu" aria-label="Abrir menu">☰</button>

      <button className="public-brand" onClick={() => navigate("/home")}> 
        <img src={logo} alt="NattyMoon" />
        <span>Nattymoon</span>
      </button>

      <div className="public-actions">
        <form className={buscadorAbierto ? "public-search abierto" : "public-search"} onSubmit={enviarBusqueda}>
          {buscadorAbierto && (
            <input autoFocus value={valorBusqueda} onChange={(e) => cambiarBusqueda(e.target.value)} placeholder="Buscar productos" />
          )}
          <button
            type={buscadorAbierto ? "submit" : "button"}
            className="public-icon search-icon"
            aria-label="Buscar productos"
            onClick={() => !buscadorAbierto && setBuscadorAbierto(true)}
          />
        </form>

        <div className="public-user-wrap">
          <button className="public-icon user-icon-nav" aria-label="Usuario" onClick={() => setUsuarioAbierto(!usuarioAbierto)} />
          {usuarioAbierto && (
            <div className="public-user-menu">
              <button onClick={() => navigate("/login")}>Iniciar sesion</button>
              <p>¿No tienes cuenta?</p>
              <button className="register-btn" onClick={() => navigate("/register")}>Registrar</button>
            </div>
          )}
        </div>

        <button className="public-icon bag-icon" aria-label="Bolsa" onClick={() => navigate("/carrito")}>
          <span>{totalItems}</span>
        </button>
      </div>
    </nav>
  );
}

export default PublicNavbar;
