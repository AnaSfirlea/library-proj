import React from 'react';

function Label(props) {
    return(
        <div>
            <label htmlFor={props.htmlFor}>
                <span>{props.spanText}</span>
                <input type="text" id={props.inputId} name={props.inputName} className="input-field"/>
            </label>
            <br/>
        </div>
    );
}

export default Label;