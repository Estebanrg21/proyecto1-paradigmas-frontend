import React, { useState } from "react";
import { PersonaDataService } from "./util";
import TextInput from "../form-components/TextInput";
export default function AddPersona(props) {
    const currentPersona = {
        id: null,
        identificacion: "",
        nombre: ""
    };
    const [persona, setPersona] = useState(currentPersona);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPersona({ ...persona, [name]: value });
    };

    const savePersona = () => {
        let data = {
            identificacion: persona.identificacion,
            nombre: persona.nombre
        };
        PersonaDataService.create(data)
            .then(response => {
                setPersona({
                    identificacion: response.data.identificacion,
                    nombre: response.data.nombre,
                    fecha: response.data.fecha,
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                alert(e.response.data.error);
                console.log(e);
            });
    };

    const newPersona = () => {
        setPersona(currentPersona);
        setSubmitted(false);
    };

    return (
        <>
            <div className="main-container">
                {
                    submitted ?
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "50vh", justifyContent: "center" }}>
                            <h4 className="mt-2 mb-2" style={{ textAlign: "center" }}>Almacenado Corretamente</h4>
                            <button className="btn btn-success" onClick={newPersona}>
                                Agregar nueva persona
                            </button>
                        </div>
                        :
                        <div >
                            <h4 className="text-center mt-2">Persona</h4>
                            <form className="project-form">
                                <TextInput
                                    label="Identificación"
                                    id="identificacion"
                                    name="identificacion"
                                    value={persona.identificacion}
                                    changeHandler={handleInputChange}
                                />
                                <TextInput
                                    label="Nombre"
                                    id="nombre"
                                    name="nombre"
                                    value={persona.nombre}
                                    changeHandler={handleInputChange}
                                />

                            </form>
                            <div style={{width:"100%", display:"flex", justifyContent:"center"}} className="mt-2">
                                <button
                                    type="submit"
                                    className="btn btn-success mt-2"
                                    onClick={savePersona}
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