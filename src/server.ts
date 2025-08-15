import express, { Request, Response } from "express";
import cors from "cors";

interface EventsMap {
  [date: string]: string;
}

const app = express();
app.use(cors({
  origin: "*", // or your frontend URL for more security
  methods: ["GET", "POST"],
}));
app.use(express.json());

let events: EventsMap = {};

// Get all events
app.get("/events", (req: Request, res: Response) => {
  res.json(events);
});

// Save or update event
app.post("/events", (req: Request, res: Response) => {
  const { date, name } = req.body as { date: string; name: string };
  if (!date || !name) {
    return res.status(400).json({ error: "date and name are required" });
  }
  events[date] = name;
  res.json({ success: true });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
