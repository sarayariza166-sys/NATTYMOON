"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ correo, contrasena }),
    });

    const data = await res.json();

    alert(data.message || data.error);

    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/crud");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Iniciar Sesión</h2>

        <input
          placeholder="Correo"
          onChange={(e) => setCorreo(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setContrasena(e.target.value)}
        />

        <button onClick={handleLogin}>Entrar</button>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          ¿No tienes cuenta?{" "}
          <Link href="/register" style={{ color: "#2a5298", fontWeight: "bold" }}>
            Créala aquí
          </Link>
        </p>
      </div>
    </div>
  );
}