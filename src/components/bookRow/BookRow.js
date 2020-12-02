import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class BookRow extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        book : this.props.book,
        selectedBooks : [],
      };
  }

  onClickHandle = () => {
    this.props.bookListCallBack(this.props.book);
  }

  onClickHandleDelete = () => {
    this.sendDeleteRequest();
    window.location.reload();
  }

  handleChange = (event) => {
    if(document.getElementById("checkbox-row"+this.props.book['id']).checked) {
      //add book to list of deleted books
    }
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
      
    let url = 'http://localhost:59880/api/books/'+this.props.book['id'];

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
  
  render(){
    const book = this.props.book;
    return (       
      <tr onClick={this.onClickHandle} id={book['title']}> 
        <td key={book['title']+book['id']}>{book['title']}</td>
        <td key={book['authorLastName']+book['id']}>{book['authorFirstName']+" "+book['authorLastName']}</td>
        <td key={book['genreName']+book['id']}>{book['genreName']}</td>
        <td key={book['publication']+book['id']}>{book['publication']}</td>
        <td key={book['year']+book['id']}>{book['year']}</td>
        <td key={'trash'+book['id']} onClick={this.onClickHandleDelete}><FontAwesomeIcon icon={faTrash} color="#2EE59D"/></td>
        <td key={'checkBox'+book['id']} onClick={this.onChangeCheckbox}>
          <input id={"checkbox-row"+book['id']} type="checkbox" onChange={this.handleChange}/>
        </td>
      </tr>   
    );
  }
}

export default BookRow;