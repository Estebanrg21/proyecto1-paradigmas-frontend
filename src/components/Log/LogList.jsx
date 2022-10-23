import React, { useState, useEffect } from "react";
import RestService from "../../services/RestService";

const LogDataService = new RestService("logs");


export default function LogList() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        retrieveLogs();
    }, []);

    const retrieveLogs = () => {
        LogDataService.getAll()
            .then(response => {
                setLogs(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    return (
        <div className="list justify-content-center  d-flex">
            <div className="col-md-6 w-80">
                <h4 style={{textAlign:"center"}}>Lista de Logs</h4>
                <table className="table">
                    <thead>
                        <tr>
                        <th>Entidad</th>
                            <th>Método</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                         {logs &&
                        logs.map((Log, index) => (
                            <tr key={index}>
                                <td><strong>{Log.entidad}</strong></td>
                                <td>{Log.metodo}</td>
                                <td>{new Date(Log.fecha).toLocaleDateString("en-US")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>

    );
}