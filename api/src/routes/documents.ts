import * as documentsController from '../controllers/documents';

// Export a class that has a property for request handlers. 
export class DocumentRoute{
    public routes(app):void{
    // Here the request is a GET request, but can be expanded to include other request types.
      app.route('/v1/documents').post(documentsController.postDocuments)
      app.route('/v1/documents').get(documentsController.getDocuments)
      app.route('/v1/documents').patch(documentsController.updateDocuments)
      app.route('/v1/documents').delete(documentsController.deleteDocuments)
      app.route('/v1/document/:id').get(documentsController.getDocument)
      app.route('/v1/document/:id').post(documentsController.postDocument)
        
    }
}
