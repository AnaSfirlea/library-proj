import '../ButtonStyle.css';



function ButtonAdd() {
    let onClickHandle = () => {
        const addForm = document.getElementById("addForm");

        if(addForm.classList.contains('d-none')) {
            addForm.classList.remove('d-none');
        }
        else {
            addForm.classList.add('d-none');
        }
    }
    return (
        <button id="addBookButton" onClick={onClickHandle}>Add Book</button>
    );
}

export default ButtonAdd;