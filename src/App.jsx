import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./front-azul/pages/Home";
import Info from "./front-azul/pages/Info";
import About from "./front-azul/pages/About";
import FrontEndVerde from "./front-verde/pages/FrontEndVerde";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/about" element={<About />} />
          <Route path="/aprenda" element={<FrontEndVerde />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
