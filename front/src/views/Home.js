import NavBar from '../components/TheNavbar';
import { Grid, Box, Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import * as React from 'react';
import Footer from '../components/TheFooter';
function Home() {
  // const that we can store some text in
  // array with different objects with their titles and text
  const [text, setText] = React.useState([
    {
      title: 'Upload',
      text: 'Admins can upload documents to the knowledge base. Documents can then be referenced by the chat bot.',
      prompt: 'Upload a document',
      link: 'upload',
    },
    {
      title: 'ChatBot',
      text: 'The chat bot can be used to interact with the knowledge base. Aks questions about some aspect of the knowledge base and the chat bot will try respond with the answer.',
      prompt: 'Ask a question',
      link: 'chatbot',
    },
    {
      title: 'Documents',
      text: 'View and search through the documents in the knowledge base.',
      prompt: 'View documents',
      link: 'documents',
    },
  ]);


  return (
    <div>
      <NavBar />
      <Grid spacing={2} container  justify="center" style={{marginTop: "10vh"}} >
        {text.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} align="left" >
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {item.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {item.text}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" href={`/${item.link}`}>
                  {item.prompt}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </div>
  );
}

export default Home;
