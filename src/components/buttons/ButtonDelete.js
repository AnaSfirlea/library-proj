import '../ButtonStyle.css';

function ButtonDelete() {

    let onClickHandle = () => {
        const deleteBar = document.getElementById("deleteForm");

        if(deleteBar.classList.contains('d-none')) {
            deleteBar.classList.remove('d-none');
        }
        else {
            deleteBar.classList.add('d-none');
        }
    }

    return (
        <button  id="deleteBookButton" onClick={onClickHandle}>Delete Book</button>
    );
}

export default ButtonDelete;