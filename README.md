Task Management Application

This is a Task Management Application built with React + TypeScript (frontend), Node.js (backend), and PostgreSQL (database). The application allows users to signup, log in, and manage their tasks (create, view, update, delete) while ensuring that only authenticated users can perform task operations.

Backend Setup:

git clone <your-repo-url>

cd <your-repo-name>/backend

npm install
< br / >
Create a .env file in the backend directory and configure the following environment variables: env Copy Edit

DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>

SECRET_KEY=your_secret_key


