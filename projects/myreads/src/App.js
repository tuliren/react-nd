import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import ShowLibrary from './ShowLibrary';
import SearchBooks from './SearchBooks';
import { NOT_ON_SHELF } from './constants';
import NoMatch from './NoMatch';

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
      // update books if necessary
      if (this.state.bookIdShelfMap[book.id] === undefined) {
        // this is a new book, add it to shelf
        const books = this.state.books;
        books.push(book);
        this.setState({ books });
      } else if (newShelf === NOT_ON_SHELF) {
        // this book is removed from shelf
        const books = this.state.books.filter(b => b.id !== book.id);
        this.setState({ books });
      }

      // update bookIdShelfMap
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
        <Switch>
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

          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
