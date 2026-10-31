require("dotenv").config();
const express = require("express");

const authRoutes = require("./modules/auth/auth.routes");
const categoryRoutes = require("./modules/categories/category.routes");
const courseRoutes = require("./modules/courses/course.routes");

const app = express();
const PORT = 5000;

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Course API is running successfully on port 5000"
  });
});

// Authentication module
app.use("/api/auth", authRoutes);

// Category CRUD module
app.use("/api/categories", categoryRoutes);

// Course CRUD module
app.use("/api/courses", courseRoutes);

// Handle invalid URLs
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Handle invalid JSON and other errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body"
    });
  }

  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
