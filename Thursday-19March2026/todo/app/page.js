'use client'

import { useEffect, useState } from "react";
import axios from "axios";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const API = "http://localhost:3010/api";

  // 🔹 Fetch Todos
  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(`${API}/tasks`);
      setTodos(data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 🔹 Add Task
  const handleAdd = async () => {
    if (!task.trim()) return;

    console.log(task)

    try {
      await axios.post(`${API}/tasks`, {
        todo_name: task
      });

      setTask("");
      fetchTodos(); // sync with backend
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // 🔹 Delete Task
  const handleCompleted = async (id) => {
    try {
      await axios.delete(`${API}/tasks/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-4">
          Todo App
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.todo_id}
              className="flex justify-between items-center bg-slate-200 p-3 rounded-lg"
            >
              <span>{todo.todo_name}</span>

              <button
                onClick={() => handleCompleted(todo.todo_id)}
                className="text-red-500"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}