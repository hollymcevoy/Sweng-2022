// import everything from the core express libraries
import * as bodyParser from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import * as express from 'express';

import { DocumentRoute } from './routes/documents';
import { QuestionsRoute } from './routes/questions';
import { FeedbackRoute } from './routes/feedback';
import { IndexRoute } from './routes/index';

// The App class is configured here and an instance of the object class is exported to be used by the main server.ts file.  
class App {
    // We define two properties of the class with type annotations of the express.application object type and a number for the port.
    public app: express.Application;
    public port: number;
    public indexRoute: IndexRoute = new IndexRoute();
    public documentRoute: DocumentRoute = new DocumentRoute();
    public questionsRoute: QuestionsRoute = new QuestionsRoute();
    public feedbackRoute: FeedbackRoute = new FeedbackRoute();
    
    // Assign the app property to an instance of the express.application object type.
    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.indexRoute.routes(this.app);
        this.documentRoute.routes(this.app)
        this.questionsRoute.routes(this.app)
        this.feedbackRoute.routes(this.app)
        // Middleware function that has access to incoming requests and outgoing responses. Parses them as JSON.
        this.app.use(express.json());
        this.app.use(
            expressWinston.logger({
                transports: [new winston.transports.Console()],
            })
        );
    }
}
// Exports an instance of this class to be used in the main server.ts file.
export default new App().app;