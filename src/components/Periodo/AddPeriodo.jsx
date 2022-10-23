import React, { useState } from "react";
import { PeriodoDataService } from "./util";
import TextInput from "../form-components/TextInput";

export default function AddPeriodo(props) {
    const currentPeriodo = {
        id: null,
        descripcion: ""
    };
    const [periodo, setPeriodo] = useState(currentPeriodo);
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("");

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPeriodo({ ...periodo, [name]: value });
    };

    const validateData = () => {
        let msg = "";
        if (periodo.descripcion === "" || periodo.descripcion.trim().length === 0) 
            msg = "La descripción no puede ir en blanco";
        if (msg !== "") {
            setMessage(msg);
        }
        return msg === "";
    };

    const savePeriodo = () => {
        let data = {
            descripcion: periodo.descripcion
        };
        if (validateData()) {
            PeriodoDataService.create(data)
                .then(response => {
                    setPeriodo({
                        descripcion: response.data.descripcion
                    });
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    alert(e.response.data.error);
                    console.log(e);
                });
        }
    };

    const newPeriodo = () => {
        setPeriodo(currentPeriodo);
        setSubmitted(false);
    };

    return (
        <>
            <div className="main-container">
                {
                    submitted ?
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "50vh", justifyContent: "center" }}>
                            <h4 className="mt-2 mb-2" style={{ textAlign: "center" }}>Almacenado Corretamente</h4>
                            <button className="btn btn-success" onClick={newPeriodo}>
                                Agregar nuevo periodo
                            </button>
                        </div>
                        :
                        <div >
                            <h4 className="text-center mt-2">Periodo</h4>
                            <p className="form-message">{message}</p>
                            <form className="project-form">
                                <TextInput
                                    label="Descripcion"
                                    id="descripcion"
                                    name="descripcion"
                                    value={periodo.descripcion}
                                    changeHandler={handleInputChange}
                                />

                            </form>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className="mt-2">
                                <button
                                    type="submit"
                                    className="btn btn-success mt-2"
                                    onClick={savePeriodo}
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