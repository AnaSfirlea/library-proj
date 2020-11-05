import './App.css';
import BookTable from './components/bookTable/BookTable';
import ButtonAdd from './components/buttons/ButtonAdd';
import ButtonDelete from './components/buttons/ButtonDelete';
import ButtonSearch from './components/buttons/ButtonSearch';
import ButtonUpdate from './components/buttons/ButtonUpdate';
import AddInput from './components/buttonFunctionalities/AddInput';
import DeleteBar from './components/buttonFunctionalities/DeleteBar';
import React from 'react';
import UpdateForm from './components/buttonFunctionalities/UpdateForm';
import SearchBar from './components/buttonFunctionalities/SearchBar';
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
  render() {
    
    return (
      <div className="App">
        <div className = "book-table-div split">
          <BookTable className = "book-table" appCallBackForSelectedBook={this.getSelectedBookHere}/>
        </div>
        <div className= "buttons-div split">
          <ButtonAdd className="button-add"/>
          <AddInput/>
          <ButtonSearch/>
          <SearchBar/>
          <ButtonUpdate/>
          <UpdateForm selectedBook = {this.state.selectedBook}/>
          <ButtonDelete/>
          <DeleteBar selectedBook = {this.state.selectedBook}/>
        </div>
      </div>
    );
  }
}

export default App;
