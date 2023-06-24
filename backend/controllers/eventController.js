import Event from "../models/eventModel";
import mongoose from "mongoose";

// get all Events
const getEvents = async (req, res) => {
  const events = await Event.find({}).sort({ createdAt: -1 });

  res.status(200).json(events);
};

// get a single Event
const getEvent = async (req, res) => {
  const {
    query: { id },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Event" });
  }

  const event = await Event.findById(id);

  if (!event) {
    return res.status(404).json({ error: "No such Event" });
  }

  res.status(200).json(event);
};

// create a new Event
const createEvent = async (req, res) => {
  const { title } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const event = await Event.create({
      ...req.body,
    });
    res.status(200).json({ result: event, status: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Event
const deleteEvent = async (req, res) => {
  const { id } = req.body;

  // console.log({ body: req.body, id: req.body.id });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Something is wrong",
    });
  }

  const event = await Event.findOneAndDelete({ _id: id });

  if (!event) {
    return res.status(400).json({ error: "No such Event" });
  }

  res.status(200).json(event);
};

// update a Event
const updateEvent = async (req, res) => {
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Event" });
  }

  const event = await Event.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!event) {
    return res.status(400).json({ error: "No such Event" });
  }

  res.status(200).json(event);
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
};
