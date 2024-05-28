import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app }from "./app.js";

dotenv.config({ path: "./.env" });

connectDB()
.then(()=>{
    app.on("error", (error) => {
        console.error("ERROR", error);
        throw error;
    })
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("mongodb connection failed", error);
})