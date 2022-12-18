import * as React from "react";
import axios from "axios";
import { URL } from "../constants";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TableFooter from "@mui/material/TableFooter";

import EnhancedTableToolbar from "../components/EnhancedTableToolbar";
import EnhancedTableHead from "../components/EnhancedTableHead";
import Popup from "../components/Popup";

import {
  getComparator,
  formatDate,
  valueSumm,
  getSelectedNames,
} from "../utils";

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("delivery_date");
  const [selected, setSelected] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedNames = getSelectedNames(rows, selected);

  const searchedRows = React.useMemo(
    () =>
      searchValue
        ? rows.map((row, i) => {
            for (let value of Object.values(row)) {
              if (
                value
                  .toString()
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              ) {
                return rows[i];
              } else {
                continue;
              }
            }
          })
        : [...rows],
    [searchValue, rows]
  ).filter((el) => el);

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const resArr = await Promise.all([
          axios.get(URL + "/documents1"),
          axios.get(URL + "/documents2"),
        ]);

        const rowsWithTotal = resArr.map((res) =>
          res.data.map((row) => ({
            ...row,
            total: row.sum * row.qty + row.currency,
          }))
        );

        setRows(rowsWithTotal.flat());
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const openHandler = () => {
    if (selected.length) {
      setIsOpen(true);
    }
  };

  return (
    <>
      <Popup
        isOpen={isOpen}
        close={setIsOpen}
        selectedId={selected}
        selectedNames={selectedNames}
        setSelected={setSelected}
      />

      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {searchedRows
                  .sort(getComparator(order, orderBy))
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.status}</TableCell>
                        <TableCell align="center">
                          {formatDate(row.delivery_date)}
                        </TableCell>
                        <TableCell align="center">{row.sum}</TableCell>
                        <TableCell align="center">{row.qty}</TableCell>
                        <TableCell align="center">{row.volume}</TableCell>
                        <TableCell align="center">{row.total}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={1} />

                  <TableCell align="center">
                    <Button variant="outlined" onClick={openHandler}>
                      Аннулировать
                    </Button>
                  </TableCell>
                  <TableCell colSpan={1} />
                  <TableCell align="center">
                    <TextField
                      id="outlined-basic"
                      label="Search"
                      variant="outlined"
                      color="primary"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </TableCell>
                  <TableCell colSpan={1} />
                  <TableCell align="center">
                    Общее кол-во: {valueSumm(searchedRows, "qty")}
                  </TableCell>
                  <TableCell align="center">
                    Общее обьем: {valueSumm(searchedRows, "volume")}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}
