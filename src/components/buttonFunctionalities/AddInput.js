import './AddInputStyle.css';
import React from 'react';
import GenreItem from '../genreList/GenreItem';

class AddInput extends React.Component {
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
        //window.location.reload();

        event.preventDefault();
      }

      setInputData() {
       let inputTitle = document.getElementById("title").value;
       let inputAuthorFName = document.getElementById("authorFirstName").value;
       let inputAuthorLName = document.getElementById("authorLastName").value;
       let inputPublication = document.getElementById("publication").value;
       let inputYear = Number(document.getElementById("year").value);

        this.setState(
            {
                title: inputTitle,
                authorFirstName: inputAuthorFName,
                authorLastName: inputAuthorLName,
                publication: inputPublication,
                year : inputYear,
            },() => {this.setStateOfAuthorId();}
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
                 firstName: document.getElementById("authorFirstName").value,
                 lastName: document.getElementById("authorLastName").value
                })
        };

        fetch(url, requestOptions)
            .then(response => {
                if(response.status ===200) {
                 return response.json();
                }
                else{
                    alert("Sorry! Your book could not be added! A problem occured");
                    console.log(response.status +"sendAddAuthorRequest");
                    console.log("sendAddAuthorRequest");

                }

            })

      }
      setStateOfAuthorId () {
        //console.log(this.sendAddAuthorRequest());
        const url = "http://localhost:59880/api/authors/name/"+document.getElementById("authorLastName").value;
        console.log("url is: "+url);
        console.log("last name is : ",document.getElementById("authorLastName").value);
        //  fetch(url)
        // .then(reponse => reponse.json())
        // .then(author => this.setState({authorId: author['id']}, ()=>{this.setStateOfGenreId();})); 

        fetch(url).then((response) => {
            if(response.status === 200){
                console.log(response);
                response.json()
                  .then(author => this.setState({authorId: author['id']}, ()=>{this.setStateOfGenreId();}));
               
            }

            else {
                alert("Sorry! Your book could not be added! A problem occured");
                console.log(response.status);
                console.log("in setStateOfAuthorId");
            }
        });
    }

      setStateOfGenreId() {
        const url = "http://localhost:59880/api/genres/name/"+this.state.genre;
        console.log("url for genre : "+url);

        //  fetch(url)
        // .then(response => response.json())
        // .then(genre => this.setState({genreId: genre['id']},()=>{this.sendPostRequest(); window.location.reload();}));

        fetch(url).then((response) =>{
            if(response.status === 200){
                response.json()
                        .then(genre => this.setState({genreId: genre['id']},()=>{
                                this.sendPostRequest();
                                window.location.reload(); 
                                 alert("Book added successfully!")}));
                        }

            else {
                alert("Sorry! Your book could not be added! A problem occured");
                console.log(response.status);
                console.log("setStateGenreId");

            }
        }
        )

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
                }
                else{
                    alert("Sorry! Your book could not be added! A problem occured");
                    console.log(response.status);
                    console.log("sendPostRequest");

                }

            })
           
            //.then(data => this.setState({ postId: data.id }));
        
      }
    
    
    render(){ 
        const genres = this.state.genres.map( genre => {
            return <GenreItem key={genre["name"]} genre = {genre}/>
         });

        return (
            <div id="addForm" className="d-none form-style">
                <form id="addInnerForm" autoComplete="off">
                    <label htmlFor="title">
                        <span>Title:</span>
                    <input type="text" id="title" name="title" className="input-field"/>
                    </label>
                    <br/>
                    <label htmlFor="authorFirstName">
                        <span>Author First Name:</span>
                    <input type="text" id="authorFirstName" name="authorFirstName" className="input-field"/>
                    </label>
                    <br/>
                    <label htmlFor="authorLastName">
                        <span>Author Last Name:</span>
                    <input type="text" id="authorLastName" name="authorLastName" className="input-field"/>
                    </label>
                    <br/>
                    <label htmlFor="genre">
                        <span>Choose genre:</span>
                        <select value={this.state.genre} onChange={this.handleChange} className="input-field" >
                        {genres}
                        </select>
                    </label>
                    <br/>
                    <label htmlFor="publication">
                        <span>Publication:</span>
                    <input type="text" id="publication" name="publication" className="input-field"/>
                    </label>
                    <br/>
                    <label htmlFor="year">
                        <span>Year:</span>
                    <input type="text" id="year" name="year" className="input-field"/>
                    </label>
                </form>
                <button onClick={this.handleClick} className="small-button">
                    Add
                    </button>
            </div>
    );
    }
}

export default AddInput;