import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", description: "", completed: false });
  const [loading, setLoading] = useState(true);

  // Fetch task by ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        console.log("Fetching task with id:", id);
        const res = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        setTask(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task:", error);
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({ ...task, [name]: type === "checkbox" ? checked : value });
  };

  // Handle form submit (update task)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating task:", task);
      await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
      navigate("/"); // redirect back to home
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">✏️ Edit Task</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg 
                       bg-gray-50 text-base focus:ring-primary focus:border-primary
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-primary dark:focus:border-primary"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            rows="4"
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg 
                       bg-gray-50 text-base focus:ring-primary focus:border-primary
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-primary dark:focus:border-primary"
          />
        </div>

        {/* Completed Checkbox */}
        <div className="flex items-center gap-2">
          <input
            id="completed"
            type="checkbox"
            name="completed"
            checked={task.completed}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
          <label htmlFor="completed" className="text-sm text-gray-900 dark:text-white">
            Mark as Completed
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full btn btn-primary"
        >
          💾 Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditTask;
