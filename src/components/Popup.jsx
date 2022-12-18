import React from "react";
import axios from "axios";
import { URL } from "../constants";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Popup = ({ isOpen, close, selectedId, selectedNames, setSelected }) => {
  const handleClose = () => {
    close(false);
  };

  const cancelHandler = async () => {
    close(false);
    setSelected([]);
    try {
      await axios.post(URL + "/cancel", selectedId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>
          {"Вы уверены что хотите аннулировать товары: "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedNames.join(", ")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отклонить</Button>
          <Button onClick={cancelHandler} autoFocus>
            Применить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Popup;
