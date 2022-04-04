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
export let getDocumentStatus = async (req: Request, res: Response, next: NextFunction) => {
    try{ 
        const docId = req.params.id
        const api_key = process.env.AZURE_KEY;
        const azureData = await fetch(`https://sweng-cog.cognitiveservices.azure.com:443/language/query-knowledgebases/projects/SwengQNA/sources/jobs/${docId}?api-version=2021-10-01`, {
            method: 'GET',
            headers: {
                'OCP-APIM-Subscription-Key': api_key,
                'Content-Type': 'application/json', 
            },
        })
        const azureDataJson = await azureData.json();
        if (azureData.status === 404) {
            return res.status(404).send(`Error: ${azureDataJson.error.message}`)
        }
        return res.status(200).send(azureDataJson)
    }catch(error){
        return res.status(500).send(error)
    }
}
export let postDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // add file type and size filter
        // needs improvements
        const fileName = req.body.fileName
        const fileSize = req.body.fileSize
        const fileUrl = req.body.fileUrl
        // if (!(fileName.endsWith('.tsv') || fileName.endsWith('.pdf') || fileName.endsWith('.txt') || fileName.endsWith('.docx') || fileName.endsWith('.xlsx'))) {
        //     return res.status(500).send("File type is not accepted")
        // }
        // if (fileSize > 1024) {
        //     return res.status(500).send("File length is too long")
        // }

        const busboy = bb({headers: req.headers});
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
        });
        const documentName = req.params.documentId
        const api_key = process.env.AZURE_KEY;
        const azureData = await fetch(`https://sweng-cog.cognitiveservices.azure.com/language/query-knowledgebases/projects/SwengQNA/sources?api-version=2021-10-01`, {
            method: 'PATCH',
            headers: {
                'OCP-APIM-Subscription-Key': api_key,
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(
                [
                    {
                        "op": "add",
                        "value": {
                            "displayName": documentName,
                            "sourceUri": fileUrl,
                            "sourceKind": "url"
                        } 
                    }
                ]
            ) 
                
        })
        if(azureData.status == 202){
            console.log(azureData.headers)
            return res.status(200).send("Added Document")
        }
        else{
            console.log(azureData)
            return res.status(500).send(azureData.error)
        }
    }catch(error){
        console.log(error)
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
        }else if(azureData.status === 404){
            console.log(azureDataJson)
            return res.status(404).send('Not Found')
        }
        else if(azureData.status === 401){
            console.log(azureDataJson)
            return res.status(500).send('Internal Server Error')
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
