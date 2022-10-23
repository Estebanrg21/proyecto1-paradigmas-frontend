import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { MateriaDataService } from "./util";
import { PeriodoDataService } from "../Periodo/util";
import TextInput from "../form-components/TextInput";
import NumberInput from "../form-components/NumberInput";
import DeleteAndUpdateBtns from "../form-components/DeleteAndUpdateBtns";
import TableMatricula from "../Matricula/TableMatricula";
import LabeledSelect from "../form-components/LabeledSelect";

export default function Materia() {
    const { id } = useParams();
    let navigate = useNavigate();
    const initialMateriaState = {
        id: null,
        periodo: {},
        descripcion: "",
        cupos: 0,
        matriculas: [],
    };
    const [currentMateria, setCurrentMateria] = useState(initialMateriaState);
    const [periodos, setPeriodos] = useState([]);
    const [currentPeriodo, setCurrentPeriodo] = useState(null);
    const [message, setMessage] = useState("");
    const getMateria = id => {
        MateriaDataService.get(id)
            .then(response => {
                setCurrentMateria(response.data);
                setCurrentPeriodo(response.data.periodo.id);
            })
            .catch(e => {
                setMessage("No se pudo obtener los datos de la materia");
                console.log(e);
            });
    };


    useEffect(() => {
        setMessage("");
        if (id) {
            getMateria(id);
            getPeriodos();
        }
    }, [id]);


    const handleInputChange = event => {
        let { name, value } = event.target;
        if (name === "periodo") {
            setCurrentPeriodo(value);
            value = { id: value };
        }
        setCurrentMateria({ ...currentMateria, [name]: value });
    };

    const validateData = () => {
        let msg = "";
        if (currentMateria.descripcion === "") msg = "La descripción no puede ir en blanco";
        if (Object.keys(currentMateria.periodo).length === 0 || currentMateria.periodo.id === "-1") msg = "Debe seleccionar un periodo";
        if (msg !== "") {
            setMessage(msg);
        }
        return msg === "";
    };

    const updateMateria = () => {
        if (validateData()) {
            MateriaDataService.update(currentMateria.id, currentMateria)
                .then(response => {
                    console.log(response.data);
                    setMessage("La materia fue actualizada");
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };


    const deleteMateria = () => {
        MateriaDataService.remove(currentMateria.id)
            .then(response => {
                console.log(response.data);
                navigate("/materias");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const getPeriodos = (id) => {
        PeriodoDataService.getAll()
            .then(response => {
                setPeriodos(response.data);
                console.log(response.data);
            })
            .catch(e => {
                alert("No se pudo cargar los periodos");
                console.log(e);
            });
    }

    return (
        <div className="main-container">
            {currentMateria.id ? (
                <div className="edit-form">
                    <h4 className="text-center mt-2">Materia</h4>
                    <p className="form-message">{message}</p>
                    <form className="project-form">
                        <LabeledSelect
                            label="Periodos"
                            name="periodo"
                            id="periodo"
                            defaultValue={currentPeriodo}
                            options={
                                [
                                    <option key="selectPlaceholder" value={-1}>Seleccione un periodo</option>,
                                    ...periodos.map(periodo =>
                                        <option key={periodo.id} value={periodo.id}>{periodo.descripcion}</option>
                                    )
                                ]
                            }
                            changeHandler={handleInputChange}
                        />
                        <TextInput
                            label="Descripcion"
                            id="descripcion"
                            name="descripcion"
                            value={currentMateria.descripcion}
                            changeHandler={handleInputChange}
                        />
                        <NumberInput
                            label="Cupos"
                            id="cupos"
                            name="cupos"
                            value={currentMateria.cupos}
                            changeHandler={handleInputChange}
                            avoidNegatives
                        />
                    </form>
                    <DeleteAndUpdateBtns
                        updateHandler={updateMateria}
                        deleteHandler={deleteMateria}
                    />

                    {(currentMateria.matriculas.length === 0) ?
                        <p className="mt-2" style={{ textAlign: "center" }}>No existen matrículas para mostrar</p>
                        :
                        <div>
                            <h4>Materias</h4>
                            <TableMatricula
                                matriculas={currentMateria.matriculas}
                                hideMateria
                            />
                        </div>
                    }
                </div>
            ) : (
                <div>
                    <br />
                    <p style={{ textAlign: "center" }}>El materia no existe</p>
                </div>
            )}
        </div>
    );
}
