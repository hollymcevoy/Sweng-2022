import { NextFunction, Request, Response } from 'express';


// Arrow function () =>{} returns a response object with a status code and a message.
// The response object is what we used to send back some data to the client.
export let postQuestions = (req: Request, res: Response, next: NextFunction) => {
    try{
        return res.status(201).send("Added Document")
    }catch(error){
        return res.status(500).send(error)
    }
}
// export let getQuestions = (req: Request, res: Response, next: NextFunction) => {
//     try{
//         return res.status(200).send("Returned Documents")
//     }catch(error){
//         return res.status(500).send(error)
//     }
// }
// export let updateQuestions = (req: Request, res: Response, next: NextFunction) => {
//     try{
//         return res.status(201).send("Updated Documents")
//     }catch(error){
//         return res.status(500).send(error)
//     }
// }
// export let deleteQuestions = (req: Request, res: Response, next: NextFunction) => {
//     try{
//         return res.status(204).send("Deleted Documents")
//     }catch(error){
//         return res.status(500).send(error)
//     }
// }
// export let getQuestion = (req: Request, res: Response, next: NextFunction) => {
//     try{
//         return res.status(200).send("Returned Document")
//     }catch(error){
//         return res.status(500).send(error)
//     }
// }
