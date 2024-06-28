import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([
    { text: "Task1", id: 1, isCompleted: false },
    { text: "Task2", id: 2, isCompleted: false },
    { text: "Task3", id: 3, isCompleted: false },
  ]);

  const [deletedList, setDeletedList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");

  const handleAddTodo = () => {
    setTodos([...todos, { text: todo, id: Date.now(), isCompleted: false }]);
    setTodo("");
  };

  const handleDeleteTodo = (deleteId) => {
    const deletedTodo = todos.find((todo) => {
      return todo.id === deleteId;
    });
    setDeletedList([...deletedList, deletedTodo]);

    const updatedList = todos.filter((todo) => {
      return todo.id != deleteId;
    });
    setTodos(updatedList);
  };

  const handleEditTodo = (editId) => {
    setEditIndex(editId);
    setEditedTodo(todos.find((todo) => todo.id === editId).text);
  };

  const handleSaveTodo = (saveId) => {
    const updatedTodos = todos.map((todo) => {
      return todo.id === saveId ? { ...todo, text: editedTodo } : todo;
    });
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditedTodo("");
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="todo-input">
        <input
          type="text"
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>

        <ul className="container">
          <h2>Your Tasks</h2>
          {todos.map((todo) => {
            return (
              <div key={todo.id} className="list-container">
                {editIndex === todo.id ? (
                  <input
                    type="text"
                    value={editedTodo}
                    onChange={(event) => setEditedTodo(event.target.value)}
                  />
                ) : (
                  <li>{todo.text}</li>
                )}

                {editIndex === todo.id ? (
                  <button onClick={() => handleSaveTodo(todo.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
                )}
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </ul>

        <ul className="container">
          <h1>Completed Tasks</h1>
          {deletedList.map((todo) => {
            return (
              <div className="list-container" key={todo.id}>
                <li>{todo.text}</li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
