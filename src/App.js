import React from 'react'
import { Route } from 'react-router-dom'
import * as booksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import Library from './Library';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    booksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelfs = (book, shelf) => {
    // remove book
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id)
    }))

    // update server
    booksAPI.update(book, shelf).then((shelfs) => {
      // console.log(shelfs)
      // console.log(this.state.books)

      // get book
      booksAPI.get(book.id).then(book =>
        this.setState(state => ({
          books: state.books.concat([book])
        }))
      )
    })
  }
  render() {
    return (
      <div className="app" >
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
