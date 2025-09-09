import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      console.log("Fetching tasks...");
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        console.log("Tasks fetched:", response.data);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Handle delete task
  const handleDelete = async (id) => {
    console.log("Deleting task with ID:", id);
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      console.log("Task deleted successfully:", id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Maina Task App</h1>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <ul className="list bg-base-100 rounded-box shadow-md divide-y">
          {tasks.map((task) => (
            <li key={task._id} className="list-row flex items-center justify-between p-4">
              <div>
                <div className="font-medium">{task.title}</div>
                {task.description && (
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {task.description}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {/* Details button */}
                <button
                  onClick={() => navigate(`/task/${task._id}`)}
                  className="btn btn-square btn-ghost"
                >
                  🔍
                </button>

                {/* Edit button */}
                <button
                  onClick={() => navigate(`/edit/${task._id}`)}
                  className="btn btn-square btn-ghost"
                >
                  ✏️
                </button>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-square btn-ghost text-error"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <button
          onClick={() => navigate('/create')}
          className="btn btn-primary"
        >
          ➕ Add New Task
        </button>
      </div>
    </div>
  );
}

export default Home;
