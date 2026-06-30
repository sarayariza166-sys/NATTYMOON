import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATALOGOS, PRODUCTO_VACIO, guardarProductos, leerProductos } from "../data/catalogos";
import "./productos.css";

function Productos() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoria, setCategoria] = useState(CATALOGOS[0].value);
  const [nuevoProducto, setNuevoProducto] = useState(PRODUCTO_VACIO);

  const productosFiltrados = useMemo(
    () => productos.filter((producto) => producto.categoria === categoria),
    [productos, categoria]
  );

  const catalogoActual = CATALOGOS.find((catalogo) => catalogo.value === categoria);

  useEffect(() => setProductos(leerProductos()), []);

  const actualizarProductos = (nuevosProductos) => {
    setProductos(nuevosProductos);
    guardarProductos(nuevosProductos);
  };

  const handleChange = ({ target }) => {
    setNuevoProducto({ ...nuevoProducto, [target.name]: target.value });
  };

  const handleImagen = ({ target }) => {
    const file = target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setNuevoProducto({ ...nuevoProducto, imagen: reader.result });
    reader.readAsDataURL(file);
  };

  const guardarProducto = () => {
    actualizarProductos([...productos, { id: Date.now(), ...nuevoProducto, categoria }]);
    setNuevoProducto(PRODUCTO_VACIO);
    setMostrarModal(false);
  };

  const eliminarProducto = (id) => {
    actualizarProductos(productos.filter((producto) => producto.id !== id));
  };

  const editarProducto = (producto) => {
    const nombre = prompt("Nuevo nombre", producto.nombre);
    if (!nombre) return;

    actualizarProductos(
      productos.map((item) => item.id === producto.id ? { ...item, nombre } : item)
    );
  };

  return (
    <div className="admin-container">
      <Titulo />

      <BarraSuperior
        categoria={categoria}
        setCategoria={setCategoria}
        abrirModal={() => setMostrarModal(true)}
      />

      <MenuCatalogos categoria={categoria} navigate={navigate} />

      <TablaProductos
        productos={productosFiltrados}
        editarProducto={editarProducto}
        eliminarProducto={eliminarProducto}
      />

      {mostrarModal && (
        <ModalProducto
          producto={nuevoProducto}
          catalogo={catalogoActual}
          handleChange={handleChange}
          handleImagen={handleImagen}
          guardarProducto={guardarProducto}
          cerrar={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
}

function Titulo() {
  return <div className="titulo-admin"><h1>Catalogo de Productos del Administrador</h1></div>;
}

function BarraSuperior({ categoria, setCategoria, abrirModal }) {
  return (
    <div className="barra-superior">
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        {CATALOGOS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
      </select>
      <button className="btn-nuevo" onClick={abrirModal}>+ CREAR NUEVO PRODUCTO</button>
    </div>
  );
}

function MenuCatalogos({ categoria, navigate }) {
  return (
    <div className="menu-catalogos">
      {CATALOGOS.map(({ value, label, ruta }) => (
        <button key={value} className={categoria === value ? "activo" : ""} onClick={() => navigate(ruta)}>
          {label}
        </button>
      ))}
    </div>
  );
}

function TablaProductos({ productos, editarProducto, eliminarProducto }) {
  return (
    <div className="tabla-contenedor">
      <table>
        <thead>
          <tr>{["ID", "Imagen", "Nombre", "Categoria", "Descripcion", "Precio", "Inventario", "Acciones"].map((titulo) => <th key={titulo}>{titulo}</th>)}</tr>
        </thead>
        <tbody>
          {productos.length === 0 ? <FilaVacia /> : productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.imagen && <img src={producto.imagen} alt={producto.nombre} className="img-producto" />}</td>
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td>{producto.descripcion}</td>
              <td>${producto.precio}</td>
              <td>{producto.inventario}</td>
              <td>
                <button className="editar" onClick={() => editarProducto(producto)}>EDITAR</button>
                <button className="eliminar" onClick={() => eliminarProducto(producto.id)}>ELIMINAR</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FilaVacia() {
  return <tr><td colSpan="8">No hay productos registrados en este catalogo</td></tr>;
}

function ModalProducto({ producto, catalogo, handleChange, handleImagen, guardarProducto, cerrar }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Nuevo Producto</h2>
        <p className="modal-categoria">Se guardara en: {catalogo?.label}</p>
        <input type="text" name="nombre" placeholder="Nombre" value={producto.nombre} onChange={handleChange} />
        <textarea name="descripcion" placeholder="Descripcion" value={producto.descripcion} onChange={handleChange} />
        <input type="number" name="precio" placeholder="Precio" value={producto.precio} onChange={handleChange} />
        <input type="number" name="inventario" placeholder="Inventario" value={producto.inventario} onChange={handleChange} />
        <label>Imagen del Producto</label>
        <input type="file" accept="image/*" onChange={handleImagen} />
        {producto.imagen && <img src={producto.imagen} alt="" className="preview" />}
        <div className="botones-modal">
          <button className="guardar" onClick={guardarProducto}>Guardar</button>
          <button className="cancelar" onClick={cerrar}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default Productos;
