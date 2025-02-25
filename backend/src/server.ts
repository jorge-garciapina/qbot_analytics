import express, { Application } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes"; // Import the centralized routes

dotenv.config();

const mongoURL = process.env.MONGO_URL;

// Initialize Express
const app: Application = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json()); // Only body-parser is needed

// MongoDB Connection
const mongoURI = mongoURL || "";
mongoose.connect(mongoURI, {} as mongoose.ConnectOptions);

// MongoDB Connection Success/Error Handlers
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Use Routes
app.use("/server_connect", routes);

// Start the server
app.listen(PORT, (): void => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
