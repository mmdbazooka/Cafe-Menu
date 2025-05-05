const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.config");
const cors = require("cors");
const corsOptions = require("./config/cors.config");
const { categoryRouter, itemRouter, orderRouter, uploadRouter } = require("./routes/index");

dotenv.config();
const app = express();
const PORT = 3000;

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

const endpoints = [];

// Route definitions
app.get("/api", (req, res) => {
  res.send("Backend is running!");
});

// Category routes
app.use("/api/category", categoryRouter);
endpoints.push({ path: "/api/category" });

// Item routes
app.use("/api/items", itemRouter);
endpoints.push({
  path: "/api/items",
});

// Order routes
app.use("/api/orders", orderRouter);
endpoints.push({
  path: "/api/orders",
});

app.use("/api/uploads", uploadRouter);
endpoints.push({ path: "/api/uploads" });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  console.log("Available API endpoints:");
  endpoints.forEach((endpoint) => {
    console.log(`-${endpoint.path}`);
  });
});
