// server/index.js

import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import morgan from "morgan";

const app = express();

// --- Config ---
const PORT = process.env.PORT || 4000;
// Use 127.0.0.1 to avoid IPv6 (::1) issues
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hr_figma_login";
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

// --- Middleware ---
app.use(
  cors({
    origin: "http://localhost:3000", // your Vite/React app
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// --- Mongo Connection ---
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Mongo connected:", MONGO_URI))
  .catch((err) => {
    console.error("❌ Mongo connection error", err);
    process.exit(1);
  });

// --- User Model ---
const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// --- Basic health check ---
app.get("/api/health", (req, res) => {
  res.json({ ok: true, status: "API running", mongo: mongoose.connection.readyState });
});

// --- Seed default admin user ---
// POST /api/auth/seed
// Creates: admin@example.com / password123 (only if not already present)
app.post("/api/auth/seed", async (req, res) => {
  try {
    const email = "admin@example.com";
    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({
        ok: true,
        message: "Admin already exists",
        email,
      });
    }

    const passwordHash = await bcrypt.hash("password123", 10);
    await User.create({ email, passwordHash });

    res.json({
      ok: true,
      message: "Seeded admin user",
      email,
      password: "password123",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to seed admin user" });
  }
});

// --- Login route ---
// POST /api/auth/login  { email, password }
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      {
        sub: user._id.toString(),
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ===================== USER CRUD ROUTES =====================

// GET /api/users  -> list all users (safe fields only)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, { email: 1, createdAt: 1 });
    res.json(users);
  } catch (err) {
    console.error("Get users error", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST /api/users  -> create a new user with email + password
app.post("/api/users", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });
    res
      .status(201)
      .json({ _id: user._id, email: user.email, createdAt: user.createdAt });
  } catch (err) {
    console.error("Create user error", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// PUT /api/users/:id  -> update email and/or password
app.put("/api/users/:id", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const update = {};
    if (email) update.email = email;
    if (password) {
      update.passwordHash = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ _id: user._id, email: user.email });
  } catch (err) {
    console.error("Update user error", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// DELETE /api/users/:id  -> delete user
app.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ ok: true });
  } catch (err) {
    console.error("Delete user error", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// ===================== START SERVER =====================
app.listen(PORT, () => {
  console.log(`🚀 API listening on http://localhost:${PORT}`);
});
