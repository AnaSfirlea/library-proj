import './App.css';
import BookTable from './components/bookTable/BookTable';
import AddForm from './components/buttonFunctionalities/AddForm.js';
import React from 'react';
import UpdateForm from './components/buttonFunctionalities/UpdateForm';
import SearchBar from './components/buttonFunctionalities/SearchBar';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Button from './components/utils/Button';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBook: '',
    }
  }

  getSelectedBookHere = (book) => {
      this.setState({selectedBook: book}, this.sendBook);
  }

  // getBooksToDelete = () => {
  //     this.setState
  // }

  render() {
    return (
      <div className="app">
        <div className="background-color" >
          <div className = "container books" >
            <BookTable className = "book-table" appCallBackForSelectedBook={this.getSelectedBookHere}/>
            <div className = "deleteBooks-div">
              <button buttonId="deleteBookButton" className="button-elements" booksToDelete={this.getBooksToDelete}>Delete selected books</button>
            </div>
          </div>
        </div>
        <div className= "container buttons">
           <div className = "top">
             <Button formId="addForm" buttonId="addBookButton" buttonText="Add book"/>
             <Button formId="searchBar" buttonId="searchBookButton" buttonText="Search book"/>
             <Button formId="updateForm" buttonId="updateBookButton" buttonText="Update book"/>
           </div>
           <div className="bottom">
             <AddForm/>
             <SearchBar/>
             <UpdateForm selectedBook = {this.state.selectedBook}/>
           </div>
        </div>
        <NotificationContainer/>
      </div>
    );
  }
}

export default App;
