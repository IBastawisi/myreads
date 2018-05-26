import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import * as booksAPI from './BooksAPI'
import { Book } from './ListBooks'

class Addbook extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    if (query) {
      booksAPI.search(query).then((books) => {
        this.setState({ books })
      })
    } else { this.setState({ books: [] }) }
  }

  render() {
    const { query, books } = this.state
    // console.log(books)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query}
              onChange={(event) => this.updateQuery(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(!books.error && books.map(book => <Book key={book.id} book={book} />)) || <li>no result</li>}
          </ol>
        </div>
      </div>
    )
  }
}

export default Addbook
