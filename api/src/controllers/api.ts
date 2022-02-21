// Import the Next, Request and Response objects from express [ eg request object has properties such as body, query, params, etc. ]
import { NextFunction, Request, Response } from 'express';


// Arrow function () =>{} returns a response object with a status code and a message.
// The response object is what we used to send back some data to the client.
export let getApi = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({title:'QnA API', version:'0.1.0'});
}