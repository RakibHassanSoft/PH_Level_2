import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();


//parser
app.use(express.json());
app.use(cors());

//api/v1/students/create-student

//application routes
app.use('/api/v1/',router);


app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(`Hello World! ${a}`);
});

//global error handler
app.use(globalErrorHandler);


// Fallback for undefined routes
app.use(notFound);


export default app;
