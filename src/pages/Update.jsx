import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const [book, setBook] = React.useState({
    title: "",
    desc: "",
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  const changehandler = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateBook = async (e) => {
    e.preventDefault();
    try {
      await axios.put("https://books-7jdf.onrender.com/books/" + bookId, book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Update new book</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={changehandler}
      />
      <input
        type="text"
        placeholder="description"
        name="desc"
        onChange={changehandler}
      />
      <input
        type="text"
        placeholder="cover"
        name="cover"
        onChange={changehandler}
      />
      <button onClick={updateBook}>Update</button>
    </>
  );
};

export default Update;
