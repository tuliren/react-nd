import React from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  constructor(props) {
    super(props);
    this.updateBookShelf = this.updateBookShelf.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({ books });
    });
  }

  updateBookShelf(book, newShelf) {
    BooksAPI.update(book, newShelf).then((shelfBookIdMap) => {
      // update book shelf using the return value of BooksAPI#update,
      // which is a map from shelf key to book ids
      const bookIdShelfMap = {};
      Object.entries(shelfBookIdMap).forEach(([shelfKey, bookIds]) => {
        bookIds.forEach((bookId) => {
          bookIdShelfMap[bookId] = shelfKey;
        });
      });
      const books = this.state.books;
      for (const book of books) {
        book.shelf = bookIdShelfMap[book.id];
      }
      this.setState({ books });
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks/>
        ) : (
          <ListBooks books={this.state.books} updateBookShelf={this.updateBookShelf}/>
        )}
      </div>
    );
  }
}

export default BooksApp;
