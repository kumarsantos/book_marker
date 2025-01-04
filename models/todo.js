import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Removes unnecessary spaces
    },
    completed: {
      type: Boolean,
      default: false, // Default value is false
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set creation date
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Check if the model already exists, reuse it; otherwise, create it
const Todo = mongoose.models["todo"] || mongoose.model("todo", todoSchema);

export default Todo;
