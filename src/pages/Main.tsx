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
import CircularProgress from "@mui/material/CircularProgress";

import EnhancedTableToolbar from "../components/EnhancedTableToolbar";
import EnhancedTableHead from "../components/EnhancedTableHead";
import Popup from "../components/Popup";

import {
  getComparator,
  formatDate,
  valueSumm,
  getSelectedNames,
} from "../utils";
import { id, doc, selected } from "../components/types";

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("delivery_date");
  const [selected, setSelected] = React.useState<selected | any[]>([]);
  const [rows, setRows] = React.useState<doc[] | []>([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const selectedNames = getSelectedNames(rows, selected);

  const searchedRows = React.useMemo(
    () =>
      searchValue
        ? rows &&
          rows.map((row, i) => {
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
          res.data.map((row: doc) => ({
            ...row,
            total: row.sum * row.qty + row.currency,
          }))
        );

        setRows(rowsWithTotal.flat());
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLTableRowElement>,
    id: id
  ) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: selected = [];

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

  const isSelected = (id: id) => selected.indexOf(id) !== -1;

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
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
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
                  rowCount={rows.length}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                />

                <TableBody>
                  {searchedRows &&
                    searchedRows
                      .sort(getComparator(order, orderBy))
                      .map((row, index) => {
                        if (row) {
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
                        }
                      })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={1} />

                    <TableCell align="center">
                      <Button variant="outlined" onClick={openHandler}>
                        ????????????????????????
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
                      ?????????? ??????-????: {valueSumm(searchedRows, "qty")}
                    </TableCell>
                    <TableCell align="center">
                      ?????????? ??????????: {valueSumm(searchedRows, "volume")}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
    </>
  );
}
