import { useState } from "react";
import { useLibrary } from "../context/LibraryContext";

const Books = () => {
  const { books, addBook, deleteBook } = useLibrary();
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    addBook({ id: Date.now(), title });
    setTitle("");
  };

  return (
    <div className="container mt-4">
      <h3>Books</h3>
      <input
        className="form-control mb-2"
        placeholder="Book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Add Book
      </button>

      <ul className="list-group">
        {books.map((b) => (
          <li key={b.id} className="list-group-item d-flex justify-content-between">
            {b.title}
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteBook(b.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
