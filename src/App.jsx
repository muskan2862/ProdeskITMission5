import { useState, useEffect } from "react";
import Column from "./components/Column";

function App() {
  const [tasks, setTasks] = useState([]);

  // ✅ Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, priority) => {
    const newTask = {
      id: Date.now(),
      text,
      status: "todo",
      priority,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const moveTask = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // ✅ Edit task
  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  return (
    <div>
      <h1>Kanban Board</h1>

      <div className="board">
        <Column
          title="To Do"
          status="todo"
          tasks={tasks}
          addTask={addTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
          editTask={editTask}
        />

        <Column
          title="In Progress"
          status="progress"
          tasks={tasks}
          deleteTask={deleteTask}
          moveTask={moveTask}
          editTask={editTask}
        />

        <Column
          title="Done"
          status="done"
          tasks={tasks}
          deleteTask={deleteTask}
          moveTask={moveTask}
          editTask={editTask}
        />
      </div>
    </div>
  );
}

export default App;