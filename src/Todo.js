import { Button, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { db } from "./fire";
import "./styles.css";

export default function TodoListItem({ todo, inprogress, id }) {
  function toggleInProgress() {
    db.collection("todos").doc(id).update({
      inprogress: !inprogress
    });
  }

  function deleteTodo() {
    db.collection("todos").doc(id).delete();
  }

  return (
    <div className="list-item-inline">
      <p>
        <ListItem className="clrs">
          <ListItemText
            primary={todo}
            secondary={inprogress ? "In Progress ⏳" : "Completed ✅"}
          />
          <Button onClick={toggleInProgress}>
            {inprogress ? "Done" : "UnDone"}
          </Button>
          <Button onClick={deleteTodo}>X</Button>
        </ListItem>
      </p>
    </div>
  );
}
