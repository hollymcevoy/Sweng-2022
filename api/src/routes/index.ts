import * as cors from 'cors';
import * as dotenv from 'dotenv';

import { Request, Response } from 'express';

dotenv.config({ path: '.env' });

const corsOptions = {
    origin: true 
  }
export class IndexRoute {
    public routes(app): void {
    // router is passed app and can use cors middleware
        app.use(cors(corsOptions))
        app.route('/index').get((req: Request, res: Response) => {
            res.status(200).send({ status: 'success' })
    }) 
  }}