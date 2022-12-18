import React from "react";

import TableSortLabel from "@mui/material/TableSortLabel";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { SortDirection } from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";

import { EnhancedTableHeadProps } from "./types";

const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = ({
  order,
  orderBy,
  numSelected,
  rowCount,
  onSelectAllClick,
  onRequestSort,
}) => {
  const createSortHandler = (property: string) => (event: React.MouseEvent) => {
    onRequestSort(event, property);
  };

  const headCells = [
    {
      id: "name",
      label: "Название",
    },
    {
      id: "status",
      label: "Статус",
    },
    {
      id: "delivery_date",
      label: "Дата доставки",
    },
    {
      id: "sum",
      label: "Сумма",
    },
    {
      id: "qty",
      label: "Кол-во",
    },
    {
      id: "volume",
      label: "Обьем",
    },
    {
      id: "total",
      label: "Всего",
    },
  ];

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={"normal"}
            sortDirection={
              (orderBy === headCell.id ? order : false) as
                | SortDirection
                | undefined
            }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={(orderBy === headCell.id ? order : "asc") as any}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default EnhancedTableHead;
