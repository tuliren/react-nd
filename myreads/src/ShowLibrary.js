import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SHELVES } from './constants';
import { Link } from 'react-router-dom';
import ListBooks from './ListBooks';

class ShowLibrary extends Component {
  static propTypes = {
    pageTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    bookIdShelfMap: PropTypes.objectOf(PropTypes.string).isRequired,
    updateBookShelf: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.title = this.props.pageTitle;
  }

  render() {
    if (this.props.books.length === 0) {
      return (<div/>);
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.entries(SHELVES).map(([shelfKey, shelfName]) => (
              <div className="bookshelf" key={`shelf-${shelfKey}`}>
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                  <ListBooks
                    books={this.props.books.filter((book) => this.props.bookIdShelfMap[book.id] === shelfKey)}
                    bookIdShelfMap={this.props.bookIdShelfMap}
                    updateBookShelf={this.props.updateBookShelf}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="open-search">
          <Link to='/search'>
            <button>Add to Library</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ShowLibrary;
