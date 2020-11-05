import React from 'react';
import '../SmallButtonStyle.css';

class DeleteBar extends React.Component{


    handleSubmit(event){
       // console.log("print somethin"+this.props.selectedBook['title']);

        //event.preventDefault();
    }

    onClickHandle = () => {
        console.log("print somethin  "+this.props.selectedBook['title']);

        //alert are you sure you want to delete the following book on yes sendDeleterequest

        this.sendDeleteRequest();
        window.location.reload();
        alert("Your book was deleted successfully!");

    }
    
    sendDeleteRequest() {
        
        const requestOptions = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers' : '*',
                'Access-Control-Allow-Origin' : '*',
         }
        };
        
        let url = 'http://localhost:59880/api/books/'+this.props.selectedBook['id'];

        // fetch(url, requestOptions)
        //     .then(response => response.json());

        fetch(url, requestOptions).then((response) =>{
            if(response.status === 200){
                response.json();
            }

            else {
                alert("Sorry! Your book could not be deleted! A problem occured..");
                console.log(response.status);
            }
        });
      }
    
    render() {
        return (
        <div id="deleteForm" className="d-none form-style">
            <form id="deleteBar" onSubmit={this.handleSubmit} autoComplete="off">
                    <label htmlFor="title">
                        <span>Title:</span>
                    <input type="text" id="titleDelete" name="titleDelete" className="input-field" value = {this.props.selectedBook['title']} readOnly ={true}/>
                    </label>
                    <br/>
                    <label htmlFor="authorFName">
                        <span>Author First Name:</span>
                    <input type="text" id="authorFNameDelete" name="authorFNameDelete" className="input-field" value = {this.props.selectedBook['authorFirstName']} readOnly ={true}/>
                    </label>
                    <br/>
                    <label htmlFor="authorLastName">
                        <span>Author Last Name:</span>
                        <input type="text" id="authorLNameDelete" name="authorLNameDelete" className="input-field" value = {this.props.selectedBook['authorLastName']} readOnly ={true}/>
                    </label>
                    <br/>
                    <label htmlFor="genre">
                        <span>Genre:</span>
                        <input type="text" id="genreDelete" name="genreDelete"  className="input-field" value = {this.props.selectedBook['genreName']} readOnly ={true}/>
                    </label>
                    <br/>
                    <label htmlFor="publication">
                        <span>Publication:</span>
                        <input type="text" id="publicationDelete" name="publicationDelete"  className="input-field" value = {this.props.selectedBook['publication']} readOnly ={true}/>
                    </label>
                    <br/>
                    <br/>
                    <label htmlFor="year">
                        <span>Year:</span>
                        <input type="text" id="yearDelete" name="yearDelete" className="input-field" value = {this.props.selectedBook['year']} readOnly ={true}/>
                    </label>
            </form>
            <button onClick = {this.onClickHandle} className="small-button delete">
                Delete
            </button>
        </div>
        );
    }
}

export default DeleteBar;