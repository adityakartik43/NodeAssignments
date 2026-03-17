import express from "express";
import cors from "cors";
import userRouter from './routes/users.routes.js'
import dashboardRouter from './routes/dashboard.routes.js'

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/dashboard", dashboardRouter);


export default app;