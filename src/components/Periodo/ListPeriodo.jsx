import React, { useState, useEffect } from "react";
import TablePeriodo from "./TablePeriodo";
import { PeriodoDataService } from "./util";

export default function ListPeriodo(props) {
    const [periodos, setPeriodos] = useState([]);

    useEffect(() => {
        retrievePeriodos();
    }, []);

    const retrievePeriodos = () => {
        PeriodoDataService.getAll()
            .then(response => {
                setPeriodos(response.data);
                console.log(response.data);
            })
            .catch(e => {
                alert("No se pudo cargar los periodos");
                console.log(e);
            });
    };

    const refreshList = () => {
        retrievePeriodos();
    };
    return (
        <>
            <div className="main-container">
                <h4 className="mt-2 mb-2" style={{ textAlign: "center" }}>Periodos</h4>
                {periodos.length !== 0 ?
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <p
                            style={{ textDecoration: "underline", fontSize: "small", alignSelf: "flex-end", cursor:"pointer" }}
                            onClick={refreshList}
                        >Refrescar tabla</p>
                        <TablePeriodo
                            periodos={periodos}
                        />
                    </div>
                    :
                    <p style={{ textAlign: "center" }}>No hay información para mostrar</p>
                }
            </div>
        </>
    );
}