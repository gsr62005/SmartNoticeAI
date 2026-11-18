// Normalize a notice title so duplicates can be detected reliably
const normalizeTitle = (title) =>
  title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ");

module.exports = normalizeTitle;
