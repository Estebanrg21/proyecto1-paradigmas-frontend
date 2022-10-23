import React, { useState, useEffect } from "react";
import { MateriaDataService } from "./util";
import TextInput from "../form-components/TextInput";
import NumberInput from "../form-components/NumberInput";
import { PeriodoDataService } from "../Periodo/util";
import LabeledSelect from "../form-components/LabeledSelect";
export default function AddMateria(props) {
    const currentMateria = {
        id: null,
        periodo: {},
        descripcion: "",
        cupos: 0,
        matriculas: [],
    };
    const [materia, setMateria] = useState(currentMateria);
    const [periodos, setPeriodos] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => { getPeriodos() }, []);

    const handleInputChange = event => {
        let { name, value } = event.target;
        if (name === "periodo") {
            value = { id: value };
        }
        setMateria({ ...materia, [name]: value });
    };

    const validateData = () => {
        let msg = "";
        if (materia.descripcion === "") msg = "La descripción no puede ir en blanco";
        if (Object.keys(materia.periodo).length === 0) msg = "Debe seleccionar un periodo";
        if (msg !== "") {
            setMessage(msg);
        }
        return msg === "";
    };

    const saveMateria = () => {
        let data = {
            descripcion: materia.descripcion,
            periodo: materia.periodo,
            cupos: materia.cupos
        };
        if (validateData()) {
            MateriaDataService.create(data)
                .then(response => {
                    setMateria({
                        periodo: response.data.periodo,
                        descripcion: response.data.descripcion,
                        cupos: response.data.cupos
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

    const newMateria = () => {
        setMateria(currentMateria);
        setSubmitted(false);
    };

    const getPeriodos = () => {
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
        <>
            <div className="main-container">
                {
                    submitted ?
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "50vh", justifyContent: "center" }}>
                            <h4 className="mt-2 mb-2" style={{ textAlign: "center" }}>Almacenada Corretamente</h4>
                            <button className="btn btn-success" onClick={newMateria}>
                                Agregar nueva materia
                            </button>
                        </div>
                        :
                        <div >
                            <h4 className="text-center mt-2">Materia</h4>
                            <p className="form-message">{message}</p>
                            <form className="project-form">
                                <LabeledSelect
                                    label="Periodos"
                                    name="periodo"
                                    id="periodo"
                                    options={
                                        [
                                            <option key="selectPlaceholder">Seleccione un periodo</option>,
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
                                    value={materia.descripcion}
                                    changeHandler={handleInputChange}
                                />
                                <NumberInput
                                    label="Cupos"
                                    id="cupos"
                                    name="cupos"
                                    value={materia.cupos}
                                    changeHandler={handleInputChange}
                                    avoidNegatives
                                />

                            </form>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className="mt-2">
                                <button
                                    type="submit"
                                    className="btn btn-success mt-2"
                                    onClick={saveMateria}
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