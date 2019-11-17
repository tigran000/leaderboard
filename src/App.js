import React, { useState } from "react";
import { produce } from "immer";
import sortBy from "lodash.sortby";
import AddIcon from "./components/AddIcon";
import FormDialog from "./components/FormDialog";
import LeaderboardTable from "./components/LeaderboardTable";
let userId = 2; // simple solution as for the most cases we get id from backend

const initialRows = [
  { id: 0, firstName: "Geary", lastName: "Alice", score: 96 },
  { id: 1, firstName: "Junge", lastName: "John", score: 96 },
  { id: 2, firstName: "Vera", lastName: "Rob", score: 88 }
];

export default function SimpleTable() {
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleAddEdit = (user, firstName, lastName, score) => {
    let updatedRows;
    if (user) {
      updatedRows = produce(rows, draft => {
        draft[draft.findIndex(row => row.id === user.id)] = {
          id: user.id,
          firstName,
          lastName,
          score
        };
      });
    } else {
      updatedRows = [...rows, { id: ++userId, firstName, lastName, score }];
    }
    let sortedRows = sortBy(updatedRows, ["score", "lastName"]);
    setRows(sortedRows);
    handleClose();
  };

  const handleClickOpen = row => {
    setUser(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = id =>
    setRows(prevRows => prevRows.filter(row => row.id !== id));

  return (
    <>
      <AddIcon handleClickOpen={handleClickOpen} />
      <LeaderboardTable
        handleClickOpen={handleClickOpen}
        rows={rows}
        handleDelete={handleDelete}
      />
      <FormDialog
        handleClose={handleClose}
        open={open}
        user={user}
        handleAddEdit={handleAddEdit}
      />
    </>
  );
}
