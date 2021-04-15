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
          <div className="inp-ctr">
            <ListItemText
              primary={todo}
              secondary={inprogress ? "In Progress ⏳" : "Completed ✅"}
            />
          </div>
          <Button className="spl-btn" onClick={toggleInProgress}>
            {inprogress ? "Done" : "UnDone"}
          </Button>
          <Button className="spl-btn" onClick={deleteTodo}>
            X
          </Button>
        </ListItem>
      </p>
    </div>
  );
}
