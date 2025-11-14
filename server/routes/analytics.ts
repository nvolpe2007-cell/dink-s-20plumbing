import type { RequestHandler } from "express";

export const handleTrack: RequestHandler = async (req, res) => {
  try {
    const payload = req.body || {};
    console.log("Track event:", payload);
    // For now we just log. In production you can forward this to analytics or DB.
    return res.json({ ok: true });
  } catch (err) {
    console.error("Track error", err);
    return res.status(500).json({ ok: false });
  }
};
