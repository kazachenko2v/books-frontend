import React from "react";
import { useNavigate } from "react-router-dom";
// import { axiosInstance } from "../config";
import axios from "axios";

const Add = () => {
  const [book, setBook] = React.useState({
    title: "",
    desc: "",
    cover: "",
  });

  const navigate = useNavigate();

  const changehandler = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Add new book</h1>
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
      <button onClick={addBook}>Add</button>
    </>
  );
};

export default Add;