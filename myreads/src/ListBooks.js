import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SHELVES } from './constants';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
  };

  render() {
    const { books } = this.props;

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
                  <ol className="books-grid">
                    {books.filter((book) => book.shelf === shelfKey).map((book) => (
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
                                value={book.shelf}
                                onChange={(e) =>
                                  this.props.updateBookShelf(book, e.target.value)}
                              >
                                <option value="move" disabled>Move to...</option>
                                {Object.entries(SHELVES).map(([key, name]) => (
                                  <option
                                    value={key}
                                    key={`book-${book.id}-shelf-${key}`}
                                  >
                                    {name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors.join(', ')}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>
    );
  }
}

export default ListBooks;
