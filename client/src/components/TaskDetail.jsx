// src/components/TaskDetails.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { uri } from "../config";

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch task details from the API
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`${uri}/api/tasks/${id}`);
        setTask(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task details:", error);
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${uri}/api/tasks/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto max-w-md my-12 px-4">
      {task.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Task Not Found</p>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 relative">
          <div
            className={`absolute top-2 right-2 rounded-full text-xs font-bold px-2 py-1 ${
              task.status === "Completed"
                ? "bg-green-500 text-white"
                : task.status === "In Progress"
                ? "bg-blue-500 text-white"
                : "bg-orange-500 text-white"
            }`}
          >
            {task.status}
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Task Details
          </h2>
          <p className="text-lg text-gray-800 dark:text-white mb-2">
            Title: {task.title}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Description: {task.description}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Created At: {new Date(task.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Updated At: {new Date(task.updatedAt).toLocaleString()}
          </p>
          <Link
            to={`/update/${id}`}
            className="block px-4 py-2 w-full text-center my-2 font-semibold rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Update Status
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 w-full my-2 text-white font-semibold bg-red-500 hover:bg-red-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            Delete Task
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
