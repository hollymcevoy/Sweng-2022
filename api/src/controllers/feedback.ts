import { NextFunction, Request, Response } from 'express';
import { APILogger } from '../utilities/logger';
import fetch from 'node-fetch';

export let addFeedback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const qnaId = req.body.qnaId
        const userId = req.body.userId
        const question = req.body.question
        const feedbackResponse = await fetch(`https://sweng-cog.cognitiveservices.azure.com:443/language/query-knowledgebases/projects/SwengQNA/feedback?api-version=2021-10-01`, {
            method: 'POST',
            headers: {
                'OCP-APIM-Subscription-Key': process.env.AZURE_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([
                {
                    "userId": userId,
                    "userQuestion": question,
                    "qnaId": qnaId,
                },
                ]
            )
        })
        
        if (feedbackResponse.status === 404) {
            return res.status(404).send(`Error: ${feedbackResponse.error.details}`)
        }
        return res.status(204).send(feedbackResponse)
    }
    catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}