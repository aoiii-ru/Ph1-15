import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (event) => {
    event.preventDefault(); 
    const text = input.trim();
    if (text === "") return; 
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setInput(""); 
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <main className="min-h-screen bg-stone-100 md:pt-20 flex justify-center">
      <div className="w-80">
        <span className="text-4xl font-serif font-bold text-stone-800 my-2 px-4">
          My Tasks
        </span>
        <form onSubmit={addTask} className="flex gap-4 items-center w-full">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="border border-stone-700 p-2 my-4 rounded-lg flex-1 focus:ring-1 focus:ring-blue-500"
            placeholder="タスクを入力..."
          />
          <button 
            type="submit"
            className="bg-blue-800 p-2 rounded-lg text-white hover:bg-gray-800">追加
          </button>
        </form>

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-2 bg-white rounded-lg shadow px-4 py-2"
            >
            <span
              className={`flex-1 cursor-pointer ${task.done ? "line-through text-gray-400" : ""}`}
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </span>
            <button
              className="text-red-400 hover:text-red-600 text-sm"
              onClick={() => deleteTask(task.id)}>
              削除
            </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-8">タスクがありません</p>
        )}
      </div>
    </main>
  );
}

export default App;