import './BookTableStyle.css';
import BookRow from '../bookRow/BookRow';
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
        this.sendSelectedBookToApp(selectedBook);
    }
    
    sendSelectedBookToApp = (book) => {
        this.props.appCallBackForSelectedBook(book);
    }
    
    render() {
        const books = this.state.books.map( book => {
            return <BookRow key={book["title"]+book['id']} book = {book} bookListCallBack={this.callBackForSelectedBook}/>
         });
        return (
            <table className="book-table" id="book-table">
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Publication</th>
                    <th>Year</th>
                    <th>Delete</th>
                    <th>Select</th>
                </tr>
                <tbody>{books}</tbody>
            </table>
        );
    }
}

export default BookTable;

