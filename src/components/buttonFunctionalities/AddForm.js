import React from 'react';
import GenreItem from '../genreItem/GenreItem';
import Label from '../utils/Label';
class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: '',
            genres: [],
            title: '',
            authorFirstName: '',
            authorLastName:'',
            publication: '',
            authorId: 0,
            genreId: 0,
            year: 0
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {
        fetch('http://localhost:59880/api/genres')
          .then(response => response.json())
          .then(genres => this.setState({ genres: genres, genre: genres[0]['name'], genreId: genres[0]['id']}));
      }
    
    handleChange(event) {
        this.setState({genre: event.target.value});
    }

    handleClick(event) {
        this.setInputData();

        event.preventDefault();
    }

    showErrorStatus(status, name) {
        alert("Sorry! Your book could not be added! A problem occured");
        console.log(status + name);
        console.log(name);
    }
    
    setInputData() {
        let inputYear = document.getElementById("addYearInput").value;
        if(isNaN(inputYear))
        {
            alert("The year is not a valid number. Please enter a valid year.");
            return;
        }
        this.setState(
            {
                title: document.getElementById("addTitleInput").value,
                authorFirstName: document.getElementById("addAuthorFNameInput").value,
                authorLastName: document.getElementById("addAuthorLNameInput").value,
                publication: document.getElementById("addPublicationInput").value,
                year : Number(document.getElementById("addYearInput").value),
            },() => {this.sendAddAuthorRequest();}
        );
    }

    sendAddAuthorRequest() {
        const url = "http://localhost:59880/api/authors";

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers' : '*',
                'Access-Control-Allow-Origin' : '*',
            },
            body: JSON.stringify({
                 firstName: document.getElementById("addAuthorFNameInput").value,
                 lastName: document.getElementById("addAuthorLNameInput").value
            })
        };

        fetch(url, requestOptions)
            .then(response => {
                if(response.status ===200) {
                 response.json().then(author => this.setState({authorId: author['id']}, ()=>{this.setStateOfGenreId();}));
                }
                else{
                    this.showErrorStatus(response.status,"method sendAddAuthorRequest");
                }
            }
        )
    }

    setStateOfGenreId() {
        const url = "http://localhost:59880/api/genres/name/"+this.state.genre;
        console.log("url for genre : "+url);

        fetch(url).then((response) =>{
            if(response.status === 200){
                response.json()
                        .then(genre => this.setState({genreId: genre['id']},()=>{
                                this.sendPostRequest();
                            }));
                        }
            else {
                this.showErrorStatus(response.status,"method setStateGenreId");
            }
        })
    }

    sendPostRequest() {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers' : '*',
                'Access-Control-Allow-Origin' : '*',
         },
            body: JSON.stringify({
                 title: this.state.title, 
                 genreId: this.state.genreId,
                 authorId: this.state.authorId,
                 publication: this.state.publication,
                 year: this.state.year
                })
        };
        
        fetch('http://localhost:59880/api/books', requestOptions)
            .then(response => {
                if(response.status ===200) {
                    response.json();
                    window.location.reload();
                     alert("Book added successfully!");

                }
                else{
                    this.showErrorStatus(response.status," method sendPostRequest");
                }
            })
    }    
    
    render() { 
        const genres = this.state.genres.map( genre => {
            return <GenreItem key={genre["name"]} genre = {genre}/>
         });

        return (
            <div id="addForm" className="d-none form-style form-element">
                <form id="addInnerForm" autoComplete="off">
                    <Label htmlFor="title" spanText="Title:" inputId="addTitleInput"  inputName="addTitleInput"/>
                    <Label htmlFor="authorFName" spanText="Author First Name:" inputId="addAuthorFNameInput"  inputName="addAuthorFNameInput"/>
                    <Label htmlFor="authorLName" spanText="Author Last Name:" inputId="addAuthorLNameInput"  inputName="addAuthorLNameInput"/>
                    <div>
                        <label htmlFor="genre">
                            <span>Choose genre:</span>
                            <select value={this.state.genre} onChange={this.handleChange} className="input-field" >
                            {genres}
                            </select>
                        </label>
                        <br/>
                    </div>
                    <Label htmlFor="publication" spanText="Publication:" inputId="addPublicationInput"  inputName="addPublicationInput"/>
                    <Label htmlFor="year" spanText="Year:" inputId="addYearInput"  inputName="addYearInput"/>
                </form>
                <button onClick={this.handleClick} className="small-button">
                    Add
                </button>
            </div>
    );
    }
}

export default AddForm;