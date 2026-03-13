import express from "express"
import q1router from "./src/routes/q1.routes.js"
import q2router from "./src/routes/q2.routes.js"
import cors from "cors"

const app = express();
const port = process.env.PORT || 6500;
app.use(express.json());
app.use(cors())

app.use("/api/users", q1router)
app.use("/api/students", q2router)

app.listen(port, ()=> {
    console.log(`Server is running on ${port}`)
})