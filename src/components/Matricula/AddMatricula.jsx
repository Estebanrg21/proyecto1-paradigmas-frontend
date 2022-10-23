import React, { useState, useEffect } from "react";
import { MatriculaDataService } from "./util";
import { MateriaDataService } from "../Materia/util";
import { PersonaDataService } from "../Persona/util";
import LabeledSelect from "../form-components/LabeledSelect";

export default function AddMatricula(props) {
    const currentMatricula = {
        id: null,
        materia: {},
        persona: {}
    };
    const [matricula, setMatricula] = useState(currentMatricula);
    const [materias, setMaterias] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => { getDependencies() }, []);

    const handleInputChange = event => {
        let { name, value } = event.target;
        value = { id: value };
        setMatricula({ ...matricula, [name]: value });
    };

    const validateData = () => {
        let msg = "";
        if (Object.keys(matricula.materia).length === 0) msg = "Debe seleccionar una materia";
        else if (Object.keys(matricula.persona).length === 0) msg = "Debe seleccionar una persona";
        if (msg !== "") {
            setMessage(msg);
        }
        return msg === "";
    };

    const saveMatricula = () => {
        let data = {
            materia: matricula.materia,
            persona: matricula.persona
        };
        if (validateData()) {
            MatriculaDataService.create(data)
                .then(response => {
                    setMatricula({
                        materia: response.data.materia,
                        persona: response.data.persona
                    });
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    setMessage(e.response.data.error);
                    console.log(e);
                });
        }
    };

    const newMatricula = () => {
        setMatricula(currentMatricula);
        setSubmitted(false);
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
        <>
            <div className="main-container">
                {
                    submitted ?
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "50vh", justifyContent: "center" }}>
                            <h4 className="mt-2 mb-2" style={{ textAlign: "center" }}>Almacenada Corretamente</h4>
                            <button className="btn btn-success" onClick={newMatricula}>
                                Agregar nueva matrícula
                            </button>
                        </div>
                        :
                        <div >
                            <h4 className="text-center mt-2">Matrícula</h4>
                            <p className="form-message">{message}</p>
                            <form className="project-form">
                                <LabeledSelect
                                    label="Materia"
                                    name="materia"
                                    id="materia"
                                    options={
                                        [
                                            <option key="selectPlaceholder">Seleccione una materia</option>,
                                            ...materias.map(materia =>
                                                <option key={materia.id} value={materia.id}>{materia.descripcion}</option>
                                            )
                                        ]
                                    }
                                    changeHandler={handleInputChange}
                                />
                                <LabeledSelect
                                    label="Persona"
                                    name="persona"
                                    id="persona"
                                    options={
                                        [
                                            <option key="selectPlaceholder">Seleccione una persona</option>,
                                            ...personas.map(persona =>
                                                <option key={persona.id} value={persona.id}>{persona.nombre}</option>
                                            )
                                        ]
                                    }
                                    changeHandler={handleInputChange}
                                />

                            </form>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className="mt-2">
                                <button
                                    type="submit"
                                    className="btn btn-success mt-2"
                                    onClick={saveMatricula}
                                >
                                    Crear
                                </button>
                            </div>

                        </div>
                }
            </div>
        </>
    );
}