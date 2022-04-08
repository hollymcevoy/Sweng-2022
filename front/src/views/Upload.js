import NavBar from '../components/TheNavbar';
import { Grid, Box, Card, CardContent, TextField, Button, Typography, CardActionArea } from '@mui/material';
import React, {useState} from 'react';
import axios from 'axios';



function Upload() {

  
  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const url = 'https://sweng-api-node.azurewebsites.net/v1/documents';
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
      <Grid container  alignItems="center" style={{marginTop: "10vh"}}>
        <Box m="auto" >
          <CardActionArea onClick={handleChange}>
          <Card elevation={0} style={{height: "20vh", width: "20vw", border: "3px dashed grey"}}>
            
              <CardContent>
                <Typography variant="h5" component="h2">
                  Upload
                </Typography>
                <input type="file" onChange={handleChange}/>
              </CardContent>
          </Card>
          </CardActionArea>
          <Button onClick={handleSubmit} variant="outlined" style={{ marginTop: "1vh" }}>Add file</Button>
        </Box>
        <Box m="auto" >
          
          <Card elevation={0} style={{height: "20vh", width: "20vw", border: "3px solid grey"}}>
              <CardContent>
                <Typography variant="h5" component="h2">
                 Paste Url
                </Typography>
                <TextField id="outlined-basic" label="Add a URL to a page" variant="outlined" />
              </CardContent>
          </Card>
          <Button onClick={handleSubmit} variant="outlined" style={{ marginTop: "1vh" }}>Add Url</Button>
        </Box>
        
      </ Grid>
    </div>
  );
}

export default Upload;
