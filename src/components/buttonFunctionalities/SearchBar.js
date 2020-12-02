import React from 'react';
import Label from '../utils/Label.js';
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedBook : ''
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let title = document.getElementById("searchByTitle").value;

        let formattedTitle = title.replace(/\s/g, '').toLowerCase();
        
        this.sendSearchRequest(formattedTitle);
    }

    sendSearchRequest(title) 
    {
        let url = 'http://localhost:59880/api/books/title/'+title;
        console.log("url search is : "+ url );

        fetch(url)
            .then((response) => {
                if(response.status === 200) {
                    response.json()
                    .then(book => this.setState({searchedBook: book}, this.showSearchResult));
                }

                else{
                    alert("Sorry! Your book could not be found!");
                    console.log(response.status);
                }
            })
    }

    showSearchResult = () => {
        console.log(this.state.searchedBook['author']);
        
        let searchedBookForm = document.getElementById("searchedBookForm");
        if(searchedBookForm.classList.contains('d-none')) {
            searchedBookForm.classList.remove('d-none');
        }

        this.setResultsOfSearch();
    }

    setResultsOfSearch() {
        let titleInput = document.getElementById("titleSearchInput");
        titleInput.value = this.state.searchedBook['title'] ;

        let authorFName = document.getElementById("authorFNameSearch");
        authorFName.value = this.state.searchedBook['author']['firstName'];

        let authorLName = document.getElementById("authorLNameSearch");
        authorLName.value = this.state.searchedBook['author']['lastName'];

        let genreSearch = document.getElementById("genreSearch");
        genreSearch.value = this.state.searchedBook['genre']['name'];

        let publication = document.getElementById("publicationSearch");
        publication.value = this.state.searchedBook['publication'];

        let year = document.getElementById("yearSearch");
        year.value = this.state.searchedBook['year'];
    }
    render() {
        return (
            <div id="searchBar" className="d-none form-style form-element">
                <div className="search-container">
                    <input type="search" id="searchByTitle"  className="input-field" autoComplete="off" />
                    <button onClick={this.handleClick} className="small-button">
                        Search
                    </button>
                </div>
                <form id="searchedBookForm" className = "d-none searchHiddenForm" autoComplete="off">
                    <Label htmlFor="title" spanText="Title:" inputId="titleSearchInput"  inputName="titleSearchInput"/>
                    <Label htmlFor="authorFName" spanText="Author First Name:" inputId="authorFNameSearch"  inputName="authorFNameSearch"/>
                    <Label htmlFor="authorLName" spanText="Author Last Name:" inputId="authorLNameSearch"  inputName="authorLNameSearch"/>
                    <Label htmlFor="genreSearch" spanText="Genre:" inputId="genreSearch"  inputName="genreSearch"/>
                    <Label htmlFor="publicationSearch" spanText="Publication:" inputId="publicationSearch"  inputName="publicationSearch"/>
                    <Label htmlFor="yearSearch" spanText="Year:" inputId="yearSearch"  inputName="yearSearch"/>
                </form>
            </div>
        );
    }
}
export default SearchBar;