import React from 'react';
//import GenreItem from '../genreList/GenreItem';

import '../FormStyling.css';
import '../ButtonStyle.css';

class UpdateForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            genres :[],
            genreId:'',
            authorId:''
        }
        
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

      }
    
      componentDidMount() {
          let url = 'http://localhost:59880/api/genres';
        // fetch(url)
        // .then(response => response.json())
        // .then(genres => this.setState({ genres: genres, genre: this.props.selectedBook['genre']}));
        fetch(url).then((response) =>{
            if(response.status === 200){
                response.json()
                .then(genres => this.setState({ genres: genres, genre: this.props.selectedBook['genre']}));
            }

            else {
                alert("Sorry! A problem occured");
                console.log(response.status);
            }
        }
        )

      }
    
      handleChange(event) {
          
         // document.getElementById("selectGenreUpdate").value = event.target.value;
       // this.setState({genre: this.props.selectedBook['genre']});
       this.setState({genre: event.target.value});
      }
    handleClick(event) {
        this.setStateOfAuthorId();

    }
    setStateOfAuthorId (){
        const url = "http://localhost:59880/api/authors/name/"+this.props.selectedBook['authorLastName'];
        console.log("url is: "+url);

        //  fetch(url)
        // .then(response => response.json())
        // .then(author => this.setState({authorId: author['id']}, ()=>{this.sendUpdateRequest(); window.location.reload();})); 

        fetch(url).then((response) =>{
            if(response.status === 200){
                response.json()
                .then(author => this.setState({authorId: author['id']}, ()=>{
                    this.sendUpdateRequest(); 
                    window.location.reload();  
                    alert("Your book was updated succesfully!");})); 
            }

            else {
                alert("Sorry! A problem occured");
                console.log(response.status);
            }
        }
        )


      }
    sendUpdateRequest() {
        
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers' : '*',
                'Access-Control-Allow-Origin' : '*',
         },
            body: JSON.stringify({
                 id: this.props.selectedBook['id'],
                 title: document.getElementById("titleUpdate").value, 
                 genreId: this.props.selectedBook['genre']['id'],
                 authorId: this.state.authorId,
                 publication: document.getElementById("publicationUpdate").value,
                 year: document.getElementById("yearUpdate").value
                })
        };

        console.log("id is:",this.props.selectedBook['id'] );

        let url = 'http://localhost:59880/api/books/'+this.props.selectedBook['id'];
        console.log("url is:", url);

        // fetch(url, requestOptions)
        //     .then(response => response.json())

        fetch(url, requestOptions).then((response) =>{
            if(response.status === 200){
                response.json();
            }

            else {
                alert("Sorry! Your book could not be updated! A problem occured..");
                console.log(response.status);
            }
        });
        
      }
    
    render() {
        // const genresName = this.state.genres.map( genre => {
        //     return <GenreItem key={genre["name"]} genre = {genre}/>
        //  });
       
        return (
            <div id="updateForm" className="d-none form-style">
                <form id="updateInnerForm" autoComplete="off">
                    <label htmlFor="titleUpdate">
                        <span className="span-update">Title:</span>
                    </label>
                    <input type="text" id="titleUpdate" name="titleUpdate" className="input-field" defaultValue = {this.props.selectedBook['title']}/>
                    <br/>
                    <label htmlFor="publicationUpdate">
                        <span className="span-update">Publication:</span>
                    </label>
                    <input type="text" id="publicationUpdate" name="publicationUpdate" className="input-field" defaultValue = {this.props.selectedBook['publication']}/>
                    <br/>
                    <label htmlFor="yearUpdate">
                        <span className="span-update">Year:</span>
                    </label>
                    <input type="text" id="yearUpdate" name="yearUpdate" className="input-field" defaultValue = {this.props.selectedBook['year']}/>
                </form>
                <button onClick={this.handleClick} className="small-button">
                    Update
                </button>
            </div>
        );
    }
}

export default UpdateForm;


 /* <br/>
                    <br/>
                    <label htmlFor="authorFName">
                        Author First Name:
                    </label>
                    <input type="text" id="authorFNameUpdate" name="authorFNameUpdate"  defaultValue = {this.props.selectedBook['authorFirstName']}/>
                    <br/>
                    <br/>
                    <label htmlFor="authorLastName">
                        Author Last Name:
                    </label>
                    <input type="text" id="authorLNameUpdate" name="authorLNameUpdate"  defaultValue = {this.props.selectedBook['authorLastName']}/>
                    <br/>
                    <br/>
                    <label htmlFor="genre">
                        Genre:
                        <select value={"-"} onChange={this.handleChange}>
                        {genresName}
                        </select>
                    </label> */
                    