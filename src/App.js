import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './css/styles.css';
import AddPersona from "./components/Persona/AddPersona";
import Persona from "./components/Persona/Persona";
import PersonaList from "./components/Persona/ListPersona";
import LogList from './components/Log/LogList';
import ListPeriodo from './components/Periodo/ListPeriodo';
import AddPeriodo from './components/Periodo/AddPeriodo';
import Periodo from './components/Periodo/Periodo';
import ListMateria from './components/Materia/ListMateria';
import AddMateria from './components/Materia/AddMateria';
import Materia from './components/Materia/Materia';
import ListMatricula from './components/Matricula/ListMatricula';
import AddMatricula from './components/Matricula/AddMatricula';
import Matricula from './components/Matricula/Matricula';
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
            <li><Link to={"/personas"} className="dropdown-item ">Lista de personas</Link></li>
            <li><Link to={"/personas/add"} className="dropdown-item ">Agregar persona</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="periodoDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Periodo
          </a>
          <ul className="dropdown-menu" aria-labelledby="periodoDropdown">
            <li><Link to={"/periodos"} className="dropdown-item ">Lista de periodos</Link></li>
            <li><Link to={"/periodos/add"} className="dropdown-item ">Agregar periodo</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="materiaDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Materia
          </a>
          <ul className="dropdown-menu" aria-labelledby="materiaDropdown">
            <li><Link to={"/materias"} className="dropdown-item ">Lista de materias</Link></li>
            <li><Link to={"/materias/add"} className="dropdown-item ">Agregar materia</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="matriculaDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Matrícula
          </a>
          <ul className="dropdown-menu" aria-labelledby="matriculaDropdown">
            <li><Link to={"/matriculas"} className="dropdown-item ">Lista de matrículas</Link></li>
            <li><Link to={"/matriculas/add"} className="dropdown-item ">Agregar matrícula</Link></li>
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
    <Route path="/" element={<p>Index del sitio</p>} />
      <Route path="/logs" element={<LogList />} />
      <Route path="/personas" element={<PersonaList />} />
      <Route path="/personas/add" element={<AddPersona />} />
      <Route path="/personas/:id" element={<Persona />} />
      <Route path="/periodos" element={<ListPeriodo />} />
      <Route path="/periodos/add" element={<AddPeriodo />} />
      <Route path="/periodos/:id" element={<Periodo />} />
      <Route path="/materias" element={<ListMateria />} />
      <Route path="/materias/add" element={<AddMateria />} />
      <Route path="/materias/:id" element={<Materia />} />
      <Route path="/matriculas" element={<ListMatricula />} />
      <Route path="/matriculas/add" element={<AddMatricula />} />
      <Route path="/matriculas/:id" element={<Matricula />} />
    </Routes>
  </>);
}

export default App;
