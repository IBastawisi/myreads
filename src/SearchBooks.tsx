import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import * as booksAPI from './BooksAPI'
import Book from './Book'
import find from './icons/find.svg';

const SearchBooks: React.FC<{ booksOnShelf: { [key: string]: shelf }, updateShelves: (book: book, shelf: shelf) => void }> = ({ booksOnShelf, updateShelves }) => {
  const [books, setBooks] = useState<book[]>([]);
  const [query, setQuery] = useState("");

  const debouncedSearchTerm = useDebounce(query);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.trim());
  }

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        booksAPI.search(debouncedSearchTerm).then((books) => {
          if (!books.error) {
            const shelvedBooks = books.map(book => ({ ...book, shelf: booksOnShelf[book.id] }))
            setBooks(shelvedBooks);
          } else { setBooks([]) }
        })
      } else { setBooks([]) }
    },
    [debouncedSearchTerm, booksOnShelf] // Only call effect if debounced search term changes
  );

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" value={query} onChange={handleChange} />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          { books.length > 0 ? books.map(book => <Book key={book.id} book={book} updateShelves={updateShelves} />) :
          <li className="books-empty"><img src={find} alt="no result" /><p>no result</p></li>}
        </ol>
      </div>
    </div>
  )
}

function useDebounce(value: any, delay = 300) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export default SearchBooks
