import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home/home";
import Login from "./login/login";
import Register from "./register/register";

import CatalogoMujer from "./catalogos/CatalogoMujer";
import CatalogoHombre from "./catalogos/CatalogoHombre";
import CatalogoNina from "./catalogos/CatalogoNina";
import CatalogoNino from "./catalogos/CatalogoNino";
import CatalogoPantuflas from "./catalogos/CatalogoPantuflas";
import CatalogoLevantadoras from "./catalogos/CatalogoLevantadoras";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/mujer" element={<CatalogoMujer />} />
        <Route path="/hombre" element={<CatalogoHombre />} />
        <Route path="/nina" element={<CatalogoNina />} />
        <Route path="/nino" element={<CatalogoNino />} />
        <Route path="/pantuflas" element={<CatalogoPantuflas />} />
        <Route path="/levantadoras" element={<CatalogoLevantadoras />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;