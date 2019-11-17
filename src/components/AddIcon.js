import React from "react";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/icons/Add";

function AddIcon({ handleClickOpen }) {
  return (
    <Fab
      color="primary"
      aria-label="add"
      style={{ margin: "10px" }}
      onClick={() => handleClickOpen()}
    >
      <Icon />
    </Fab>
  );
}

export default AddIcon;
