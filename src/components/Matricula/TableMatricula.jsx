import React from "react";
import { useNavigate } from 'react-router-dom';
import RestService from "../../services/RestService";

const MatriculaDataService = new RestService("matricula");

export default function TableMatricula(props) {

    let navigate = useNavigate();

    const getMatricula = id => {
        navigate(`/matriculas/${id}`);
    };

    const deleteMatricula = (id) => {
        if (window.confirm("¿Está seguro que desea eliminar la matrícula?")) {
            MatriculaDataService.remove(id)
                .then(response => {
                    console.log(response.data);
                    alert("Matricula eliminada correctamente");
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
                    {(props.hideMateria) ? "" : <th className="text-center">Materia</th>}
                    {(props.hidePersona) ? "" : <th className="text-center">Persona</th>}
                    {(props.showLinkToDetails) ? "" : <th className="text-center"></th>}
                    {(props.allowDelete) ? "" : <th className="text-center"></th>}
                </tr>
            </thead>
            <tbody>
                {props.matriculas.map((matricula) =>
                    <tr key={matricula.id}>
                        <td>{matricula.id}</td>
                        {(props.hideMateria) ? "" : <td className="text-center">{matricula.materia.descripcion}</td>}
                        {(props.hidePersona) ? "" : <td className="text-center">{matricula.persona.nombre}</td>}
                        {(props.showLinkToDetails) ? "" : <td className="text-center"><button className="btn btn-secondary" onClick={getMatricula.bind(null, matricula.id)}>Detalles</button></td>}
                        {(props.allowDelete) ? "" : <td className="text-center"><button className="btn btn-danger" onClick={deleteMatricula.bind(null, matricula.id)}>Eliminar</button></td>}
                    </tr>
                )}
            </tbody>
        </table>
    );
}