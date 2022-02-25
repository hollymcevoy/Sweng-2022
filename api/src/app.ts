// import everything from the core express libraries

import * as express from 'express';

import { APIRoute } from './routes/api';

// The App class is configured here and an instance of the object class is exported to be used by the main server.ts file.  
class App {
    // We define two properties of the class with type annotations of the express.application object type and a number for the port.
    public app: express.Application;
    public port: number;
    public apiRoutes: APIRoute = new APIRoute();
    
    // Assign the app property to an instance of the express.application object type.
    constructor() {
        this.app = express();
        this.apiRoutes.routes(this.app);
        // Middleware function that has access to incoming requests and outgoing responses. Parses them as JSON.
        this.app.use(express.json());
    }
}
// Exports an instance of this class to be used in the main server.ts file.
export default new App().app;