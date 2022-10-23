import React from "react";
import LabeledInput from "./LabeledInput";

export default function TextInput({ changeHandler, ...props }) {
    return (
        <LabeledInput
            type="text"
            classNames={props.classNames}
            id={props.id}
            name={props.name}
            value={props.value}
            changeHandler={changeHandler}
            label={props.label}
        />
    );
}