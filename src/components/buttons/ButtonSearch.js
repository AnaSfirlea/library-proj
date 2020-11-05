import '../ButtonStyle.css';

function ButtonSearch() {
    let onClickHandle = () => {
        const addForm = document.getElementById("searchBar");

        if(addForm.classList.contains('d-none')) {
            addForm.classList.remove('d-none');
        }
        else {
            addForm.classList.add('d-none');
        }
    }
    return (
        <button id="searchBookButton" onClick={onClickHandle}>Search Book</button>
    );
}

export default ButtonSearch;