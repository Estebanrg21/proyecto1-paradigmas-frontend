import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { MatriculaDataService } from "./util";
import { MateriaDataService } from "../Materia/util";
import { PersonaDataService } from "../Persona/util";
import DeleteAndUpdateBtns from "../form-components/DeleteAndUpdateBtns";
import LabeledSelect from "../form-components/LabeledSelect";

export default function Matricula() {
    const { id } = useParams();
    let navigate = useNavigate();
    const initialMatriculaState = {
        id: null,
        materia: {},
        persona: {}
    };
    const [currentMatricula, setCurrentMatricula] = useState(initialMatriculaState);
    const [materias, setMaterias] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [currentMateria, setCurrentMateria] = useState(null);
    const [currentPersona, setCurrentPersona] = useState(null);
    const [message, setMessage] = useState("");
    const getMatricula = id => {
        MatriculaDataService.get(id)
            .then(response => {
                setCurrentMatricula(response.data);
                setCurrentMateria(response.data.materia.id);
                setCurrentPersona(response.data.persona.id);
            })
            .catch(e => {
                setMessage("No se pudo obtener los datos de la matrícula");
                console.log(e);
            });
    };


    useEffect(() => {
        setMessage("");
        if (id) {
            getMatricula(id);
            getDependencies();
        }
    }, [id]);


    const handleInputChange = event => {
        let { name, value } = event.target;
        if (name === "persona") setCurrentPersona(value);
        if (name === "materia") setCurrentMateria(value);
        value = { id: value };
        setCurrentMatricula({ ...currentMatricula, [name]: value });
    };

    const validateData = () => {
        let msg = "";
        if (Object.keys(currentMatricula.materia).length === 0 || currentMatricula.materia.id === "-1") msg = "Debe seleccionar una materia";
        else if (Object.keys(currentMatricula.persona).length === 0 || currentMatricula.persona.id === "-1") msg = "Debe seleccionar una persona";
        if (msg !== "") {
            setMessage(msg);
        }
        return msg === "";
    };

    const updateMatricula = () => {
        if (validateData()) {
            MatriculaDataService.update(currentMatricula.id, currentMatricula)
                .then(response => {
                    console.log(response.data);
                    setMessage("La matrícula fue actualizada");
                })
                .catch(e => {
                    setMessage(e.response.data.error);
                    console.log(e);
                });
        }
    };


    const deleteMatricula = () => {
        MatriculaDataService.remove(currentMatricula.id)
            .then(response => {
                console.log(response.data);
                navigate("/matriculas");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const getDependencies = () => {
        PersonaDataService.getAll()
            .then(response => {
                setPersonas(response.data);
                console.log(response.data);
            })
            .catch(e => {
                alert("No se pudo cargar las personas");
                console.log(e);
            });
        MateriaDataService.getAll()
            .then(response => {
                setMaterias(response.data);
                console.log(response.data);
            })
            .catch(e => {
                alert("No se pudo cargar las materias");
                console.log(e);
            });
    }

    return (
        <div className="main-container">
            {currentMatricula.id ? (
                <div className="edit-form">
                    <h4 className="text-center mt-2">Matrícula</h4>
                    <p className="form-message">{message}</p>
                    <form className="project-form">
                        <LabeledSelect
                            label="Materia"
                            name="materia"
                            id="materia"
                            options={
                                [
                                    <option key="selectPlaceholder" value="-1">Seleccione una materia</option>,
                                    ...materias.map(materia =>
                                        <option key={materia.id} value={materia.id}>{materia.descripcion}</option>
                                    )
                                ]
                            }
                            defaultValue={currentMateria}
                            changeHandler={handleInputChange}
                        />
                        <LabeledSelect
                            label="Persona"
                            name="persona"
                            id="persona"
                            options={
                                [
                                    <option key="selectPlaceholder" value="-1">Seleccione una persona</option>,
                                    ...personas.map(persona =>
                                        <option key={persona.id} value={persona.id}>{persona.nombre}</option>
                                    )
                                ]
                            }
                            defaultValue={currentPersona}
                            changeHandler={handleInputChange}
                        />
                    </form>
                    <DeleteAndUpdateBtns
                        updateHandler={updateMatricula}
                        deleteHandler={deleteMatricula}
                    />
                </div>
            ) : (
                <div>
                    <br />
                    <p style={{ textAlign: "center" }}>La matrícula no existe</p>
                </div>
            )}
        </div>
    );
}