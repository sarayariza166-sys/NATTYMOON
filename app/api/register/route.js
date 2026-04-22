import { pool } from "../../../conexion/db.js";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    let { nombre, apellido, correo, contrasena, telefono } = await req.json();

    // limpiar espacios
    nombre = nombre.trim();
    apellido = apellido.trim();
    correo = correo.trim();
    contrasena = contrasena.trim();

    if (!nombre || !apellido || !correo || !contrasena) {
      return Response.json({ error: "Campos obligatorios" });
    }

    // verificar si existe
    const existe = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );

    if (existe.rows.length > 0) {
      return Response.json({ error: "El correo ya está registrado" });
    }

    // encriptar contraseña
    const hashed = await bcrypt.hash(contrasena, 10);

    // insertar
    await pool.query(
      `INSERT INTO usuarios(nombre, apellido, correo, contrasena, telefono)
       VALUES($1,$2,$3,$4,$5)`,
      [nombre, apellido, correo, hashed, telefono]
    );

    return Response.json({ message: "Usuario creado correctamente" });

  } catch (error) {
    console.log("ERROR REGISTER:", error);
    return Response.json({ error: "Error en el servidor" });
  }
}