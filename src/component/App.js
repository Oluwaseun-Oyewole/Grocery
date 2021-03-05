/** @format */

import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
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
    }
    // deal with edit
    else if ((name, isEditing)) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "item editted", "success");
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

  const deleteItem = (id) => {
    showAlert(true, "item removed", "danger");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find(
      (item) => item.id === id
    );
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  });

  return (
    <section className="section-center">
      <form
        className="grocery-form"
        onSubmit={handleSubmit}
      >
        {alert.show && (
          <Alert
            {...alert}
            removeAlert={showAlert}
            list={list}
          ></Alert>
        )}
        <h3>Grocery</h3>
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
          <List
            items={list}
            removeItem={deleteItem}
            editItem={editItem}
          ></List>
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
