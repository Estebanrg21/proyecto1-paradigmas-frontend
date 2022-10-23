import React from "react";

export default function LabeledInput({changeHandler, keyListener, ...props}) {
    return (
        <div className="form-group">
            <label htmlFor="">{props.label}</label>
            <input
                type={props.type}
                className={"form-control " + (props.classNames??"")}
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={changeHandler}
                required
                onKeyDown={keyListener}
            />
        </div>
    );
}