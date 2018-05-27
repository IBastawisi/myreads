import React from 'react'
import { Route } from 'react-router-dom'
import * as booksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import Library from './Library';

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfs: ''
  }

  componentDidMount() {
    booksAPI.getAll().then((books) => {
      this.setState({ books })
      // console.log(books)
    })
  }

  updateShelfs = (book, shelf) => {
    booksAPI.update(book, shelf).then((shelfs) => {
      this.setState({ shelfs })
      console.log(this.state.shelfs)
    })
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Library
            books={this.state.books}
            updateShelfs={this.updateShelfs}
          />
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            updateShelfs={(book, shelf) => {
              this.updateShelfs(book, shelf)
              history.push('/')
            }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
