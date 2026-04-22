"use client";
import { useEffect, useState } from "react";

const API = "/api/crud";

const emptyForm = {
  id: null,
  nombre: "",
  descripcion: "",
  imagen: "",
  precio: "",
  talla: "",
  stock: "",
};

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const fetchProductos = async () => {
    try {
      const r = await fetch(API);
      const data = await r.json();
      if (Array.isArray(data)) {
        setProductos(data);
      } else {
        console.error("API error:", data);
        setProductos([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setProductos([]);
    }
  };

  useEffect(() => { fetchProductos(); }, []);

  const flash = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleEditar = (p) => {
    setForm(p);
    setEditando(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelar = () => {
    setForm(emptyForm);
    setEditando(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      flash("ok", editando ? "✅ Producto actualizado" : "✅ Producto creado");
      setForm(emptyForm);
      setEditando(false);
      fetchProductos();
    } catch (err) {
      flash("err", `❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      const res = await fetch(`${API}?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      flash("ok", "🗑️ Producto eliminado");
      fetchProductos();
    } catch (err) {
      flash("err", `❌ ${err.message}`);
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <span style={styles.logo}>🌙 natymoon</span>
          <h1 style={styles.title}>Gestión de Productos</h1>
        </div>
      </header>

      {msg && (
        <div style={{ ...styles.toast, background: msg.type === "ok" ? "#14532d" : "#7f1d1d" }}>
          {msg.text}
        </div>
      )}

      <main style={styles.main}>
        {/* FORMULARIO */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>{editando ? "✏️ Editar Producto" : "➕ Nuevo Producto"}</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.grid2}>
              <label style={styles.label}>
                Nombre
                <input style={styles.input} name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Pijama Floral" required />
              </label>
              <label style={styles.label}>
                Precio
                <input style={styles.input} name="precio" type="number" step="0.01" value={form.precio} onChange={handleChange} placeholder="0.00" required />
              </label>
            </div>

            <label style={styles.label}>
              Descripción
              <textarea style={{ ...styles.input, resize: "vertical", minHeight: 72 }} name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción del producto..." />
            </label>

            <label style={styles.label}>
              URL de Imagen
              <input style={styles.input} name="imagen" value={form.imagen} onChange={handleChange} placeholder="https://..." />
            </label>

            {form.imagen && (
              <img src={form.imagen} alt="preview" style={styles.imgPreview} onError={(e) => (e.target.style.display = "none")} />
            )}

            <div style={styles.grid2}>
              <label style={styles.label}>
                Talla
                <input style={styles.input} name="talla" value={form.talla} onChange={handleChange} placeholder="S / M / L / XL" required />
              </label>
              <label style={styles.label}>
                Stock
                <input style={styles.input} name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="0" required />
              </label>
            </div>

            <div style={styles.formActions}>
              {editando && (
                <button type="button" onClick={handleCancelar} style={styles.btnSecondary}>Cancelar</button>
              )}
              <button type="submit" style={styles.btnPrimary} disabled={loading}>
                {loading ? "Guardando..." : editando ? "Actualizar" : "Crear Producto"}
              </button>
            </div>
          </form>
        </section>

        {/* TABLA */}
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>📦 Productos ({productos.length})</h2>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["ID", "Imagen", "Nombre", "Descripción", "Precio", "Talla", "Stock", "Acciones"].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ ...styles.td, textAlign: "center", color: "#6b7280" }}>No hay productos aún.</td>
                  </tr>
                ) : (
                  productos.map((p) => (
                    <tr key={p.id} style={styles.tr}>
                      <td style={{ ...styles.td, color: "#9ca3af" }}>#{p.id}</td>
                      <td style={styles.td}>
                        {p.imagen
                          ? <img src={p.imagen} alt={p.nombre} style={styles.thumb} onError={(e) => (e.target.style.display = "none")} />
                          : <span style={{ color: "#4b5563" }}>—</span>}
                      </td>
                      <td style={{ ...styles.td, fontWeight: 600 }}>{p.nombre}</td>
                      <td style={{ ...styles.td, color: "#9ca3af", maxWidth: 180 }}>{p.descripcion}</td>
                      <td style={styles.td}>
                        <span style={styles.badge}>${Number(p.precio).toLocaleString()}</span>
                      </td>
                      <td style={styles.td}>{p.talla}</td>
                      <td style={styles.td}>
                        <span style={{ ...styles.badge, background: p.stock > 5 ? "#14532d" : "#7f1d1d" }}>{p.stock}</span>
                      </td>
                      <td style={styles.td}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => handleEditar(p)} style={styles.btnEdit}>✏️</button>
                          <button onClick={() => handleEliminar(p.id)} style={styles.btnDelete}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#0f0f0f", color: "#f3f4f6", fontFamily: "'Segoe UI', system-ui, sans-serif" },
  header: { background: "#18181b", borderBottom: "1px solid #27272a", padding: "16px 24px", position: "sticky", top: 0, zIndex: 10 },
  headerInner: { maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 },
  logo: { fontSize: 22 },
  title: { margin: 0, fontSize: 20, fontWeight: 700, color: "#f9fafb" },
  toast: { position: "fixed", top: 72, right: 24, padding: "12px 20px", borderRadius: 8, color: "#fff", fontWeight: 600, zIndex: 100, boxShadow: "0 4px 12px rgba(0,0,0,0.4)" },
  main: { maxWidth: 1100, margin: "32px auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: 28 },
  card: { background: "#18181b", border: "1px solid #27272a", borderRadius: 12, padding: 28 },
  cardTitle: { margin: "0 0 20px", fontSize: 18, fontWeight: 700, color: "#f9fafb" },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  label: { display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 600, color: "#d1d5db" },
  input: { padding: "10px 12px", background: "#09090b", border: "1px solid #3f3f46", borderRadius: 8, color: "#f3f4f6", fontSize: 14, outline: "none" },
  imgPreview: { width: 120, height: 120, objectFit: "cover", borderRadius: 8, border: "1px solid #27272a" },
  formActions: { display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 4 },
  btnPrimary: { padding: "10px 24px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer" },
  btnSecondary: { padding: "10px 20px", background: "#27272a", color: "#d1d5db", border: "1px solid #3f3f46", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer" },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "12px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #27272a" },
  tr: { borderBottom: "1px solid #1f1f23" },
  td: { padding: "13px 14px", fontSize: 14, verticalAlign: "middle" },
  thumb: { width: 48, height: 48, objectFit: "cover", borderRadius: 6, border: "1px solid #27272a" },
  badge: { display: "inline-block", padding: "3px 10px", borderRadius: 20, background: "#27272a", fontSize: 13, fontWeight: 600 },
  btnEdit: { background: "#1e3a5f", border: "none", borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontSize: 14 },
  btnDelete: { background: "#3b1010", border: "none", borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontSize: 14 },
};