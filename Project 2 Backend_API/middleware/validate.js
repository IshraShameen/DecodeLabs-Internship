// =============================================================
// Validation middleware — "Never trust the client."
//
// Each function checks req.body against basic rules and, on
// failure, responds 400 Bad Request with a field-level error
// list instead of letting bad data reach the data layer.
// =============================================================

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_CATEGORIES = ["frontend", "fullstack", "design"];

function validateProject(req, res, next) {
  const { title, category, description } = req.body || {};
  const errors = [];

  if (typeof title !== "string" || title.trim().length < 2) {
    errors.push("title is required and must be at least 2 characters.");
  }
  if (!VALID_CATEGORIES.includes(category)) {
    errors.push(`category must be one of: ${VALID_CATEGORIES.join(", ")}.`);
  }
  if (typeof description !== "string" || description.trim().length < 10) {
    errors.push("description is required and must be at least 10 characters.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ status: "error", errors });
  }

  next();
}

function validateMessage(req, res, next) {
  const { name, email, message } = req.body || {};
  const errors = [];

  if (typeof name !== "string" || name.trim().length < 2) {
    errors.push("name is required and must be at least 2 characters.");
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    errors.push("a valid email address is required.");
  }
  if (typeof message !== "string" || message.trim().length < 10) {
    errors.push("message is required and must be at least 10 characters.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ status: "error", errors });
  }

  next();
}

module.exports = { validateProject, validateMessage };
