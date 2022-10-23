import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './css/styles.css';
import AddPersona from "./components/Persona/AddPersona";
import Persona from "./components/Persona/Persona";
import PersonaList from "./components/Persona/ListPersona";

function App() {
  return (<>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" className="navbar-brand">UNA</a>
      <div className="navbar-nav mr-auto">

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Persona
          </a>

          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><Link to={"/agregar-persona"} className="dropdown-item">Agregar Persona</Link></li>
            <li><Link to={"/personas"} className="dropdown-item">Lista de Personas</Link></li>
          </ul>
        </li>

        <li className="nav-item">
          <Link to={"/personas"} className="nav-link">
            Lista de Personas
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/personas/add"} className="nav-link">
            Agregar Persona
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/logs"} className="nav-link">
            Consultar logs
          </Link>
        </li>
      </div>
    </nav>
    <Routes>
      <Route path="/personas" element={<PersonaList />} />
      <Route path="/personas/add" element={<AddPersona />} />
      <Route path="/personas/:id" element={<Persona />} />
    </Routes>
  </>);
}

export default App;
