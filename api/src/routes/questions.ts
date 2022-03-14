// Import all request respsonse handlers from the controllers folder.
import * as questionsController from '../controllers/questions';

// Export a class that has a property for request handlers. 
export class QuestionsRoute{
    public routes(app):void{
    // Here the request is a GET request, but can be expanded to include other request types.
      app.route('/v1/questions').post(questionsController.postQuestions)
    }
  }