import React from 'react';

const Book: React.FC<{ book: book, updateShelves: (book: book, shelf: shelf) => void }> = ({ book, updateShelves }) => {

	const handleShelving = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const shelf = event.target.value as shelf;
		updateShelves(book, shelf);
	}

	return (
		<li>
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{
						width: 128, height: 193, backgroundImage: ((book) => {
							if (book.imageLinks) {
								return (`url(${book.imageLinks.thumbnail})`)
							}
						})(book)
					}}></div>
					<div className="book-shelf-changer">
						<select value={book.shelf || 'none'} onChange={handleShelving}>
							<option value="none" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{book.authors}</div>
			</div>
		</li>)
}

export default Book;