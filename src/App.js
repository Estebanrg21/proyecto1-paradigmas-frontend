import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './css/styles.css';
import AddPersona from "./components/Persona/AddPersona";
import Persona from "./components/Persona/Persona";
import PersonaList from "./components/Persona/ListPersona";
import LogList from './components/Log/LogList';
function App() {
  return (<>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" className="navbar-brand ms-2">Matrícula</a>
      <ul className="navbar-nav mr-auto">

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="personaDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Persona
          </a>
          <ul className="dropdown-menu" aria-labelledby="personaDropdown">
            <li><Link to={"/personas"} className="dropdown-item ">Lista de Personas</Link></li>
            <li><Link to={"/personas/add"} className="dropdown-item ">Agregar persona</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to={"/logs"} className="nav-link">
            Log
          </Link>
        </li>
      </ul>
    </nav>
    <Routes>
    <Route path="/logs" element={<LogList />} />
      <Route path="/personas" element={<PersonaList />} />
      <Route path="/personas/add" element={<AddPersona />} />
      <Route path="/personas/:id" element={<Persona />} />
    </Routes>
  </>);
}

export default App;
