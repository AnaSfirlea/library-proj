import '../ButtonStyle.css';

function ButtonUpdate() {

    let onClickHandle = () => {
        const addForm = document.getElementById("updateForm");

        if(addForm.classList.contains('d-none')) {
            addForm.classList.remove('d-none');
        }
        else {
            addForm.classList.add('d-none');
        }
    }
    return (
        <button id="updateBookButton" onClick={onClickHandle}>Update Book</button>
    );
}

export default ButtonUpdate;