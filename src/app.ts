import express, { Application, Response, Request } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';
import notFound from './error-handling/not-found';
const app: Application = express();

//adding parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api', userRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
//not found route
app.use(notFound);

export default app;
