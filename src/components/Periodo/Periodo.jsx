import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { PeriodoDataService } from "./util";
import TextInput from "../form-components/TextInput";
import DeleteAndUpdateBtns from "../form-components/DeleteAndUpdateBtns";
import TableMateria from "../Materia/TableMateria";

export default function Periodo() {
    const { id } = useParams();
    let navigate = useNavigate();
    const initialPeriodoState = {
        id: null,
        descripcion: "",
        materias: []
    };
    const [currentPeriodo, setCurrentPeriodo] = useState(initialPeriodoState);
    const [message, setMessage] = useState("");
    const getPeriodo = id => {
        PeriodoDataService.get(id)
            .then(response => {
                setCurrentPeriodo(response.data);
                console.log(response.data);
                console.log(currentPeriodo);
            })
            .catch(e => {
                setMessage("No se pudo obtener los datos del periodo");
                console.log(e);
            });
    };


    useEffect(() => {
        setMessage("");
        if (id)
            getPeriodo(id);
    }, [id]);


    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentPeriodo({ ...currentPeriodo, [name]: value });
    };

    const validateData = () => {
        let msg = "";
        if (currentPeriodo.descripcion === "" || currentPeriodo.descripcion.trim().length === 0)
            msg = "La descripción no puede ir en blanco";
        if (msg !== "") {
            setMessage(msg);
        }
        return msg === "";
    };

    const updatePeriodo = () => {
        if (validateData()) {
            PeriodoDataService.update(currentPeriodo.id, currentPeriodo)
                .then(response => {
                    console.log(response.data);
                    setMessage("El periodo fue actualizado");
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };


    const deletePeriodo = () => {
        PeriodoDataService.remove(currentPeriodo.id)
            .then(response => {
                console.log(response.data);
                navigate("/periodos");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="main-container">
            {currentPeriodo.id ? (
                <div className="edit-form">
                    <h4 className="text-center mt-2">Periodo</h4>
                    <p className="form-message">{message}</p>
                    <form className="project-form">
                        <TextInput
                            label="Descripcion"
                            id="descripcion"
                            name="descripcion"
                            value={currentPeriodo.descripcion}
                            changeHandler={handleInputChange}
                        />
                    </form>
                    <DeleteAndUpdateBtns
                        updateHandler={updatePeriodo}
                        deleteHandler={deletePeriodo}
                    />

                    {(currentPeriodo.materias.length === 0) ?
                        <p className="mt-2" style={{ textAlign: "center" }}>No existen materias para mostrar</p>
                        :
                        <div>
                            <h4>Materias</h4>
                            <TableMateria
                                materias={currentPeriodo.materias}
                                hidePeriodo
                            />
                        </div>
                    }
                </div>
            ) : (
                <div>
                    <br />
                    <p style={{ textAlign: "center" }}>El periodo no existe</p>
                </div>
            )}
        </div>
    );
}