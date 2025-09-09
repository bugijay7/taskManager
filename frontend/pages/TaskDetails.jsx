import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        console.log("Fetching task details for:", id);
        const res = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        setTask(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task details:", error);
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!task) return <p className="text-center py-10 text-red-500">Task not found.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{task.title}</h1>

      <div className="space-y-3">
        <p>
          <span className="font-medium text-gray-700">Description: </span>
          <span className="text-gray-600">{task.description}</span>
        </p>

        <p>
          <span className="font-medium text-gray-700">Status: </span>
          {task.completed ? (
            <span className="badge badge-success">Completed ✅</span>
          ) : (
            <span className="badge badge-error">Not Completed ❌</span>
          )}
        </p>

        <p>
          <span className="font-medium text-gray-700">Created At: </span>
          <span className="text-gray-600">
            {new Date(task.createdAt).toLocaleString()}
          </span>
        </p>

        <p>
          <span className="font-medium text-gray-700">Updated At: </span>
          <span className="text-gray-600">
            {new Date(task.updatedAt).toLocaleString()}
          </span>
        </p>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          className="btn btn-outline"
          onClick={() => navigate("/")}
        >
          ⬅ Back to List
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/edit/${task._id}`)}
        >
          ✏️ Edit Task
        </button>
      </div>
    </div>
  );
}

export default TaskDetails;
