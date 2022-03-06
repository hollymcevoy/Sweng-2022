import NavbarComp from '../components/NavbarComp';
import ChatbotComp from '../components/Chatbot';

function Chatbot() {
  return (
    <div>
      <NavbarComp />

      <p className="App-Page-Header">Chatbot</p>
      <ChatbotComp />
      

    </div>
  );
}

export default Chatbot;
