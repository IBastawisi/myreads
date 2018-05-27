import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as booksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  }

  search = (query) => {
    this.setState({ query})
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
              onChange={(event) => this.search(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(!books.error && books.map(book => <Book key={book.id} book={book} updateShelfs={this.props.updateShelfs}/>)) || <li>no result</li>}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
