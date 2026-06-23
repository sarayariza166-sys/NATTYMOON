import "./login.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PublicNavbar from "../components/PublicNavbar";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      <PublicNavbar />

      <div className="login-container">
        <div className="login-card">
          <div className="login-left">
            <h2>Inicia Sesión<br />con NattyMoon</h2>

            <div className="input-group"><input type="email" placeholder="Correo Electrónico" /></div>

            <div className="input-group password-group">
              <input type={showPassword ? "text" : "password"} placeholder="Contraseña" />
              <button type="button" className="show-btn" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            <div className="remember"><input type="checkbox" /><label>Recordarme</label></div>
          </div>

          <div className="login-right"><img src={logo} alt="NattyMoon" /></div>

          <div className="bottom-section">
            <button className="login-btn">INICIAR SESIÓN</button>
            <p className="forgot">¿Olvidaste tu contraseña?</p>
            <p className="register-text">¿No tienes cuenta?<span onClick={() => navigate("/register")}> Regístrate aquí</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
