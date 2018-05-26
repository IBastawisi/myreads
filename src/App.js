import React from 'react'
import { Route } from 'react-router-dom'
import * as booksAPI from './BooksAPI'
import './App.css'
import AddBook from './AddBook';
import { ListBooks } from './ListBooks';

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    booksAPI.getAll().then((books) => {
      this.setState({ books })
      // console.log(books)
    })
  }

  getBook(book) {
    booksAPI.get(book).then(book => {
      this.setState(state => ({
        books: state.books.concat([book])
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
          />
        )} />
        <Route path='/search' render={() => (
          <AddBook/>
        )} />
      </div>
    )
  }
}

export default BooksApp
