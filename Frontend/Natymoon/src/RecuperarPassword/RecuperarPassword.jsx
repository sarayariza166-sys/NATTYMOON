import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import "./RecuperarPassword.css";

function RecuperarPassword() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");

  const enviarCorreo = (e) => {
    e.preventDefault();

    alert(
      `Se enviará un enlace de recuperación a: ${correo}`
    );

    // Aquí tu compañero conectará el backend
    // POST /api/auth/recuperar-password
  };

  return (
    <div className="recovery-page">
      <PublicNavbar />

      <div className="recovery-container">

        <div className="recovery-card">

          <div className="recovery-left">

            <h1>Recupera tu Contraseña</h1>

            <p>
              Ingresa tu correo electrónico y te
              enviaremos un enlace para restablecer
              tu contraseña.
            </p>

            <form onSubmit={enviarCorreo}>
              <label>Correo electrónico</label>

              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={correo}
                onChange={(e) =>
                  setCorreo(e.target.value)
                }
                required
              />

              <button type="submit">
                ENVIAR ENLACE
              </button>
            </form>

            <div className="separator">
              <span>o</span>
            </div>

            <div className="login-link">
              <p>¿Recordaste tu contraseña?</p>

              <button
                onClick={() => navigate("/login")}
              >
                Inicia sesión aquí →
              </button>
            </div>

          </div>

          <div className="recovery-right">

            <img
              src="/logo.png"
              alt="NattyMoon"
            />

          </div>

        </div>

        <div className="help-box">
          <h3>¿No recibes el correo?</h3>

          <p>
            Revisa tu carpeta de spam o correo no
            deseado. Si el problema persiste,
            contáctanos.
          </p>
        </div>

      </div>
    </div>
  );
}

export default RecuperarPassword;