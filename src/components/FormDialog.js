import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function FormDialog({ handleClose, open, user, handleAddEdit }) {
  const [score, setScore] = useState(50);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleScoreChange = (_, newValue) => setScore(newValue);
  const handleFirstNameChange = event => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = event => {
    setLastName(event.target.value);
  };
  const resetValues = () => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setScore(user.score);
    } else {
      setFirstName("");
      setLastName("");
      setScore(50);
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setScore(user.score);
    } else {
      setFirstName("");
      setLastName("");
      setScore(50);
    }
  }, [user]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        resetValues();
      }}
    >
      <DialogTitle>{user ? "Edit" : "Add"}</DialogTitle>
      <Box
        component="form"
        onSubmit={e => {
          e.preventDefault();
          handleAddEdit(user, firstName, lastName, score);
        }}
      >
        <DialogContent dividers={true}>
          <TextField
            value={firstName}
            onChange={handleFirstNameChange}
            margin="dense"
            label="First Name"
            required
            fullWidth
          />
          <TextField
            value={lastName}
            onChange={handleLastNameChange}
            margin="dense"
            required
            label="Last Name"
            fullWidth
          />
          <Box style={{ marginTop: "10px" }}>
            <Typography gutterBottom>Score</Typography>
            <Slider
              onChange={handleScoreChange}
              value={score}
              valueLabelDisplay="auto"
              step={1}
              min={0}
              max={100}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              resetValues();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button color="primary" type="submit">
            {user ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default FormDialog;
