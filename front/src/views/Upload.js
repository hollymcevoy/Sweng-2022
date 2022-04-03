import NavBar from '../components/TheNavbar';
import { Grid, Box, Card, CardContent, CardActions, Button, Typography, CardActionArea } from '@mui/material';
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
      <NavBar />
      {/* <form onSubmit={handleSubmit}>
          <p className="App-Page-Header">Please select  a file to upload</p>
          <input type="file" onChange={handleChange}/>
          <p></p>
          <button className="App-Button" type="submit">Upload</button>
      </form> */}
      {/* Grid that is centered vertically and horizontally */}
      <Grid container  alignItems="center" style={{marginTop: "10vh"}}>
        {/* Box that is centered vertically and horizontally and takes up 6 cols */}
        <Box m="auto" >
          {/* Card with click action  */}
          <CardActionArea onClick={handleChange}>
            {/* An input that is the same size as the parent */}
          
          <Card elevation={0} style={{height: "50vh", width: "50vw", border: "3px dashed grey"}}>
            
              <CardContent>
                <Typography variant="h5" component="h2">
                  Upload
                </Typography>
                <input type="file" onChange={handleChange}/>
              </CardContent>
          </Card>
          </CardActionArea>
        </Box>
      </ Grid>
    </div>
  );
}

export default Upload;
