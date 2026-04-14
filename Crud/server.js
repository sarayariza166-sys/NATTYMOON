const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Nattymoon",
  password: "123456",
  port: 5432,
});

// FRONT
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// CATEGORIAS
app.get("/categorias", async (req, res) => {
  const r = await pool.query("SELECT * FROM categoria");
  res.json(r.rows);
});

// PRODUCTOS (CON VARIANTE BIEN)
app.get("/productos", async (req, res) => {
  const r = await pool.query(`
    SELECT 
      p.id_producto,
      p.nombre,
      p.descripcion,
      p.precio,
      v.talla,
      v.stock,
      p.id_categoria
    FROM producto p
    LEFT JOIN variantes v ON p.id_producto = v.id_producto
    ORDER BY p.id_producto
  `);

  res.json(r.rows);
});

// CREAR / EDITAR (MISMO BOTÓN)
app.post("/productos", async (req, res) => {
  try {
    const {
      id_producto,
      id_categoria,
      nombre,
      descripcion,
      precio,
      talla,
      stock,
    } = req.body;

    // SI EXISTE → UPDATE
    const existe = await pool.query(
      "SELECT * FROM producto WHERE id_producto=$1",
      [id_producto],
    );

    if (existe.rows.length > 0) {
      await pool.query(
        `UPDATE producto 
         SET nombre=$1, descripcion=$2, precio=$3, id_categoria=$4
         WHERE id_producto=$5`,
        [nombre, descripcion, precio, id_categoria, id_producto],
      );

      await pool.query(
        `UPDATE variantes 
         SET talla=$1, stock=$2 
         WHERE id_producto=$3`,
        [talla, stock, id_producto],
      );

      return res.json({ msg: "actualizado" });
    }

    // INSERT
    await pool.query(
      `INSERT INTO producto 
      (id_producto, id_categoria, nombre, descripcion, precio)
      VALUES ($1,$2,$3,$4,$5)`,
      [id_producto, id_categoria, nombre, descripcion, precio],
    );

    await pool.query(
      `INSERT INTO variantes 
      (id_variante, id_producto, talla, stock)
      VALUES ($1,$2,$3,$4)`,
      [id_producto, id_producto, talla, stock],
    );

    res.json({ msg: "creado" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// ELIMINAR
app.delete("/productos/:id", async (req, res) => {
  const id = req.params.id;

  await pool.query("DELETE FROM variantes WHERE id_producto=$1", [id]);
  await pool.query("DELETE FROM producto WHERE id_producto=$1", [id]);

  res.json({ ok: true });
});

app.listen(3001, () => {
  console.log("OK http://localhost:3001");
});
