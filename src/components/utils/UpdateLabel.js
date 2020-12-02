import React from 'react'

function UpdateLabel(props) {
    return(
        <div>
            <label htmlFor={props.htmlFor}>
                <span>{props.spanText}</span>
                <input type="text" id={props.inputId} name={props.inputName} defaultValue = {props.defaultValue} className="input-field"/>
            </label>
            <br/>
        </div>
    );
}

export default UpdateLabel;