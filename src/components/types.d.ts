import React from "react";

export type id = string;

type Status = "archive" | "active";

export type doc = {
  id: id;
  status: Status;
  sum: number;
  qty: number;
  volume: number;
  name: string;
  delivery_date: string;
  currency: string;
  total?: string;
};

export type selected = id[];

export type PopupProps = {
  isOpen: boolean;
  close: (boolean: boolean) => void;
  selectedId: Array<string>;
  selectedNames: Array<string>;
  setSelected: (any) => void;
};

export type EnhancedTableHeadProps = {
  order: string;
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRequestSort: (e: React.MouseEvent<unknown>, string: string) => void;
};
