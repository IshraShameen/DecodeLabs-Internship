// =============================================================
// In-memory data store.
//
// This is intentionally NOT a database — Project 2's brief is
// about API logic, request/response flow, and validation, not
// persistence. Data resets whenever the server restarts.
// A future project can swap this module for a real database
// without touching the route handlers, since routes only ever
// call the functions exported here.
// =============================================================

let nextProjectId = 4;
const projects = [
  {
    id: 1,
    title: "Interface Layer",
    category: "frontend",
    description: "A mobile-first responsive shell built with semantic HTML5 and CSS Grid.",
  },
  {
    id: 2,
    title: "Order Pipeline",
    category: "fullstack",
    description: "A state-driven order tracker, from draft to delivered.",
  },
  {
    id: 3,
    title: "Component Library",
    category: "design",
    description: "A shared token system used across three product teams.",
  },
];

let nextMessageId = 1;
const messages = [];

module.exports = {
  // Projects
  getAllProjects: () => projects,
  getProjectById: (id) => projects.find((p) => p.id === id),
  addProject: ({ title, category, description }) => {
    const project = { id: nextProjectId++, title, category, description };
    projects.push(project);
    return project;
  },

  // Contact messages
  getAllMessages: () => messages,
  addMessage: ({ name, email, message }) => {
    const entry = {
      id: nextMessageId++,
      name,
      email,
      message,
      receivedAt: new Date().toISOString(),
    };
    messages.push(entry);
    return entry;
  },
};
