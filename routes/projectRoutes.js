const router = require("express").Router();
const auth = require("../middleware/auth");
const Project = require("../models/Project");

// ✅ GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json("Error fetching projects");
  }
});

// ✅ CREATE project
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, link } = req.body;

    if (!title || !description || !link) {
      return res.status(400).json("All fields required");
    }

    const newProject = new Project({ title, description, link });
    await newProject.save();

    res.json(newProject);
  } catch (err) {
    res.status(500).json("Error creating project");
  }
});

// ✅ UPDATE project
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, link } = req.body;

    if (!title || !description || !link) {
      return res.status(400).json("All fields required");
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, link },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json("Project not found");
    }

    res.json(updatedProject);

  } catch (err) {
    res.status(500).json("Server error");
  }
});

// ✅ DELETE project
router.delete("/:id", auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json("Project deleted");
  } catch (err) {
    res.status(500).json("Delete failed");
  }
});

module.exports = router;