import React from "react";
import LabeledInput from "./LabeledInput";

export default function NumberInput({ changeHandler, ...props }) {
    const checkIfNum = (e) => {
        if (e.keyCode !== 13 && e.keyCode !== 8 
            && e.keyCode !== 189 
            && !/[0-9]/.test(e.key) 
            && (!props.avoidNegatives && e.keyCode === 189)) {
            e.preventDefault();
        }
    };
    const customHandler = (e) => {
        if (e.target.value.includes("-") && props.avoidNegatives) {
            e.target.value = e.target.value.split("-")[1];
        }
        changeHandler(e);
    }
    return (
        <LabeledInput
            type="number"
            classNames={props.classNames}
            id={props.id}
            name={props.name}
            value={props.value}
            changeHandler={customHandler}
            label={props.label}
            keyListener={checkIfNum}
        />
        
    );
}