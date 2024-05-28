import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// import routes
import userRouter from "./routes/user.route.js"

app.use("/api/v1/users", userRouter)

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


// router declaration
// app.use("/api/v1/users", userRouter)

//http://localhost:3000/api/v1/users/register



app.get("/", (req, res) => {
    res.send("Hello World")
})



export { app }