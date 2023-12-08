import express, { Application, Response, Request } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user.route';
const app: Application = express();

//adding parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
