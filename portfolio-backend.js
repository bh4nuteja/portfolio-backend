require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

// ✅ 1. CORS FIRST
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// ✅ 2. JSON parser SECOND
app.use(express.json());

// ✅ 3. Routes AFTER middleware
const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);
app.use("/projects", require("./routes/projectRoutes"));
app.use("/contact", require("./routes/contactRoutes"));

app.get("/", (req, res) => {
  res.send("API Running");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// app.listen(5000, () => console.log("Server running on port 5000"));