import { useState } from "react";
import TaskCard from "./TaskCard";

function Column({
  title,
  status,
  tasks,
  addTask,
  deleteTask,
  moveTask,
  editTask,
}) {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleAdd = () => {
    if (!input.trim()) return;
    addTask(input, priority);
    setInput("");
  };

  return (
   <div className="column">
      <h2>{title}</h2>
      {status === "todo" && (
        <>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter task"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button onClick={handleAdd}>Add</button>
        </>
      )}

      {/* Tasks */}
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            moveTask={moveTask}
            editTask={editTask}
          />
        ))}
    </div>
  );
}

export default Column;