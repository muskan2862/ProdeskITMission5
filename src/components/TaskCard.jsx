import { useState } from "react";

function TaskCard({ task, deleteTask, moveTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleSave = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <div className={`card ${task.priority}`}>
      {isEditing ? (
        <>
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <p onClick={() => setIsEditing(true)}>{task.text}</p>
      )}

      <button onClick={() => deleteTask(task.id)}>X</button>

      {task.status === "todo" && (
        <button onClick={() => moveTask(task.id, "progress")}>
          → Progress
        </button>
      )}

      {task.status === "progress" && (
        <>
          <button onClick={() => moveTask(task.id, "todo")}>
            ← ToDo
          </button>
          <button onClick={() => moveTask(task.id, "done")}>
            → Done
          </button>
        </>
      )}

      {task.status === "done" && (
        <button onClick={() => moveTask(task.id, "progress")}>
          ← Progress
        </button>
      )}
    </div>
  );
}

export default TaskCard;