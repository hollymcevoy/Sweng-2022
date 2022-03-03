import { NextFunction, Request, Response } from 'express';


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
        return res.status(201).send("Added Documents")
    }catch(error){
        return res.status(500).send(error)
    }
}
export let getDocuments = (req: Request, res: Response, next: NextFunction) => {
    try{
        return res.status(200).send("Returned Documents")
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
