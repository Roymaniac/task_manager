# Project Overview and Description

This project implements a simple task management API using Express.js and MongoDB. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks. Each task has attributes like ID, Title, Description, Status, Created At, and Updated At. The API is designed to be a RESTful service, enabling clients to interact with tasks.

## Setup Instructions

Clone the repository:

```bash
git clone https://github.com/Roymaniac/task_manager.git

cd task_manager
```

Install dependencies:

```bash
npm install
```

Start the MongoDB server (ensure it's running on `mongodb://localhost:27017` or update the connection URL in `.env` file if required).

Start the Express server:

```bash
npm start
```

The API server should now be running on `http://localhost:${PORT}` specified in `.env` file.

## API Endpoints

### 1. Retrieve a List of Tasks

**Endpoint**: GET `/api/tasks`

**Description**: This endpoint retrieves a list of all tasks.

**Response**:

```json
[
  {
    "id": 1,
    "title": "Task 1",
    "description": "Description of Task 1",
    "status": "Pending",
    "createdAt": "2023-07-15T12:34:56.789Z",
    "updatedAt": "2023-07-15T12:34:56.789Z"
  },
  {
    "id": 2,
    "title": "Task 2",
    "description": "Description of Task 2",
    "status": "Completed",
    "createdAt": "2023-07-15T14:12:34.567Z",
    "updatedAt": "2023-07-15T15:30:00.123Z"
  },
  // More tasks...
]
```

### 2. Retrieve a Single Task by ID

**Endpoint**: GET `/api/tasks/:id`

**Description**: This endpoint retrieves a single task by its ID.

**Response** (Success):

```json
{
  "id": 1,
  "title": "Task 1",
  "description": "Description of Task 1",
  "status": "Pending",
  "createdAt": "2023-07-15T12:34:56.789Z",
  "updatedAt": "2023-07-15T12:34:56.789Z"
}
```

**Response** (Error):

```json
{
  "message": "Task with id ${id} does not exist"
}
```

### 3. Create a New Task

**Endpoint**: POST `/api/tasks`

**Description**: This endpoint creates a new task.

**Request**:

```json
{
  "title": "New Task",
  "description": "Description of the new task"
}
```

**Response** (Success):

```json
{
  "id": 3,
  "title": "New Task",
  "description": "Description of the new task",
  "status": "Pending",
  "createdAt": "2023-07-17T09:45:00.000Z",
  "updatedAt": "2023-07-17T09:45:00.000Z"
}
```

**Response** (Error):

```json
{
  "message": "Title and Description are required"
}
```

### 4. Update the Status of a Task

**Endpoint**: PUT `/api/tasks/:id`

**Description**: This endpoint updates the status of a task.

**Request**:

```json
{
  "status": "In Progress"
}
```

**Response** (Success):

```json
{
  "id": 3,
  "title": "New Task",
  "description": "Description of the new task",
  "status": "In Progress",
  "createdAt": "2023-07-17T09:45:00.000Z",
  "updatedAt": "2023-07-17T10:00:00.000Z"
}
```

**Response** (Error):

```json
{
  "message": "Invalid Status"
}
```

### 5. Delete a Task

**Endpoint**: DELETE `/api/tasks/:id`

**Description**: This endpoint deletes a task by its ID.

**Response** (Success):

```json
{
  "message": "Task deleted successfully"
}
```

**Response** (Error):

```json
{
  "message": "Task not found"
}
```

## Running Test Cases

To run the test cases, execute the following command in the terminal:

```bash
npm test
```

The tests will run using Jest and will verify the functionality of each API endpoint, including handling edge cases and errors.

## Additional Information

- This API uses Mongoose as the MongoDB object modeling tool to interact with the database.
- The CORS middleware is used to handle Cross-Origin Resource Sharing.
- The server is set up to listen on port 5000 by default. You can change the port in the `.env` file if needed.

Please make sure to set up MongoDB before running the server, and use appropriate error handling in your client-side code when interacting with the API.
