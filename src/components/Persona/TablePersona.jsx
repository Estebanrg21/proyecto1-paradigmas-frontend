import React from "react";
import { useNavigate } from 'react-router-dom';
import { PersonaDataService } from "./util";

export default function TablePersona(props) {

    let navigate = useNavigate();

    const getPersona = id => {
        navigate(`/personas/${id}`);
    };

    const deletePersona = (id) => {
        if (window.confirm("¿Está seguro que desea eliminar la persona?")) {
            PersonaDataService.remove(id)
                .then(response => {
                    console.log(response.data);
                    alert("Persona eliminada correctamente");
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
                    {(props.hideIdentificacion) ? "" : <th className="text-center">Identificación</th>}
                    {(props.hideNombre) ? "" : <th className="text-center">Nombre</th>}
                    {(props.showLinkToDetails) ? "" : <th className="text-center"></th>}
                    {(props.allowDelete) ? "" : <th className="text-center"></th>}
                </tr>
            </thead>
            <tbody>
                {props.personas.map((persona) =>
                    <tr key={persona.id}>
                        <td>{persona.id}</td>
                        {(props.hideIdentificacion) ? "" : <td className="text-center">{persona.identificacion}</td>}
                        {(props.hideNombre) ? "" : <td className="text-center">{persona.nombre}</td>}
                        {(props.showLinkToDetails) ? "" : <td className="text-center"><button className="btn btn-secondary" onClick={getPersona.bind(null, persona.id)}>Detalles</button></td>}
                        {(props.allowDelete) ? "" : <td className="text-center"><button className="btn btn-danger" onClick={deletePersona.bind(null, persona.id)}>Eliminar</button></td>}
                    </tr>
                )}
            </tbody>
        </table>
    );
}