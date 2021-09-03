import React from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'

const Library: React.FC<{ books: book[], updateShelves: (book: book, shelf: shelf) => void }> = ({ books, updateShelves }) => {
	const booksByShelf = books.reduce<{ [key in shelf]: book[] }>(function (acc, obj) {
		let key = obj.shelf
		acc[key].push(obj)
		return acc
	}, { wantToRead: [], currentlyReading: [], read: [], })

	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					<div className="bookshelf">
						<h2 className="bookshelf-title">Currently Reading</h2>
						<div className="bookshelf-books">
							<ol className="books-grid">{booksByShelf.currentlyReading.map(book => <Book key={book.id} book={book} updateShelves={updateShelves} />)}</ol>
						</div>
					</div>
					<div className="bookshelf">
						<h2 className="bookshelf-title">Want to Read</h2>
						<div className="bookshelf-books">
							<ol className="books-grid">{booksByShelf.wantToRead.map(book => <Book key={book.id} book={book} updateShelves={updateShelves} />)}</ol>
						</div>
					</div>
					<div className="bookshelf">
						<h2 className="bookshelf-title">Read</h2>
						<div className="bookshelf-books">
							<ol className="books-grid">{booksByShelf.read.map(book => <Book key={book.id} book={book} updateShelves={updateShelves} />)}</ol>
						</div>
					</div>
				</div>
			</div>
			<div className="open-search">
				<Link className="open-search" to='/search'>Add a book</Link>
			</div>
		</div>)
}

export default Library;