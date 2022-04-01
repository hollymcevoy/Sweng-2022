// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";

const botName = 'SwengBot';
const config = {  
    initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
    botName: botName,  
    customStyles: {    
        botMessageBox: {      
            backgroundColor: '#efefef',    
        },    
        chatButton: {      
            backgroundColor: '#5ccc9d',    
        },  
    },
};

export default config