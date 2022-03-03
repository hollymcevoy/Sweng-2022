import * as documentsController from '../controllers/documents';

// Export a class that has a property for request handlers. 
export class DocumentRoute{
    public routes(app):void{
    // Here the request is a GET request, but can be expanded to include other request types.
      app.route('/v1/documents').post(documentsController.postDocuments)
      app.route('/v1/documents').get(documentsController.getDocuments)
      app.route('/v1/documents/:id').patch(documentsController.updateDocuments)
      app.route('/v1/documents/:id').delete(documentsController.deleteDocuments)
      app.route('/v1/documents/:id').get(documentsController.getDocument)
        
    }
}
