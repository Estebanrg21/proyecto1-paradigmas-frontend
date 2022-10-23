import React, { useState, useEffect } from "react";
import TableMatricula from "./TableMatricula";
import { MatriculaDataService } from "./util";

export default function ListMatricula(props) {
    const [matriculas, setMatriculas] = useState([]);

    useEffect(() => {
        retrieveMatriculas();
    }, []);

    const retrieveMatriculas = () => {
        MatriculaDataService.getAll()
            .then(response => {
                setMatriculas(response.data);
                console.log(response.data);
            })
            .catch(e => {
                alert("No se pudo cargar las matrículas");
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveMatriculas();
    };
    return (
        <>
            <div className="main-container">
                <h4 className="mt-2 mb-2" style={{ textAlign: "center" }}>Matrículas</h4>
                {matriculas.length !== 0 ?
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <p
                            style={{ textDecoration: "underline", fontSize: "small", alignSelf: "flex-end", cursor:"pointer" }}
                            onClick={refreshList}
                        >Refrescar tabla</p>
                        <TableMatricula
                            matriculas={matriculas}
                        />
                    </div>
                    :
                    <p style={{ textAlign: "center" }}>No hay información para mostrar</p>
                }
            </div>
        </>
    );
}
