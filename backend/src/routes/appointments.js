const express = require("express");
const { db } = require("../db");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

function isValidPayload(payload) {
  return (
    payload &&
    typeof payload.customer_name === "string" &&
    typeof payload.phone === "string" &&
    typeof payload.service === "string" &&
    typeof payload.date === "string" &&
    typeof payload.time === "string"
  );
}

router.get("/", authMiddleware, async (req, res) => {
  try {
    const items = await db("appointments")
      .select("*")
      .where({ user_id: req.user.id })
      .orderBy("id", "desc");
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to load appointments." });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await db("appointments")
      .select("*")
      .where({ id: req.params.id, user_id: req.user.id })
      .first();
    if (!item) {
      return res.status(404).json({ error: "Appointment not found." });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to load appointment." });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    if (!isValidPayload(req.body)) {
      return res.status(400).json({ error: "Invalid appointment payload." });
    }

    const [id] = await db("appointments").insert({
      user_id: req.user.id,
      customer_name: req.body.customer_name.trim(),
      phone: req.body.phone.trim(),
      service: req.body.service.trim(),
      date: req.body.date.trim(),
      time: req.body.time.trim(),
      status: req.body.status ? req.body.status.trim() : "scheduled",
      notes: req.body.notes ? req.body.notes.trim() : null,
      updated_at: db.fn.now(),
    });

    const created = await db("appointments").where({ id, user_id: req.user.id }).first();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: "Failed to create appointment." });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (!isValidPayload(req.body)) {
      return res.status(400).json({ error: "Invalid appointment payload." });
    }

    const updated = await db("appointments")
      .where({ id: req.params.id, user_id: req.user.id })
      .update({
        customer_name: req.body.customer_name.trim(),
        phone: req.body.phone.trim(),
        service: req.body.service.trim(),
        date: req.body.date.trim(),
        time: req.body.time.trim(),
        status: req.body.status ? req.body.status.trim() : "scheduled",
        notes: req.body.notes ? req.body.notes.trim() : null,
        updated_at: db.fn.now(),
      });

    if (!updated) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    const item = await db("appointments")
      .select("*")
      .where({ id: req.params.id, user_id: req.user.id })
      .first();
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointment." });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await db("appointments")
      .where({ id: req.params.id, user_id: req.user.id })
      .del();
    if (!deleted) {
      return res.status(404).json({ error: "Appointment not found." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete appointment." });
  }
});

module.exports = router;
