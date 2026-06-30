import "./login.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PublicNavbar from "../components/PublicNavbar";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      if (response.data.id_rol === 1) {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page">
      <PublicNavbar />

      <div className="login-container">
        <div className="login-card">

          <div className="login-left">
            <h2>
              Inicia Sesión
              <br />
              con NattyMoon
            </h2>

            <div className="input-group">
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            <div className="remember">
              <input type="checkbox" />
              <label>Recordarme</label>
            </div>

            <button
              className="login-btn"
              onClick={handleLogin}
            >
              INICIAR SESIÓN
            </button>

            <div className="forgot-password">
              <button
                type="button"
                className="forgot-btn"
                onClick={() => navigate("/recuperar-password")}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <div className="register-link">
              ¿No tienes cuenta?
              <span onClick={() => navigate("/register")}>
                {" "}Regístrate aquí
              </span>
            </div>

          </div>

          <div className="login-right">
            <img src={logo} alt="NattyMoon" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;