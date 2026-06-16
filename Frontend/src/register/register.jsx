import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import logo from "../assets/logo.png";

function Register() {
  const navigate = useNavigate();

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    aceptarTerminos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.correo ||
      !formData.contraseña
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (!formData.aceptarTerminos) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    console.log(formData);

    alert("Usuario registrado correctamente");

    setFormData({
      nombre: "",
      correo: "",
      contraseña: "",
      aceptarTerminos: false,
    });
  };

  return (
    <div className="register-page">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="menu-icon">☰</div>

        <div
          className="logo-container"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <h1 className="logo-text">NattyMoon</h1>
        </div>

        <div className="nav-icons">
          <span>🔍</span>
          <span>♡</span>
          <span>🛍️</span>
        </div>
      </header>

      {/* FORMULARIO */}
      <main className="register-container">
        <div className="register-card">

          <div className="form-section">
            <h2>Regístrate en NattyMoon</h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="nombre"
                placeholder="Nombre Completo"
                value={formData.nombre}
                onChange={handleChange}
              />

              <input
                type="email"
                name="correo"
                placeholder="Correo Electrónico"
                value={formData.correo}
                onChange={handleChange}
              />

              <div className="password-container">
                <input
                  type={mostrarPassword ? "text" : "password"}
                  name="contraseña"
                  placeholder="Contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() =>
                    setMostrarPassword(!mostrarPassword)
                  }
                >
                  {mostrarPassword
                    ? "Ocultar"
                    : "Mostrar"}
                </button>
              </div>

              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="aceptarTerminos"
                  checked={formData.aceptarTerminos}
                  onChange={handleChange}
                />
                Acepto los términos y condiciones
              </label>

              <button type="submit">
                CREAR CUENTA
              </button>

              <p className="login-link">
                ¿Ya tienes cuenta?
                <a href="/login">
                  {" "}Inicia sesión aquí
                </a>
              </p>

            </form>
          </div>

          <div className="image-section">
            <img
              src={logo}
              alt="Logo NattyMoon"
            />
          </div>

        </div>
      </main>

    </div>
  );
}

export default Register;