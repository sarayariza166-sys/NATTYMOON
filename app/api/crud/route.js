import { pool } from "../../../conexion/db.js";
import { NextResponse } from "next/server";

// ── GET ──────────────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const r = await pool.query("SELECT * FROM productos ORDER BY id");
    return NextResponse.json(r.rows);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ── POST: Crear o editar ─────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const { id, nombre, descripcion, imagen, precio, talla, stock } =
      await request.json();

    if (id) {
      // EDITAR
      await pool.query(
        `UPDATE productos 
         SET nombre=$1, descripcion=$2, imagen=$3, precio=$4, talla=$5, stock=$6
         WHERE id=$7`,
        [nombre, descripcion, imagen, precio, talla, stock, id]
      );
      return NextResponse.json({ msg: "actualizado" });
    }

    // CREAR
    await pool.query(
      `INSERT INTO productos (nombre, descripcion, imagen, precio, talla, stock)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [nombre, descripcion, imagen, precio, talla, stock]
    );
    return NextResponse.json({ msg: "creado" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ── DELETE ───────────────────────────────────────────────────────────────────
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });

  try {
    await pool.query("DELETE FROM productos WHERE id=$1", [id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}