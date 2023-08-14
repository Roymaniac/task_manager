const request = require("supertest");
const app = require("../index");
const {
  connectToDatabase,
  closeDatabaseConnection,
} = require("../utils/connect");
const mongoose = require("mongoose");

const sampleTask = {
  _id: new mongoose.Types.ObjectId(),
  title: "Test Task",
  description: "This is a test task.",
  status: "In Progress",
};

describe("Task Management API", () => {
  let taskId;

  beforeAll(async () => {
    // Initialize the database connection before running the tests
    try {
      await connectToDatabase();
      console.log("Connected to the database!");
    } catch (err) {
      console.error(err);
    }
  });

  afterAll(async () => {
    // Close the database connection after running all tests
    try {
      await closeDatabaseConnection();
      console.log("Closed the database connection!");
    } catch (err) {
      console.error(err);
    }
  });

  it("should create a new task", async () => {
    const response = await request(app).post("/api/tasks").send(sampleTask);
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    taskId = response.body.data._id;
  });

  it("should retrieve a list of tasks", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should retrieve a single task by id", async () => {
    const response = await request(app).get(`/api/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body.data._id).toBe(taskId);
  });

  it("should return 404 for non-existent task", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/tasks/${fakeId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      `Task with id ${fakeId} does not exist`
    );
  });

  it("should update the status of a task", async () => {
    const newStatus = "Completed";
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ status: newStatus });
    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe(newStatus);
  });

  it("should return 404 for an invalid status update", async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ status: "Progress" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid Status");
  });

  it("should delete a task", async () => {
    const response = await request(app).delete(`/api/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty(
      "message",
      "Task deleted successfully"
    );
  });

  it("should return 404 when deleting a non-existent task", async () => {
    const response = await request(app).delete(
      "/api/tasks/64b9c31b8fc27a39598"
    );
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Task not found");
  });
});
