import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import ShowLibrary from './ShowLibrary';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books: [],
    bookIdShelfMap: {},
  };

  constructor(props) {
    super(props);
    this.updateBookShelf = this.updateBookShelf.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const bookIdShelfMap = {};
      books.forEach((book) => {
        bookIdShelfMap[book.id] = book.shelf;
      });
      this.setState({ books, bookIdShelfMap });
    });
  }

  updateBookShelf(book, newShelf) {
    BooksAPI.update(book, newShelf).then((shelfBookIdMap) => {
      const bookIdShelfMap = {};
      Object.entries(shelfBookIdMap).forEach(([shelfKey, bookIds]) => {
        bookIds.forEach((bookId) => {
          bookIdShelfMap[bookId] = shelfKey;
        });
      });
      this.setState({ bookIdShelfMap });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ShowLibrary
            pageTitle="My Library"
            books={this.state.books}
            bookIdShelfMap={this.state.bookIdShelfMap}
            updateBookShelf={this.updateBookShelf}
          />
        )}/>

        <Route path='/search' render={() => (
          <SearchBooks
            pageTitle="Add to Library"
            bookIdShelfMap={this.state.bookIdShelfMap}
            updateBookShelf={this.updateBookShelf}
          />
        )}/>
      </div>
    );
  }
}

export default BooksApp;
