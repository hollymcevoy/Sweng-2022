// Import all request respsonse handlers from the controllers folder.
import * as apiController from '../controllers/api';

// Export a class that has a property for request handlers. 
export class APIRoute{
    public routes(app):void{
    // Here the request is a GET request, but can be expanded to include other request types.
      app.route('/api').get(apiController.getApi)
    }
  }