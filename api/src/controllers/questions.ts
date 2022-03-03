import { NextFunction, Request, Response } from 'express';


// Arrow function () =>{} returns a response object with a status code and a message.
// The response object is what we used to send back some data to the client.
export let postQuestions = (req: Request, res: Response, next: NextFunction) => {
    try{
        return res.status(201).send()
    }catch(error){
        return res.status(500).send(error)
    }
}