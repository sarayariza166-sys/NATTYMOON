import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import "./AdminLayout.css";

const menuItems = [
  { path: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { path: "/pedidos", icon: "pedidos", label: "Pedidos" },
  { path: "/productos", icon: "catalogo", label: "Catalogo de Productos" },
  { path: "/clientes", icon: "clientes", label: "Clientes" },
  { path: "/login", icon: "logout", label: "Cerrar sesion" },
];

function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        {menuItems.map(({ path, icon, label, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              isActive ? "sidebar-link activo" : "sidebar-link"
            }
          >
            <span className={`sidebar-icon icon-${icon}`} />
            <span>{label}</span>
          </NavLink>
        ))}
      </aside>

      <section className="admin-content">
        <header className="admin-topbar">
          <button className="admin-brand" type="button">
            <img src={logo} alt="NattyMoon" />
            <span>NattyMoon</span>
          </button>
        </header>

        <Outlet />
      </section>
    </div>
  );
}

export default AdminLayout;
