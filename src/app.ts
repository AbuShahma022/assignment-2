import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middleware/globalErrorhadler.js';
import { authRouter } from './modules/auth/auth.route.js';
import { issueRouter } from './modules/Issues/issue.route.js';

const app : Application = express();
app.use (cookieParser())
app.use(express.json())
app.use (cors({
    origin: "*",
}))

app.get('/', (req : Request, res : Response) => {
  res.status(200).json ({
    "message": "welcome to my assignment-2 API"
  })
})

app.use("/api",authRouter)
app.use("/api",issueRouter)


app.use(globalErrorHandler)
export default app;