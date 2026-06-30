import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout/AdminLayout";

import Productos from "./Admi/Productos";
import Clientes from "./Admi/Clientes/Clientes";
import Empleados from "./Admi/Empleados/Empleados";

import CatalogoBase from "./catalogos/CatalogoBase";

import Carrito from "./Carrito/Carrito";
import Cupones from "./Cupones/cupones";
import Configuracion from "./Configuracion/Configuracion";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./Home/home";
import Login from "./login/login";
import Pedidos from "./Pedidos/Pedidos";
import Register from "./register/register";

import DetalleOrden from "./Ordenes/DetalleOrden";
import ProductosOrden from "./Ordenes/ProductosOrden";

import RecuperarPassword from "./RecuperarPassword/RecuperarPassword";

import Pago from "./Pago/Pago";

import { CATALOGOS } from "./data/catalogos";

function App() {
  return (
    <Routes>

      {/* ADMIN */}
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Route>

      {/* PUBLICAS */}
      <Route path="/home" element={<Home />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/cupones" element={<Cupones />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* RECUPERAR CONTRASEÑA */}
      <Route
        path="/recuperar-password"
        element={<RecuperarPassword />}
      />

      {/* PAGO */}
      <Route
        path="/pago"
        element={<Pago />}
      />

      {/* ORDENES */}
      <Route
        path="/detalle-orden"
        element={<DetalleOrden />}
      />

      <Route
        path="/productos-orden"
        element={<ProductosOrden />}
      />

      {/* CATALOGOS */}
      {CATALOGOS.map(({ value, ruta, titulo }) => (
        <Route
          key={value}
          path={ruta}
          element={
            <CatalogoBase
              categoria={value}
              titulo={titulo}
            />
          }
        />
      ))}

    </Routes>
  );
}

export default App;