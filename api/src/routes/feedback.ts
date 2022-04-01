// Import all request respsonse handlers from the controllers folder.
import * as feedbackController from '../controllers/feedback';
import { authMiddleware } from '../utilities/auth0';
// Export a class that has a property for request handlers. 
export class FeedbackRoute{
    public routes(app):void{
    // Here the request is a GET request, but can be expanded to include other request types.
      app.route('/v1/feedback').post(
        feedbackController.addFeedback
      )
    }
  }