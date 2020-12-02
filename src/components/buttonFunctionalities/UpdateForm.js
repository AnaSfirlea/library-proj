import React from 'react';
import '../FormStyling.css';
import '../ButtonStyle.css';
import '../SmallButtonStyle.css';
import UpdateLabel from '../utils/UpdateLabel.js';

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
        fetch(url).then((response) =>{
            if(response.status === 200){
                response.json()
                .then(genres => this.setState({ genres: genres, genre: this.props.selectedBook['genre']}));
            }

            else {
                alert("Sorry! A problem occured");
                console.log(response.status);
            }
        });
    }
    
    handleChange(event) {
       this.setState({genre: event.target.value});
    }

    handleClick(event) {
        this.setStateOfAuthorId();
    }

    setStateOfAuthorId (){
        const url = "http://localhost:59880/api/authors/name/"+this.props.selectedBook['authorLastName'];
        console.log("url is: "+url);

        fetch(url).then((response) => {
            if(response.status === 200) {
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
        });
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

        let url = 'http://localhost:59880/api/books/'+this.props.selectedBook['id'];

        fetch(url, requestOptions).then((response) =>{
            if(response.status === 200) {
                response.json();
            }
            else {
                alert("Sorry! Your book could not be updated! A problem occured..");
                console.log(response.status);
            }
        });
    }
    
    render() {  
        return (
            <div id="updateForm" className="d-none form-style form-element">
                <form id="updateInnerForm" autoComplete="off">
                    <UpdateLabel htmlFor="titleUpdate" spanText="Title:" inputId="titleUpdate"  inputName="titleUpdate" defaultValue = {this.props.selectedBook['title']}/>
                    <UpdateLabel htmlFor="publicationUpdate" spanText="Publication:" inputId="publicationUpdate"  inputName="publicationUpdate" defaultValue = {this.props.selectedBook['publication']}/>
                    <UpdateLabel htmlFor="yearUpdate" spanText="Year:" inputId="yearUpdate"  inputName="yearUpdate" defaultValue = {this.props.selectedBook['year']}/>
                </form>
                <button onClick={this.handleClick} className="small-button">
                    Update
                </button>
            </div>
        );
    }
}

export default UpdateForm;