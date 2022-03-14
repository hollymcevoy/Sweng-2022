import { NextFunction, Request, Response } from 'express';
import {APILogger} from '../utilities/logger';
import * as bb from 'busboy'
import fetch from 'node-fetch';
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
export let getDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const documentName = req.params.documentId
        const api_key = process.env.AZURE_KEY;
        const azureData = await fetch(`https://sweng-cog.cognitiveservices.azure.com/language/query-knowledgebases/projects/SwengQNA/sources?api-version=2021-10-01`, {
            method: 'GET',
            headers: {
                'OCP-APIM-Subscription-Key': api_key,
                'Content-Type': 'application/json', 
            }
        })
        const azureDataJson = await azureData.json();
        if(azureData.status === 200){
            return res.status(200).send(azureDataJson)
        }else{
            return res.status(404).send('Not Found')
        }
    }catch(error){
        APILogger.logger.info(`${error}`)
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
