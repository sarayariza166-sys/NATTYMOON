import { useState } from "react";
import "./home.css";
import logo from "../assets/logo.png";
import mujer from "../assets/Mujer.png";
import hombre from "../assets/Hombre.png";
import nina from "../assets/Niña.png";
import nino from "../assets/Niño.png";
import pantuflas from "../assets/Pantuflas.png";
import levantadoras from "../assets/Levantadoras.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [mostrarMas, setMostrarMas] = useState(false);

  return (
    <div className="home">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="menu">☰</div>

        <div
          className="logo-navbar"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="NattyMoon" />
          <h1>NattyMoon</h1>
        </div>

        <div className="icons">
          <span>🔍</span>

          <div className="user-menu">
            <span className="user-icon">👤</span>

            <div className="dropdown">

              <button onClick={() => navigate("/login")}>
                Iniciar sesión
              </button>

              <button
                className="google-btn"
                onClick={() =>
                  window.open(
                    "https://accounts.google.com/",
                    "_blank"
                  )
                }
              >
                Iniciar sesión con Google
              </button>

              <p>¿No tienes cuenta?</p>

              <button
                className="register-btn"
                onClick={() => navigate("/register")}
              >
                Regístrate
              </button>

            </div>
          </div>

          <span>🛍️</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Dulces sueños,
            <br />
            momentos inolvidables
          </h1>

          <p>
            Descubre nuestras pijamas diseñadas para brindar
            comodidad, estilo y descanso para toda la familia.
          </p>

          <button>Comprar Ahora</button>
        </div>

        <div className="hero-image">
          <img src={logo} alt="NattyMoon" />
        </div>
      </section>

      {/* CATÁLOGO */}
      <section className="catalog">
        <h2>Catálogo</h2>

        <div className="catalog-grid">

          {/* MUJER */}
          <div
            className="catalog-card"
            onClick={() => navigate("/mujer")}
          >
            <img
              src={mujer}
              alt="Mujer"
              className="catalog-img"
            />
            <h3>Mujer</h3>
          </div>

          {/* HOMBRE */}
          <div
            className="catalog-card"
            onClick={() => navigate("/hombre")}
          >
            <img
              src={hombre}
              alt="Hombre"
              className="catalog-img"
            />
            <h3>Hombre</h3>
          </div>

          {/* NIÑA */}
          <div
            className="catalog-card"
            onClick={() => navigate("/nina")}
          >
            <img
              src={nina}
              alt="Niña"
              className="catalog-img"
            />
            <h3>Niña</h3>
          </div>

          {/* NIÑO */}
          <div
            className="catalog-card"
            onClick={() => navigate("/nino")}
          >
            <img
              src={nino}
              alt="Niño"
              className="catalog-img"
            />
            <h3>Niño</h3>
          </div>

          {!mostrarMas ? (
            <div
              className="catalog-card"
              onClick={() => setMostrarMas(true)}
            >
              <img
                src={logo}
                alt="Ver Más"
                className="catalog-img"
              />
              <h3>Ver Más</h3>
            </div>
          ) : (
            <>
              {/* PANTUFLAS */}
              <div
                className="catalog-card"
                onClick={() => navigate("/pantuflas")}
              >
                <img
                  src={pantuflas}
                  alt="Pantuflas"
                  className="catalog-img"
                />
                <h3>Pantuflas</h3>
              </div>

              {/* LEVANTADORAS */}
              <div
                className="catalog-card"
                onClick={() => navigate("/levantadoras")}
              >
                <img
                  src={levantadoras}
                  alt="Levantadoras"
                  className="catalog-img"
                />
                <h3>Levantadoras</h3>
              </div>
            </>
          )}

        </div>
      </section>

      {/* CUPÓN */}
      <section className="coupon">
        <div className="coupon-text">
          <h2>Cupón de Descuento</h2>

          <p>
            Invita a 3 amigos a comprar en NattyMoon
            y recibe un descuento especial en tu
            próxima compra.
          </p>

          <button>Más Información</button>
        </div>

        <div className="coupon-circle">
          <h1>5%</h1>
          <span>OFF</span>
        </div>
      </section>

    </div>
  );
}

export default Home;