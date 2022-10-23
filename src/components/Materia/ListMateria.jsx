import React, { useState, useEffect } from "react";
import TableMateria from "./TableMateria";
import { MateriaDataService } from "./util";

export default function ListMateria(props) {
    const [materias, setMaterias] = useState([]);

    useEffect(() => {
        retrieveMaterias();
    }, []);

    const retrieveMaterias = () => {
        MateriaDataService.getAll()
            .then(response => {
                setMaterias(response.data);
                console.log(response.data);
            })
            .catch(e => {
                alert("No se pudo cargar las materias");
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveMaterias();
    };
    return (
        <>
            <div className="main-container">
                <h4 className="mt-2 mb-2" style={{ textAlign: "center" }}>Materias</h4>
                {materias.length !== 0 ?
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <p
                            style={{ textDecoration: "underline", fontSize: "small", alignSelf: "flex-end", cursor:"pointer" }}
                            onClick={refreshList}
                        >Refrescar tabla</p>
                        <TableMateria
                            materias={materias}
                        />
                    </div>
                    :
                    <p style={{ textAlign: "center" }}>No hay información para mostrar</p>
                }
            </div>
        </>
    );
}
