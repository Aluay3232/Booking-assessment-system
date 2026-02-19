const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const { initDb } = require("./db");
const appointmentsRouter = require("./routes/appointments");
const authRouter = require("./routes/auth");

const app = express();
const port = process.env.PORT || 5000;
const corsOriginRaw = process.env.CORS_ORIGIN || "*";
const corsOrigin =
  corsOriginRaw === "*"
    ? "*"
    : corsOriginRaw
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);

app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/appointments", appointmentsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });
