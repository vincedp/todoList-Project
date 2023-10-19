import React, { useState } from "react";

// const initialItems = ["learn react", "learn javascript", "learn css/html"];

const initialItems = JSON.parse(localStorage.getItem("items"));

export default function App() {
  const items = !initialItems ? [] : initialItems;

  const [input, setInput] = useState("");
  const [list, setList] = useState(items);
  const [sortBy, setSortBy] = useState("input");

  localStorage.setItem("items", JSON.stringify(list));

  let sortedList;
  if (sortBy === "input") sortedList = list;
  if (sortBy === "done")
    sortedList = list.slice().filter((item) => item.isDone);
  if (sortBy === "unfinished")
    sortedList = list.slice().filter((item) => !item.isDone);

  function handleReset() {
    setList([]);
  }

  function handleSortInput() {
    setSortBy("input");
  }

  function handleSortDone() {
    setSortBy("done");
  }

  function handleSortNotDone() {
    setSortBy("unfinished");
  }

  function handleAddItems(item) {
    setList((prevItems) => [...prevItems, item]);
  }

  function handleToggleItem(id) {
    setList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  }

  function handleDeleteItem(id) {
    setList((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!input) return;

    const newItem = { id: crypto.randomUUID(), name: input, isDone: false };

    handleAddItems(newItem);
    setInput("");
  }

  return (
    <div className="app">
      <h1>Todo's</h1>
      <form className="input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit}>➕</button>
      </form>
      <ul className="list">
        {!list.length && (
          <li className="placeholder">Begin listing your todo's here</li>
        )}
        {list.length > 0 &&
          sortedList.map((item, i) => (
            <React.Fragment key={item.id}>
              <Item
                item={item}
                list={list}
                onDeleteItem={handleDeleteItem}
                onToggleItem={handleToggleItem}
              />
              {sortedList.length - 1 !== i && <hr />}
            </React.Fragment>
          ))}
      </ul>

      <div className="actions">
        <button onClick={handleSortInput}>📃</button>
        <button onClick={handleSortNotDone}>❌</button>
        <button onClick={handleSortDone}>✅</button>
        <button onClick={handleReset}>reset</button>
      </div>
    </div>
  );
}

function Item({ item, onToggleItem, onDeleteItem }) {
  return (
    <li>
      <p
        onClick={() => onToggleItem(item.id)}
        className={`item ${item.isDone ? "underline" : ""}`}
      >
        {item.name}
      </p>
      <div>
        <span>{item.isDone && "✅"} </span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </div>
    </li>
  );
}
