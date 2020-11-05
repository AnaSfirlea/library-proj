import React from 'react';

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
        // fetch(url)
        //   .then(response => response.json())
        //   .then(book => this.setState({searchedBook: book}, this.showSearchResult));

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
            <div id="searchBar" className="d-none form-style">
                <input type="search" id="searchByTitle"  className="input-field" autoComplete="off" />
                <button onClick={this.handleClick} className="small-button">
                    Search
                    </button>
                <form id="searchedBookForm" className = "d-none searchHiddenForm" autoComplete="off">
                <label htmlFor="title">
                        <span>Title:</span>
                    <input type="text" id="titleSearchInput" className="input-field" name="titleSearchInput" value =""/>
                    </label>
                    <br/>
                    <label htmlFor="authorFName">
                        <span>Author First Name:</span>
                    <input type="text" id="authorFNameSearch" className="input-field" name="authorFNameSearch"  />
                    </label>
                    <br/>
                    <label htmlFor="authorLastName">
                        <span>Author Last Name:</span>
                    <input type="text" id="authorLNameSearch" className="input-field" name="authorLNameSearch" />
                    </label>
                    <br/>
                    <label htmlFor="genre">
                        <span>Genre:</span>
                    <input type="text" id="genreSearch" className="input-field" name="genreSearch"  />
                    </label>
                    <br/>
                    <label htmlFor="publication">
                        <span>Publication:</span>
                    <input type="text" id="publicationSearch" className="input-field" name="publicationSearch"  />
                    </label>
                    <br/>
                    <label htmlFor="year">
                        <span>Year:</span>
                    <input type="text" id="yearSearch" className="input-field" name="yearSearch" />
                    </label>
                </form>
            </div>
        );
    }
}
export default SearchBar;