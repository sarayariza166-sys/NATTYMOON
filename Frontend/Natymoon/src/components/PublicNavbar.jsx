import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../Carrito/CarritoContext";
import { CATALOGOS } from "../data/catalogos";
import logo from "../assets/logo.png";
import "./PublicNavbar.css";

function PublicNavbar({
  searchValue = "",
  onSearchChange,
  onSearchSubmit,
}) {
  const navigate = useNavigate();
  const { totalItems } = useCarrito();

  const [usuarioAbierto, setUsuarioAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [buscadorAbierto, setBuscadorAbierto] = useState(false);
  const [busquedaLocal, setBusquedaLocal] = useState("");

  const valorBusqueda = onSearchChange
    ? searchValue
    : busquedaLocal;

  const cambiarBusqueda = (valor) => {
    if (onSearchChange) {
      onSearchChange(valor);
    } else {
      setBusquedaLocal(valor);
    }
  };

  const enviarBusqueda = (e) => {
    e.preventDefault();

    if (onSearchSubmit) {
      onSearchSubmit(valorBusqueda.trim());
    }
  };

  return (
    <nav className="public-navbar">

      {/* MENU CATALOGOS */}
      <div className="menu-catalogos-container">

        <button
          className="menu-btn"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          ☰
        </button>

        {menuAbierto && (
          <div className="menu-catalogos">

            <h3>Categorías</h3>

            {CATALOGOS.map((catalogo) => (
              <button
                key={catalogo.value}
                onClick={() => {
                  navigate(catalogo.ruta);
                  setMenuAbierto(false);
                }}
              >
                {catalogo.label}
              </button>
            ))}

          </div>
        )}

      </div>

      {/* LOGO */}
      <button
        className="public-brand"
        onClick={() => navigate("/home")}
      >
        <img src={logo} alt="NattyMoon" />
        <span>NattyMoon</span>
      </button>

      {/* ACCIONES */}
      <div className="public-actions">

        <form
          className={
            buscadorAbierto
              ? "public-search abierto"
              : "public-search"
          }
          onSubmit={enviarBusqueda}
        >
          {buscadorAbierto && (
            <input
              autoFocus
              value={valorBusqueda}
              onChange={(e) =>
                cambiarBusqueda(e.target.value)
              }
              placeholder="Buscar productos"
            />
          )}

          <button
            type={buscadorAbierto ? "submit" : "button"}
            className="public-icon search-icon"
            aria-label="Buscar"
            onClick={() =>
              !buscadorAbierto &&
              setBuscadorAbierto(true)
            }
          />
        </form>

        {/* USUARIO */}
        <div className="public-user-wrap">

          <button
            className="public-icon user-icon-nav"
            aria-label="Usuario"
            onClick={() =>
              setUsuarioAbierto(!usuarioAbierto)
            }
          />

          {usuarioAbierto && (
            <div className="public-user-menu">

              <button
                onClick={() => navigate("/login")}
              >
                Iniciar sesión
              </button>

              <p>¿No tienes cuenta?</p>

              <button
                className="register-btn"
                onClick={() => navigate("/register")}
              >
                Registrar
              </button>

            </div>
          )}

        </div>

        {/* CARRITO */}
        <button
          className="public-icon bag-icon"
          aria-label="Carrito"
          onClick={() => navigate("/carrito")}
        >
          <span>{totalItems}</span>
        </button>

      </div>

    </nav>
  );
}

export default PublicNavbar;