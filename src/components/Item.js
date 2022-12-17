import React from "react";
import styles from "./Item.module.css";

const Item = ({ document }) => {
  return (
    <li className={styles.container}>
      <h5>{document.name}</h5>
      <p>{document.status}</p>
      <p>{document.sum}</p>
      <p>{document.qty}</p>
      <p>{document.volume}</p>
      <p>{document.delivery_date}</p>
      <p>{document.currency}</p>
    </li>
  );
};

export default Item;
