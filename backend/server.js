require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const notesRoutes = require("./routes/notes");
const userRoutes = require("./routes/user");

// Define express app
const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for any request
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// Middleware for handling CORS Policy
app.use(
    cors({
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

// Routes
app.use("/api/notes", notesRoutes);
app.use("/api/user", userRoutes);

// Connect to db and listen to port
mongoose.connect(process.env.MONGO_URI, {dbName: "mern-notes"})
    .then(() => {
        console.log("connected to db")

        app.listen(process.env.PORT, () => {
            console.log("listening on port ", process.env.PORT)
        })        
    })
    .catch((error) => {
        console.log(error)
    })

