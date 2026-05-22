import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middleware/globalErrorhadler.js';

const app : Application = express();
app.use (cookieParser())
app.use(express.json())

app.get('/', (req : Request, res : Response) => {
  res.status(200).json ({
    "message": "welcome to my API"
  })
})


app.use(globalErrorHandler)
export default app;