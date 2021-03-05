/** @format */

import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // input tag validation
    if (!name) {
      showAlert(true, "please enter value", "danger");
    } else if ((name, isEditing)) {
      // deal with edit
    } else {
      // show alert
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      showAlert(true, "item added to the list", "success");
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    showAlert(true, "empty list", "danger");
    setList([]);
  };

  return (
    <section className="section-center">
      <form
        className="grocery-form"
        onSubmit={handleSubmit}
      >
        {alert.show && (
          <Alert {...alert} removeAlert={showAlert}></Alert>
        )}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g egg"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list}></List>
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
