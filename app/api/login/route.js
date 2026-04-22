import { pool } from "../../../conexion/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    let { correo, contrasena } = await req.json();

    // limpiar espacios
    correo = correo.trim();
    contrasena = contrasena.trim();

    const result = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );

    if (result.rows.length === 0) {
      return Response.json({ error: "Usuario no existe" });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(
      contrasena,
      user.contrasena
    );

    if (!valid) {
      return Response.json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id_usuario }, "secreto");

    return Response.json({
      message: "Login exitoso",
      token,
    });

  } catch (error) {
    console.log("ERROR LOGIN:", error);
    return Response.json({ error: "Error en el servidor" });
  }
}