import React, { Component } from 'react';
import debounce from 'lodash/debounce';
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
    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.queryBooks = debounce(this.queryBooks.bind(this), 300);
  }

  componentDidMount() {
    document.title = this.props.pageTitle;
  }

  queryBooks(query) {
    // when the debounce function is fired, query
    // string may already have changed; do not trigger
    // the search if that's the case
    if (this.state.query === query) {
      BooksAPI.search(query).then((result) => {
        if (result.error) {
          this.setState({ books: [] });
        } else if (this.state.query === query) {
          this.setState({ books: result });
        } else {
          // when the results are received, query is outdated;
          // do not update books array
        }
      });
    }
  }

  onChangeQuery(event) {
    this.setState({ query: event.target.value });

    const queryString = event.target.value.trim();
    if (queryString.length > 0) {
      this.queryBooks(queryString);
    } else {
      this.setState({ books: [] });
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
              onChange={this.onChangeQuery}
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
