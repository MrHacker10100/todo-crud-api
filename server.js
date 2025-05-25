import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDb from "./database/db.js";
import Todo from "./models/todo.model.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = [
  'http://localhost:5173',
  'https://mrhacker10100.github.io'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

connectToDb();

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Server is Actives",
  });
});

app.get("/todos", async (req, res) => {
  try {
    const result = await Todo.find();
    res.send({
      success: true,
      message: "Todo List Retrive Successfully",
      data: result,
    });
  } catch {
    res.send({
      success: false,
      message: "Failed to Retrive Todo List",
    });
  }
});

app.post("/create-todo", async (req, res) => {
  const todoDetails = req.body;
  try {
    const result = await Todo.create(todoDetails);
    res.send({
      success: true,
      message: "todo is created Successfully",
      data: result
    });
  } catch {
    res.send({
      success: false,
      message: "failed to create todo",
    });
  }
});

app.get("/:todoId",async (req,res)=>{
    const todoId = req.params.todoId;
    try{
        const result = await Todo.findById(todoId);

        res.send({
            success:true,
            message:"todo Retrive successfully",
            data:result,
        })
    }catch{
        res.send({
            success:false,
            message:"todo Retrive Failed",
        })
    }
})



app.delete("/:todoId",async (req,res)=>{
    const todoId = req.params.todoId;
    try{
        const result = await Todo.findByIdAndDelete(todoId);

        res.send({
            success:true,
            message:"todo Delete successfully",
            data:result,
        })
    }catch{
        res.send({
            success:false,
            message:"todo Delete Failed",
        })
    }
})


app.patch("/update/:todoId",async (req,res)=>{
    const todoId = req.params.todoId;
    const updateTodo = req.body
    try{
        const result = await Todo.findByIdAndUpdate(todoId, updateTodo , {
            new:true,
        });

        res.send({
            success:true,
            message:"todo Delete successfully",
            data:result,
        })
    }catch{
        res.send({
            success:false,
            message:"todo Delete Failed",
        })
    }
})


app.listen(port, () => {
  console.log(`Server Started Successfully on Port ${port}`);
});
