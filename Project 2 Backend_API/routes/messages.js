const express = require("express");
const store = require("../data/store");
const { validateMessage } = require("../middleware/validate");

const router = express.Router();

// GET /api/messages — list submitted contact messages
// (in a real app this would sit behind authentication)
router.get("/", (req, res) => {
  const results = store.getAllMessages();
  res.status(200).json({ status: "success", count: results.length, data: results });
});

// POST /api/messages — submit the contact form
router.post("/", validateMessage, (req, res) => {
  const { name, email, message } = req.body;
  const entry = store.addMessage({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  });

  res.status(201).json({
    status: "success",
    message: "Message received. We'll be in touch soon.",
    data: entry,
  });
});

module.exports = router;
