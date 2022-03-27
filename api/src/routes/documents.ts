import * as documentsController from '../controllers/documents';
import { authMiddleware } from '../utilities/auth0';
// Export a class that has a property for request handlers. 
export class DocumentRoute{
    public routes(app):void{
    // Here the request is a GET request, but can be expanded to include other request types.
      app.route('/v1/documents').post(
        authMiddleware,
        documentsController.postDocuments
      )
      app.route('/v1/documents').get(
        authMiddleware,
        documentsController.getDocuments
      )
      app.route('/v1/documents/:id').patch(
        authMiddleware,
        documentsController.updateDocuments
      )
      app.route('/v1/documents/:id').delete(
        authMiddleware,
        documentsController.deleteDocuments
      )
      app.route('/v1/documents/:id').get(
        authMiddleware,
        documentsController.getDocument
      ) 
    }
}
