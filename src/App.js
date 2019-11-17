import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import FormDialog from "./FormDialog";
let userId = 2;
const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

const initialRows = [
  { id: 0, firstName: "Geary", lastName: "Alice", score: 96 },
  { id: 1, firstName: "Junge", lastName: "John", score: 96 },
  { id: 2, firstName: "Vera", lastName: "Rob", score: 88 }
];

export default function SimpleTable() {
  const classes = useStyles();

  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const handleDelete = id =>
    setRows(prevRows => prevRows.filter(row => row.id !== id));

  const handleAddEdit = (user, firstName, lastName, score) => {
    if (user) {
      const updatedRows = rows.map(row => {
        if (row.id === user.id) {
          return { id: user.id, firstName, lastName, score };
        }
        return row;
      });

      setRows(updatedRows);
    } else {
      setRows([...rows, { id: ++userId, firstName, lastName, score }]);
    }

    handleClose();
  };
  const handleClickOpen = row => {
    setUser(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleClickOpen()}
      >
        ADD
      </Button>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: "40%" }}>
                Name
              </TableCell>
              <TableCell align="center" style={{ width: "30%" }}>
                Score
              </TableCell>
              <TableCell align="center" style={{ width: "30%" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell align="center" style={{ width: "40%" }}>
                  {row.firstName} {row.lastName}
                </TableCell>
                <TableCell align="center" style={{ width: "40%" }}>
                  {row.score}
                </TableCell>
                <TableCell align="center" style={{ width: "30%" }}>
                  <IconButton onClick={() => handleClickOpen(row)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <FormDialog
          handleClose={handleClose}
          open={open}
          user={user}
          handleAddEdit={handleAddEdit}
        />
      </Paper>
    </div>
  );
}
