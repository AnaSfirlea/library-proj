import './BookTableStyle.css';
import BookList from '../bookList/BookList';
import React from 'react';

class BookTable extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
        books : [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:59880/api/books')
          .then(response => response.json())
          .then(books => this.setState({ books }));
      }

    callBackForSelectedBook = (selectedBook) => {
       // console.log("in book table "+ selectedBook["title"]);

        this.sendSelectedBookToApp(selectedBook);
        //this.setState({selectedBook: selectedBookList});
    }

    
    sendSelectedBookToApp = (book) => {
       // console.log("in send selected  table "+ book["title"]);

        this.props.appCallBackForSelectedBook(book);
    }
    
    render() {
        
        let bookList = this.state.books;
       
        return (
            <table className="book-table" id="book-table">
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Publication</th>
                    <th>Year</th>
                </tr>
                 <BookList books = {bookList} bookTableCallBack={this.callBackForSelectedBook}/>
                
            </table>
        );
    }
}

export default BookTable;

