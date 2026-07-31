const express = require("express");
const store = require("../data/store");
const { validateProject } = require("../middleware/validate");

const router = express.Router();

// GET /api/projects — list all projects (optionally filter by category)
router.get("/", (req, res) => {
  const { category } = req.query;
  let results = store.getAllProjects();

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  res.status(200).json({ status: "success", count: results.length, data: results });
});

// GET /api/projects/:id — fetch a single project
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ status: "error", errors: ["id must be a number."] });
  }

  const project = store.getProjectById(id);
  if (!project) {
    return res.status(404).json({ status: "error", errors: [`No project found with id ${id}.`] });
  }

  res.status(200).json({ status: "success", data: project });
});

// POST /api/projects — create a new project
router.post("/", validateProject, (req, res) => {
  const { title, category, description } = req.body;
  const project = store.addProject({
    title: title.trim(),
    category,
    description: description.trim(),
  });

  res.status(201).json({ status: "success", data: project });
});

module.exports = router;
