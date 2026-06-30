export const CATALOGOS = [
  ["hombre", "Hombre", "Catalogo de Hombres"],
  ["mujer", "Mujer", "Catalogo de Mujeres"],
  ["nina", "Nina", "Catalogo de Nina"],
  ["nino", "Nino", "Catalogo de Nino"],
  ["pantuflas", "Pantuflas", "Catalogo de Pantuflas"],
  ["levantadoras", "Levantadoras", "Catalogo de Levantadoras"],
].map(([value, label, titulo]) => ({
  value,
  label,
  titulo,
  ruta: `/${value}`,
}));

export const PRODUCTO_VACIO = {
  nombre: "",
  descripcion: "",
  precio: "",
  inventario: "",
  imagen: "",
};

export const leerProductos = () =>
  JSON.parse(localStorage.getItem("productos")) || [];

export const guardarProductos = (productos) =>
  localStorage.setItem("productos", JSON.stringify(productos));
