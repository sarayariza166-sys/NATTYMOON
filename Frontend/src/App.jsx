import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout/AdminLayout";
import Productos from "./Admi/Productos";
import CatalogoBase from "./catalogos/CatalogoBase";
import Carrito from "./Carrito/Carrito";
import Clientes from "./Admi/Clientes/Clientes";
import Cupones from "./Cupones/cupones";
import Empleados from "./Admi/Empleados/Empleados";
import Configuracion from "./Configuracion/Configuracion";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./Home/home";
import Login from "./login/login";
import Pedidos from "./Pedidos/Pedidos";
import Register from "./register/register";
import { CATALOGOS } from "./data/catalogos";

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Productos />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Route>

      <Route path="/home" element={<Home />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/cupones" element={<Cupones />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {CATALOGOS.map(({ value, ruta, titulo }) => (
        <Route key={value} path={ruta} element={<CatalogoBase categoria={value} titulo={titulo} />} />
      ))}
    </Routes>
  );
}

export default App;
