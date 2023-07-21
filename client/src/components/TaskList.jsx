import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { uri } from "../config";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch tasks from the API endpoint and update the state
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${uri}/api/tasks`);
        setTasks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto max-w-md my-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Task Manager
      </h1>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        {tasks.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 p-4">
            No tasks available.
          </p>
        ) : (
          <ul className="divide-y my-3 divide-gray-200">
            {tasks.map((task) => (
              <li key={task.id} className="relative px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-lg text-gray-800 dark:text-white font-semibold">
                    <Link to={`/tasks/${task.id}`} className="hover:underline">
                      {task.title}
                    </Link>
                  </p>
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
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {task.description}
                  </p>
                </div>
                <div className="flex items-center mt-4">
                  <Link
                    to={`/update/${task.id}`}
                    className="px-3 py-1 rounded text-white bg-blue-500 hover:bg-blue-600 text-xs font-semibold"
                  >
                    Update
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link
        to="/create"
        className="block mt-4 text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Create New Task
      </Link>
    </div>
  );
};

export default TaskList;
