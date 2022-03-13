import React, {useState} from 'react';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from "nanoid";
import axios from 'axios';

const AddQuestion = () => {

    const url = "";

    const [data,setData] = useState({
        question: "",
        answer: "",
        docID: ""
        
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
            docID: data.docID
        })
        .then(res=>{
            console.log(res.data)
        })
    }

    return(
        <div>
                <h2>Add a Question Below</h2>
                <form onSubmit={handleAddFormSubmit} className = "EditForm">
                    <input 
                        className = "EditInputs"
                        type = "text" 
                        id="question"
                        required="required" 
                        placeholder="Question..."
                        onChange={(e)=>handleAddFormChange(e)}
                        value ={data.question}

                    />
                    <input 
                        type = "text" 
                        id="answer"
                        required="required" 
                        placeholder="Answer..."
                        onChange={(e)=>handleAddFormChange(e)}
                        value ={data.answer}

                    />
                    <input 
                        type = "text" 
                        id="docID"
                        required="required" 
                        placeholder="Document ID..."
                        onChange={handleAddFormChange}
                        value ={data.docID}

                    />
                    <button type="submit">Add</button> 
                </form>
            </div>   
    );
};

export default AddQuestion;










