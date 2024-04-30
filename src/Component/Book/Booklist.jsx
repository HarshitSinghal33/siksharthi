import React from 'react'
import BookCard from './BookCard'
import LibraryBookCard from './LibraryBookCard'
export default function Booklist({ books, isLibrary }) {
  return (
    <div className={`flex flex-wrap gap-4 my-4 justify-evenly font-sans `}>
      {books.map(book =>(
        isLibrary
          ? <LibraryBookCard key={book.bookID} book={book} />
          : <BookCard key={book.bookID} book={book} />
      ))}
    </div>
  )
}