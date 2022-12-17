import React from "react";
import axios from "axios";
import { URL } from "../constants";
import Item from "../components/Item";

const Main = () => {
  const [documents, setDocuments] = React.useState([]);
  React.useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(URL + "/documents1");
        setDocuments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <h1>Books</h1>
      <ul>
        {documents?.map((document) => (
          <Item key={document.id} document={document} />
        ))}
      </ul>
    </>
  );
};

export default Main;
