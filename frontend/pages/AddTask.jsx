import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://taskmanager-q9wf.onrender.com/api/tasks", {
        title,
        description,
      });
      navigate("/"); // Redirect to home after adding task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">➕ Add New Task</h1>

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg 
                       bg-gray-50 text-base focus:ring-primary focus:border-primary
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-primary dark:focus:border-primary"
            placeholder="Enter task title"
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg 
                       bg-gray-50 text-base focus:ring-primary focus:border-primary
                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-primary dark:focus:border-primary"
            placeholder="Enter task description"
          ></textarea>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full btn btn-primary"
        >
          💾 Save Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
