import express, { Application, Response, Request } from 'express';
import cors from 'cors';
const app: Application = express();

//adding parser
app.use(express.json());
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
