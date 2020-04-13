import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';

/*
 * NOTES: The search from BooksAPI is limited to a particular set of search terms.
 * You can find these search terms here:
 * https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
 *
 * However, remember that the BooksAPI.search method DOES search by title or author.
 * So, don't worry if you don't find a specific author or title. Every search is limited
 * by search terms.
 */

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
    this.setState({ query });
    if (query && query.length > 0) {
      BooksAPI.search(query.trim()).then((result) => {
        if (result.error) {
          this.setState({ books: [] });
        } else {
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
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              autoFocus={true}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks
            books={this.state.books}
            bookIdShelfMap={this.props.bookIdShelfMap}
            updateBookShelf={this.props.updateBookShelf}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
