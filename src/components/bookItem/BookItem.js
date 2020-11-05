import React from 'react';
import './BookItemStyle.css';

let id = 0;
class BookItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        book : this.props.book,
        };
    }

    onClickHandle = () => {
      this.props.bookListCallBack(this.props.book);
      document.getElementById(this.props.book['title']).classList.add('selected-item');
    }
    render(){
       const book = this.props.book;
       return (       
        <tr onClick={this.onClickHandle} id={book['title']}> 
          <td key={book['title']+id}>{book['title']}</td>
          <td key={book['authorLastName']+id}>{book['authorFirstName']+" "+book['authorLastName']}</td>
          <td key={book['genreName']+id}>{book['genreName']}</td>
          <td key={book['publication']+id}>{book['publication']}</td>
          <td key={book['year']+id}>{book['year']}</td>
        </tr>   
       );
    }
}
export default BookItem;

