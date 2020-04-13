import React, { Component } from 'react';
import { SHELVES } from './constants';
import PropTypes from 'prop-types';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    bookIdShelfMap: PropTypes.objectOf(PropTypes.string).isRequired,
    updateBookShelf: PropTypes.func.isRequired,
  };

  renderBook(book) {
    return (
      <li key={`book-${book.id}`}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 188,
              backgroundImage: `url("${book.imageLinks.thumbnail}")`,
            }}/>

            <div className="book-shelf-changer">
              <select
                value={this.props.bookIdShelfMap[book.id]}
                onChange={(e) => this.props.updateBookShelf(book, e.target.value)}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                {Object.entries(SHELVES).map(([key, name]) => (
                  <option value={key} key={`book-${book.id}-shelf-${key}`}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
        </div>
      </li>
    );
  }

  render() {
    if (this.props.books.length === 0) {
      return (<div/>);
    }

    return (
      <ol className="books-grid">
        {this.props.books.map((book) => this.renderBook(book))}
      </ol>
    );
  }
}

export default ListBooks;
