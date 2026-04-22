"use client";
import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleRegister = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        nombre,
        apellido,
        correo,
        contrasena,
        telefono,
      }),
    });

    const data = await res.json();

    alert(data.message || data.error);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Crear Cuenta</h2>

        <input placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
        <input placeholder="Apellido" onChange={(e) => setApellido(e.target.value)} />
        <input placeholder="Correo" onChange={(e) => setCorreo(e.target.value)} />
        <input type="password" placeholder="Contraseña" onChange={(e) => setContrasena(e.target.value)} />
        <input placeholder="Teléfono" onChange={(e) => setTelefono(e.target.value)} />

        <button onClick={handleRegister}>Registrarse</button>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" style={{ color: "#2a5298", fontWeight: "bold" }}>
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}