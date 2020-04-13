import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  static propTypes = {
    pageTitle: PropTypes.string.isRequired,
    bookIdShelfMap: PropTypes.objectOf(PropTypes.string).isRequired,
    updateBookShelf: PropTypes.func.isRequired,
  };

  state = {
    books: [],
    query: '',
  };

  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
  }

  componentDidMount() {
    document.title = this.props.pageTitle;
  }

  updateQuery(query) {
    this.setState({ query: query ? query.trim() : '' });
    if (this.state.query.length > 0) {
      BooksAPI.search(this.state.query).then((result) => {
        if (!result.error) {
          this.setState({ books: result });
        }
      });
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <ListBooks
              books={this.state.books}
              bookIdShelfMap={this.props.bookIdShelfMap}
              updateBookShelf={this.props.updateBookShelf}
            />
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
