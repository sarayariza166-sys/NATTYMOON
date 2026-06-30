import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import PublicNavbar from "../components/PublicNavbar";
import logo from "../assets/logo.png";
import mujer from "../assets/Mujer.png";
import hombre from "../assets/Hombre.png";
import nina from "../assets/Niña.png";
import nino from "../assets/Niño.png";
import pantuflas from "../assets/Pantuflas.png";
import levantadoras from "../assets/Levantadoras.png";

const catalogosPrincipales = [
  { nombre: "Mujer", ruta: "/mujer", imagen: mujer },
  { nombre: "Hombre", ruta: "/hombre", imagen: hombre },
  { nombre: "Niña", ruta: "/nina", imagen: nina },
  { nombre: "Niño", ruta: "/nino", imagen: nino },
];

const catalogosExtra = [
  { nombre: "Pantuflas", ruta: "/pantuflas", imagen: pantuflas },
  { nombre: "Levantadoras", ruta: "/levantadoras", imagen: levantadoras },
];

function Home() {
  const navigate = useNavigate();
  const [mostrarMas, setMostrarMas] = useState(false);
  const catalogos = mostrarMas ? [...catalogosPrincipales, ...catalogosExtra] : catalogosPrincipales;

  const buscarCatalogo = (texto) => {
    const encontrado = [...catalogosPrincipales, ...catalogosExtra].find((catalogo) =>
      catalogo.nombre.toLowerCase().includes(texto.toLowerCase())
    );
    if (encontrado) navigate(encontrado.ruta);
  };

  return (
    <div className="home">
      <PublicNavbar onSearchSubmit={buscarCatalogo} />
      <Hero />
      <Catalogo catalogos={catalogos} mostrarMas={mostrarMas} setMostrarMas={setMostrarMas} navigate={navigate} />
      <Cupon navigate={navigate} />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Dulces sueños,<br />momentos inolvidables</h1>
        <p>Descubre nuestras pijamas diseñadas para brindar comodidad, estilo y descanso para toda la familia.</p>
        <button>Comprar Ahora</button>
      </div>
      <div className="hero-image"><img src={logo} alt="NattyMoon" /></div>
    </section>
  );
}

function Catalogo({ catalogos, mostrarMas, setMostrarMas, navigate }) {
  return (
    <section className="catalog">
      <h2>Catálogo</h2>
      <div className="catalog-grid">
        {catalogos.map((catalogo) => <CatalogoCard key={catalogo.nombre} {...catalogo} navigate={navigate} />)}
        {!mostrarMas && <CatalogoCard nombre="Ver Más" imagen={logo} onClick={() => setMostrarMas(true)} />}
      </div>
    </section>
  );
}

function CatalogoCard({ nombre, ruta, imagen, navigate, onClick }) {
  return (
    <div className="catalog-card" onClick={onClick || (() => navigate(ruta))}>
      <img src={imagen} alt={nombre} className="catalog-img" />
      <h3>{nombre}</h3>
    </div>
  );
}

function Cupon({ navigate }) {
  return (
    <section className="coupon">
      <div className="coupon-text">
        <h2>Cupón de Descuento</h2>
        <p>Invita a 3 amigos a comprar en NattyMoon y recibe un descuento especial en tu próxima compra.</p>
        <button onClick={() => navigate("/cupones")}>Más Información</button>
      </div>
      <div className="coupon-circle"><h1>5%</h1><span>OFF</span></div>
    </section>
  );
}

export default Home;
