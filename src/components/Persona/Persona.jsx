import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { PersonaDataService } from "./util";
import TextInput from "../form-components/TextInput";
import TableMatricula from "../Matricula/TableMatricula";
import DeleteAndUpdateBtns from "../form-components/DeleteAndUpdateBtns";


export default function Personas() {
    const { id } = useParams();
    let navigate = useNavigate();
    const initialPersonaState = {
        id: null,
        identificacion: "",
        nombre: "",
        matriculas: []
    };
    const [currentPersona, setCurrentPersona] = useState(initialPersonaState);
    const [message, setMessage] = useState("");
    const getPersona = id => {
        PersonaDataService.get(id)
            .then(response => {
                setCurrentPersona(response.data);
                console.log(response.data);
                console.log(currentPersona);
            })
            .catch(e => {
                setMessage("No se pudo obtener los datos de la persona");
                console.log(e);
            });
    };


    useEffect(() => {
        setMessage("");
        if (id)
            getPersona(id);
    }, [id]);


    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentPersona({ ...currentPersona, [name]: value });
    };


    const updatePersona = () => {
        PersonaDataService.update(currentPersona.id, currentPersona)
            .then(response => {
                console.log(response.data);
                setMessage("La persona fue actualizada");
            })
            .catch(e => {
                console.log(e);
            });
    };


    const deletePersona = () => {
        PersonaDataService.remove(currentPersona.id)
            .then(response => {
                console.log(response.data);
                navigate("/personas");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="main-container">
            {currentPersona.id ? (
                <div className="edit-form">
                    <h4 className="text-center mt-2">Persona</h4>
                    <p className="form-message">{message}</p>
                    <form className="project-form">
                        <TextInput
                            label="Nombre"
                            id="nombre"
                            name="nombre"
                            value={currentPersona.nombre}
                            changeHandler={handleInputChange}
                        />
                    </form>
                    <DeleteAndUpdateBtns
                        updateHandler={updatePersona}
                        deleteHandler={deletePersona}
                    />

                    {(currentPersona.matriculas.length === 0) ?
                        <p className="mt-2" style={{textAlign:"center"}}>No existen matrículas para mostrar</p>
                        :
                        <div>
                            <h4>Matrículas</h4>
                            <TableMatricula
                                matriculas={currentPersona.matriculas}
                                hidePersona
                            />
                        </div>
                    }
                </div>
            ) : (
                <div>
                    <br />
                    <p style={{textAlign:"center"}}>La persona no existe</p>
                </div>
            )}
        </div>
    );
}