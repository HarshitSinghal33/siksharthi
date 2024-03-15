import React from 'react'
import BookCard from './BookCard'

export default function Booklist({ books, path, handleDelete }) {
  return (
    <div className={`flex flex-wrap gap-4 my-4 justify-evenly font-sans `}>
      {books.map(book => (
        <BookCard key={book.bookID} book={book} path={path} handleDelete={handleDelete}/>
      ))}
    </div>
  )
}