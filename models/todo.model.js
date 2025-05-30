import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  priority: { type: String, required: true },
  deadline: { type: String, required: true },
});

// Export the model (reuse if already compiled)
const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

export default Todo;