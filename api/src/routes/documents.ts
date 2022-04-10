import { auth } from 'express-oauth2-jwt-bearer';
import * as documentsController from '../controllers/documents';
import { authMiddleware } from '../utilities/auth0';
let multer = require("multer");
let  storage = multer.memoryStorage();
let upload = multer({ storage: storage });
// Export a class that has a property for request handlers. 
export class DocumentRoute{
    public routes(app):void{
    // Here the request is a GET request, but can be expanded to include other request types.
      app.route('/v1/documents').post(
        documentsController.postDocuments
      )
      app.route('/v1/documents').get(
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
      
      app.route('/v1/documents/:id/status').get(
        authMiddleware,
        documentsController.getDocumentStatus
      )
      app.route('/v1/documents/url').post(
        documentsController.postUrl
      )
      app.route('/v1/documents/storage').post(
        upload.single('file'),
        documentsController.postFile
      )
      app.route('/v1/documents/knowledgebase').post(
        documentsController.addFileToKB
      )
      app.route('/v1/documents/qnas').get(
        documentsController.getQnas
      )
    }
}
