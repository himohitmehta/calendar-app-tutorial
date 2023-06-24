import dbConnect from "utils/mongoDbConnect";
import {
  getEvents,
  createEvent,
  deleteEvent,
} from "backend/controllers/eventController";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      await getEvents(req, res);
      break;
    case "POST":
      await createEvent(req, res);
      break;
    case "DELETE":
      await deleteEvent(req, res);
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
