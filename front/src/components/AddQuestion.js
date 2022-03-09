import React, {useState} from 'react';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import mockquestions from "../mockquestions.json"
import { nanoid } from "nanoid";
import axios from 'axios';

const AddQuestion = () => {

    const url = "";

    const [data,setData] = useState({
        question: "",
        answer: "",
        confidenceScore: "",
        documentID: ""
        
    })

    const handleAddFormChange = (e) => {
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
      };

    const handleAddFormSubmit = (e) => {
        console.log("submitted")
        e.preventDefault();
        axios.post(url,{
            question: data.question,
            answer: data.question,
            confidenceScore: data.confidenceScore,
            documentID: data.documentID
        })
        .then(res=>{
            console.log(res.data)
        })
    }

    return(
        <div>
                <h2>Add a Question Below</h2>
                <form onSubmit={handleAddFormSubmit}>
                    <input 
                        type = "text" 
                        id="question"
                        required="required" 
                        placeholder="Enter a question..."
                        onChange={(e)=>handleAddFormChange(e)}
                        value ={data.question}

                    />
                    <input 
                        type = "text" 
                        id="answer"
                        required="required" 
                        placeholder="Enter the answer..."
                        onChange={(e)=>handleAddFormChange(e)}
                        value ={data.answer}

                    />
                    <input 
                        type = "text" 
                        id="confidenceScore"
                        required="required" 
                        placeholder="Enter the answer..."
                        onChange={(e)=>handleAddFormChange(e)}
                        value ={data.confidenceScore}

                    />
                    <input 
                        type = "text" 
                        id="documentID"
                        required="required" 
                        placeholder="Enter the answer..."
                        onChange={handleAddFormChange}
                        value ={data.documentID}

                    />
                    <button type="submit">Add</button> 
                </form>
            </div>   
    );
};

export default AddQuestion;









