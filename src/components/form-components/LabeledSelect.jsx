import React from "react";

export default function LabeledSelect({ changeHandler, ...props }) {
    return (
        <div className="form-group">
            <label htmlFor="">{props.label}</label>
            <select
                className={"form-select " + (props.classNames ?? "")}
                id={props.id}
                name={props.name}
                onChange={changeHandler}
                required
                value={props.defaultValue}
            >
                {props.options}
            </select>
        </div>
    );
}