import React from "react";
import { useNavigate } from 'react-router-dom';
import { PeriodoDataService } from "./util";

export default function TablePeriodo(props) {
    let navigate = useNavigate();

    const getPeriodo = id => {
        navigate(`/periodos/${id}`);
    };

    const deletePeriodo = (id) => {
        if (window.confirm("¿Está seguro que desea eliminar el periodo?")) {
            PeriodoDataService.remove(id)
                .then(response => {
                    console.log(response.data);
                    alert("Periodo eliminada correctamente");
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    return (
        <table className="table">
            <thead className="table-dark">
                <tr>
                    <th>Id</th>
                    {(props.hideDescripcion) ? "" : <th className="text-center">Descripción</th>}
                    {(props.showLinkToDetails) ? "" : <th className="text-center"></th>}
                    {(props.allowDelete) ? "" : <th className="text-center"></th>}
                </tr>
            </thead>
            <tbody>
                {props.periodos.map((periodo) =>
                    <tr key={periodo.id}>
                        <td>{periodo.id}</td>
                        {(props.hideDescripcion) ? "" : <td className="text-center">{periodo.descripcion}</td>}
                        {(props.showLinkToDetails) ? "" : <td className="text-center"><button className="btn btn-secondary" onClick={getPeriodo.bind(null, periodo.id)}>Detalles</button></td>}
                        {(props.allowDelete) ? "" : <td className="text-center"><button className="btn btn-danger" onClick={deletePeriodo.bind(null, periodo.id)}>Eliminar</button></td>}
                    </tr>
                )}
            </tbody>
        </table>
    );

}