import React from "react";

export default function DeleteAndUpdateBtns({ deleteHandler, updateHandler, ...props }) {
    return (
        <div className="mt-3 buttons-form-container" >
            <button className="btn btn-danger" onClick={deleteHandler}>
                {(props.deleteLabel) ?? "Borrar"}
            </button>
            <button
                type="submit"
                className="btn btn-success"
                onClick={updateHandler}
            >
                {(props.deleteLabel) ?? "Actualizar"}
            </button>
        </div>
    );
}
