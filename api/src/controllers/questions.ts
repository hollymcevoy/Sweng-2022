import { NextFunction, Request, Response } from 'express';


// Arrow function () =>{} returns a response object with a status code and a message.
// The response object is what we used to send back some data to the client.
export let postQuestions = (req: Request, res: Response, next: NextFunction) => {
    try{
        const docID = req.body.docID
        if (!docID) {
            return res.status(404).send("docID does not exist")
        }
        const questionText = req.body.questionText
        if (!questionText) {
            return res.status(404).send("questionText does not exist")
        }
        if (questionText.len() > 100) {
            return res.status(500).send("questionText is too long")
        }

        return res.status(201).send(`A question for documentID ${docID}: ${questionText}`)

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
