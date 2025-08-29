// src/server.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import { apiChaicodeSignup, apiTwitterPost, apiGmailSend } from "./api/api";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chaicode/signup", async (_req, res) => {
  try {
    await apiChaicodeSignup();
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e?.message || String(e) });
  }
});

app.post("/api/twitter/post", async (req, res) => {
  try {
    const { prompt, profilePath } = req.body || {};
    if (!prompt) return res.status(400).json({ ok: false, error: "prompt required" });
    await apiTwitterPost(prompt, profilePath);
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e?.message || String(e) });
  }
});

app.post("/api/gmail/send", async (req, res) => {
  try {
    const { to, subject, body, cdp, profilePath } = req.body || {};
    if (!to || !subject || !body) {
      return res.status(400).json({ ok: false, error: "to, subject, body required" });
    }
    await apiGmailSend(to, subject, body, cdp, profilePath);
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e?.message || String(e) });
  }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));