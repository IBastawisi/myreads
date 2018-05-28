import React from 'react';

export default (props) => {
    const { book } = props
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
                        <select value={book.shelf || 'none'} onChange={(event) => props.updateShelfs(book, event.target.value)}>
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