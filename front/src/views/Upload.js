import NavBar from '../components/TheNavbar';
import { Grid, Box, Card, CardContent, TextField, Button, Typography, CardActionArea } from '@mui/material';
import React, {useState} from 'react';
import axios from 'axios';



function Upload() {

  // state for some url
  const [url, setUrl] = useState('');
  
  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  function handleUrl() {
    const config = {
      content: 'application/json',
      data: {
        url: url
      }
    }
    axios.post(url, config)

  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const url = 'https://sweng-api-node.azurewebsites.net/v1/documents/storage';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.post(url, formData, config).then(async (res) => { 
      const kb_url = 'https://sweng-api-node.azurewebsites.net/v1/documents/knowledgebase'
      const kbconfig = {
        content: 'application/json',
        data: {
          originalname: res.data.originalname,
          storageUrl: res.data.storageUrl
        }  
      }
      const data = await axios.post(kb_url, kbconfig)
      console.log(data)
    })
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
                <TextField 
                id="outlined-basic"
                label="Add a URL to a page"
                variant="outlined"
                onChange={(e) => setUrl(e.target.value)}
                
                />
              </CardContent>
          </Card>
          {/* Bind to the inputed text in teh text field and send to a method*/}
          <Button onClick={() => handleUrl()} variant="outlined" style={{ marginTop: "1vh" }}>Add url</Button>

        </Box>
        
      </ Grid>
    </div>
  );
}

export default Upload;
