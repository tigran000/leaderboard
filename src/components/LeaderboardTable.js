import React from "react";
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

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  }
});

function LeaderboardTable({ handleClickOpen, rows, handleDelete }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table aria-label="simple table">
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
                {row.lastName} {row.firstName}
              </TableCell>
              <TableCell align="center" style={{ width: "30%" }}>
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
    </Paper>
  );
}
export default LeaderboardTable;
