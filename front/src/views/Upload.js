import NavbarComp from '../components/NavbarComp';

import React, {useState} from 'react';
import axios from 'axios';



function Upload() {

  
  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:3000/v1/documents';
    const formData = new FormData();

    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        
      },
    };
    axios.post(url, formData, config).then((response) => {console.log(response.data);});

  }

  return (
    <div>
      <NavbarComp />
      <form onSubmit={handleSubmit}>
          <p className="App-Page-Header">Please select  a file to upload</p>
          <input type="file" onChange={handleChange}/>
          <p></p>
          <button className="App-Button" type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
