// We import an instance of the class object here. 
import app from './app';

// Assign port from .env file or default to 3000 (Will add environment variable setups later)
const PORT: number = Number(process.env.PORT) || 3000;
 
// Pass a port and a function and the app class recieves a http.Server object as a callback function.
app.listen(PORT, () => {
    console.log(`QnA API Server running on port: ${PORT}`);
});


