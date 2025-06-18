import mongoose, { Schema } from "mongoose";

const taskSchema: Schema = new mongoose.Schema({
  description: String,
  status: String,
  priority: String,
  assignees: Array,
  comments: Number,
  attachments: Number,
  title: String,
  progress: Number,
  date: String,
  userId: mongoose.Schema.Types.ObjectId,
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
