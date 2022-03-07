import { NextFunction, Request, Response } from 'express';
import {APILogger} from '../utilities/logger';
import * as bb from 'busboy'
// Arrow function () =>{} returns a response object with a status code and a message.
// The response object is what we used to send back some data to the client.
export let postDocument = (req: Request, res: Response, next: NextFunction) => {
    try{
        return res.status(201).send("Added Document")
    }catch(error){
        return res.status(500).send(error)
    }
}
export let getDocument = (req: Request, res: Response, next: NextFunction) => {
    try{
        return res.status(200).send("Returned Document")
    }catch(error){
        return res.status(500).send(error)
    }
}
export let postDocuments = (req: Request, res: Response, next: NextFunction) => {
    try{
        
        const busboy = bb({headers: req.headers});
        console.log(busboy)
        let DataFile = '';
        // parse the multipart/form-data using busboy for typescript 
        busboy.on('file', (name, file, info) => {
            const {filename, encoding, mimeType} = info;
            console.log(`File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
            filename,
            encoding,
            mimeType
            );
            DataFile = filename
            file.on('data', (data) => {
                console.log(`File [${name}] got ${data.length} bytes`);
            }).on('close', () => {
                console.log(`File [${name}] closed`);
            })
        });
        busboy.on('finish', () => {
            console.log('Done parsing form!');
            return res.status(201).send(`Added ${DataFile}`)
        });
        return req.pipe(busboy); 
    }catch(error){
        return res.status(500).send(error)
    }
}
export let getDocuments = (req: Request, res: Response, next: NextFunction) => {
    try{
        const dummyData = [
            {
                "id": "1",
                "name": "Computer science prospectus",
                "description": "This is the prospectus for the Computer Science course.",
                "createdAt": "2019-01-01T00:00:00.000Z",
                "updatedAt": "2019-01-01T00:00:00.000Z"
            },
            {
                "id": "2",
                "name": "Computer science and business prospectus",
                "description": "This is the prospectus for the Computer Science and Business course.",
                "createdAt": "2019-01-01T00:00:00.000Z",
                "updatedAt": "2019-01-01T00:00:00.000Z"
            },
            {
                "id": "3",
                "name": "Engineering prospectus",
                "description": "This is the prospectus for the Engineering course.",
                "createdAt": "2019-01-01T00:00:00.000Z",
                "updatedAt": "2019-01-01T00:00:00.000Z"
            }
        ]
        const documentId = req.params.documentId
        if (documentId) {
            const document = dummyData.find(document => document.id === documentId)
            if (document) {
                return res.status(200).send(document)
            } else {
                return res.status(404).send(`Document with id ${documentId} does not exist`)
            }
        } else {
            return res.status(200).send(dummyData)
        }
    }catch(error){
        return res.status(500).send(error)
    }
}
export let updateDocuments = (req: Request, res: Response, next: NextFunction) => {
    try{
        return res.status(201).send("Updated Documents")
    }catch(error){
        return res.status(500).send(error)
    } 
}
export let deleteDocuments = (req: Request, res: Response, next: NextFunction) => {
    try{
        return res.status(204).send("Deleted Documents")
    }catch(error){
        return res.status(500).send(error)
    } 
}
