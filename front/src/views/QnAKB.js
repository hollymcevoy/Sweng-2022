import NavbarComp from '../components/NavbarComp';
import QnAAccordion from '../components/QnAAccordion';
import Button from 'react-bootstrap/Button';

function QnAKB() {
  return (
    <div>
      
      <NavbarComp />
      <p className="App-Page-Header">Questions and Answers</p>
      <Button className="Edit"  href="/">Edit</Button> {' '}
      <QnAAccordion />
      
    </div>
  );
}

export default QnAKB;
