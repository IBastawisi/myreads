import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as booksAPI from './BooksAPI'
import Library from './Library';
import SearchBooks from './SearchBooks';

function App() {
  const [books, setBooks] = useState<book[]>([]);

  useEffect(() => {
    booksAPI.getAll().then(books => setBooks(books))
  }, []);

  const updateShelves = (book: book, shelf: shelf) => {
    booksAPI.update(book, shelf).then((shelves) => {
      setBooks(books.map(b => b.id === book.id ? { ...b, shelf } : b))
    })
  }

  const booksOnShelf = books.reduce<{ [key: string]: shelf }>((acc, obj) => { acc[obj.id] = obj.shelf; return acc }, {})

  return (
    <div className="app" >
      <Route exact path='/'>
        <Library books={books} updateShelves={updateShelves} />
      </Route>
      <Route path='/search'>
        <SearchBooks booksOnShelf={booksOnShelf} updateShelves={updateShelves} />
      </Route>
    </div>
  );
}

export default App;
