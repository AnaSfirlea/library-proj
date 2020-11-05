import React from 'react';
import BookItem from '../bookItem/BookItem';

class BookList extends React.Component {
      constructor(props) {
         super(props);

        this.state = {
        selectedBook : '',
        };
      }

      callBack = (childBook) => {
        // console.log("this is parent: "+ childBook["title"]);
        // this.setState({selectedBook: childBook});
        this.sendBookToTable(childBook);
      }

      // sendBookToTableOld = () => {
      //   // console.log("this is send book to table : "+ this.state.selectedBook["title"]);

      //    this.props.bookTableCallBack(this.state.selectedBook);
      // }
          
      sendBookToTable = (book) => {
      // console.log("in send selected  table "+ book["title"]);

         this.props.bookTableCallBack(book);
      }
      render() {
         let id = 0;
         const books = this.props.books.map( book => {
            id++;
            return <BookItem key={book["title"]+id} book = {book} bookListCallBack={this.callBack}/>
         });
            
         return <tbody>{books}</tbody>;
      }
}

export default BookList;

// let id = 0;
// const BookList = (props) => {
//    const books = props.books.map( book => {
//        id++;
//       return <BookItem key={book["title"]+id} book = {book}/>
//    });
   
//    return <tbody>{books}</tbody>;
// }


//export default BookList;
