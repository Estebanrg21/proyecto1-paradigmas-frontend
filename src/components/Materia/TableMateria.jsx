import React from "react";
import { useNavigate } from 'react-router-dom';
import { MateriaDataService } from "./util";

export default function TableMateria(props) {

    let navigate = useNavigate();

    const getMateria = id => {
        navigate(`/materias/${id}`);
    };

    const deleteMateria = (id) => {
        if (window.confirm("¿Está seguro que desea eliminar la materia?")) {
            MateriaDataService.remove(id)
                .then(response => {
                    console.log(response.data);
                    alert("Materia eliminada correctamente");
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
                    {(props.hidePeriodo) ? "" : <th className="text-center">Periodo</th>}
                    {(props.hideDescripcion) ? "" : <th className="text-center">Descripción</th>}
                    {(props.hideCupos) ? "" : <th className="text-center">Cupos</th>}
                    {(props.showLinkToDetails) ? "" : <th className="text-center"></th>}
                    {(props.allowDelete) ? "" : <th className="text-center"></th>}
                </tr>
            </thead>
            <tbody>
                {props.materias.map((materia) =>
                    <tr key={materia.id}>
                        <td>{materia.id}</td>
                        {(props.hidePeriodo) ? "" : <td className="text-center">{materia.periodo.descripcion}</td>}
                        {(props.hideDescripcion) ? "" : <td className="text-center">{materia.descripcion}</td>}
                        {(props.hideCupos) ? "" : <td className="text-center">{materia.cupos}</td>}
                        {(props.showLinkToDetails) ? "" : <td className="text-center"><button className="btn btn-secondary" onClick={getMateria.bind(null, materia.id)}>Detalles</button></td>}
                        {(props.allowDelete) ? "" : <td className="text-center"><button className="btn btn-danger" onClick={deleteMateria.bind(null, materia.id)}>Eliminar</button></td>}
                    </tr>
                )}
            </tbody>
        </table>
    );
}