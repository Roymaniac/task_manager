// src/components/UpdateTask.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { uri } from "../config";

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Fetch task details to pre-populate the current status
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`${uri}/api/tasks/${id}`);
        setStatus(response.data.data.status);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTaskDetails();
  }, [id]);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${uri}/api/tasks/${id}`, { status });
      navigate("/");
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="mx-auto max-w-md my-12 px-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Update Task Status</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="status"
            className="block mb-1 font-semibold text-white"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          Update Status
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
