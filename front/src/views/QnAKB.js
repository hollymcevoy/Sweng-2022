import NavbarComp from '../components/NavbarComp';
import QnAAccordion from '../components/QnAAccordion';
import Button from 'react-bootstrap/Button';

function QnAKB() {
  return (
    <div>
      
      <NavbarComp />
      <p className="App-Page-Header">Questions and Answers</p>
      <QnAAccordion />
      <Button className="App-Button"  href="/editknowledgebase">Add a Question</Button>
    </div>
  );
}

export default QnAKB;
