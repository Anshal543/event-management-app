import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("./public"))
app.use(cookieParser())

// import routes
import userRouter from "./routes/user.route.js"
import eventRouter from "./routes/event.route.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/events", eventRouter)

app.use((err, req, res, next) => {
    // 
    const statusCode = err.statusCode || 501;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: "false",
        message,
        statusCode
    })

})


//http://localhost:8080/api/v1/users
//http://localhost:8080/api/v1/events



app.get("/", (req, res) => {
    res.send("Hello World")
})



export { app }