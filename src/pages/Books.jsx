import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../constants";

const Books = () => {
  const [books, setBooks] = React.useState([]);
  React.useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(URL + "/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(URL + "/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h5>{book.title}</h5>
            <p>{book.desc}</p>
            <button onClick={() => deleteHandler(book.id)}>Delete</button>
            <button>
              <Link to={`/update/${book.id}`}>Update</Link>
            </button>
          </li>
        ))}
      </ul>
      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </>
  );
};

export default Books;
