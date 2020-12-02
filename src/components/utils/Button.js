import '../ButtonStyle.css';
function Button(props) {
    let onClickHandle = () => {
        const form = document.getElementById(props.formId);
        const button = document.getElementById(props.buttonId);

        if(form.classList.contains('d-none')) {
            form.classList.remove('d-none');
        }
        else {
            form.classList.add('d-none');
        }

        if(!button.classList.contains('active')) {
            button.classList.add('active');
        }

        const allForms = document.getElementsByClassName("form-element");
        const allButtons = document.getElementsByClassName("button-elements");        

        Array.prototype.forEach.call(allForms, element => {
            if(element.id != props.formId)
                element.classList.add('d-none');
        });

        Array.prototype.forEach.call(allButtons, element => {
            if(element.id != props.buttonId && element.classList.contains('active'))
                element.classList.remove('active');
        });

    }
    return (
    <button id={props.buttonId} className="button-elements" onClick={onClickHandle}>{props.buttonText}</button>
    );
}

export default Button;