// Default notices - only inserted if database is empty
const defaultNotices = [
  {
    id: 1,
    title: "Semester Examination Schedule",
    category: "Examination",
    priority: "HIGH",
    summary: "Semester examinations will begin from 15 August.",
  },
  {
    id: 2,
    title: "Assignment Submission Deadline",
    category: "Academic",
    priority: "MEDIUM",
    summary: "Submit pending assignments before 10 August.",
  },
  {
    id: 3,
    title: "Campus Placement Drive",
    category: "Placement",
    priority: "LOW",
    summary: "A placement drive will be held next week.",
  },
];

module.exports = defaultNotices;
