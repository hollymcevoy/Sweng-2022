import NavbarComp from '../components/NavbarComp';
import QnAAccordion from '../components/QnAAccordion';
import Button from 'react-bootstrap/Button';
import AddQuestion from '../components/AddQuestion';

function QnAKB() {
  return (
    <div>
      
      <NavbarComp />
      <p className="App-Page-Header">Questions and Answers</p>
      <QnAAccordion />
      <Button className="App-Button"  href="/">Edit</Button>
      <AddQuestion />
    </div>
  );
}

export default QnAKB;
