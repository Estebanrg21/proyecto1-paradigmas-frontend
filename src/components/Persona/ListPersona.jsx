import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TablePersona from "./TablePersona";
import { PersonaDataService } from "./util";

export default function ListPersona(props) {
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        retrievePersonas();
    }, []);

    const retrievePersonas = () => {
        PersonaDataService.getAll()
            .then(response => {
                setPersonas(response.data);
                console.log(response.data);
            })
            .catch(e => {
                alert("No se pudo cargar las personas");
                console.log(e);
            });
    };

    const refreshList = () => {
        retrievePersonas();
    };
    return (
        <>
            <div className="main-container">
                <h4 className="mt-2 mb-2" style={{ textAlign: "center" }}>Personas</h4>
                {personas.length !== 0 ?
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <p
                            style={{ textDecoration: "underline", fontSize: "small", alignSelf: "flex-end", cursor:"pointer" }}
                            onClick={refreshList}
                        >Refrescar tabla</p>
                        <TablePersona
                            personas={personas}
                        />
                    </div>
                    :
                    <p style={{ textAlign: "center" }}>No hay información para mostrar</p>
                }
            </div>
        </>
    );
}