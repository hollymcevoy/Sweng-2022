import { NextFunction, Request, Response } from 'express';
import { APILogger } from '../utilities/logger';
import fetch from 'node-fetch';

// Arrow function () =>{} returns a response object with a status code and a message.
// The response object is what we used to send back some data to the client.
export let postQuestions = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const question = req.body.question
        const docName = req.body.docName

        const api_key = process.env.AZURE_KEY;
        const azureData = await fetch(`https://sweng-cog.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=${docName}&api-version=2021-10-01`, {
            method: 'POST',
            headers: {
                'OCP-APIM-Subscription-Key': api_key,
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                "question": question,
                "top": 3,
            })
        })
        const azureDataJson = await azureData.json();
        if (azureData.status === 404) {
            return res.status(404).send(`Error: ${azureDataJson.error.message}`)
        }
        return res.status(200).send(azureDataJson)

    }catch(error){
        APILogger.logger.info(error)
        return res.status(500).send(error)
    }
}
