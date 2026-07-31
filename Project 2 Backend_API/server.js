// =============================================================
// Blueprint Studio API — Project 2: Backend API Development
// DecodeLabs Full Stack Internship, Batch 2026
//
// A small, dependency-light REST API demonstrating:
//   - RESTful resource naming (nouns, not verbs)
//   - GET / POST endpoints
//   - Request validation ("never trust the client")
//   - Correct, meaningful HTTP status codes
// =============================================================

const express = require("express");
const cors = require("cors");

const projectsRouter = require("./routes/projects");
const messagesRouter = require("./routes/messages");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- Health check ---
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "success", message: "API is running.", uptime: process.uptime() });
});

// --- Resources ---
app.use("/api/projects", projectsRouter);
app.use("/api/messages", messagesRouter);

// --- 404: unmatched routes ---
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    errors: [`Cannot ${req.method} ${req.originalUrl}.`],
  });
});

// --- Central error handler: catches anything thrown/next(err) ---
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    errors: ["Something went wrong on the server."],
  });
});

app.listen(PORT, () => {
  console.log(`Blueprint Studio API listening on http://localhost:${PORT}`);
});

module.exports = app;
