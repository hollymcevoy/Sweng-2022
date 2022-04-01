import NavbarComp from "../components/NavbarComp";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "../components/login";
import SignUp from "../components/signUpComponent";
import Button from "react-bootstrap/esm/Button";
function Account() {
  return (
    <Router>
      <div>
        <NavbarComp />
      </div>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Link to={"/sign-in"}><Button>Click</Button></Link>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/sign-in" element={<Login/>} />
              <Route path="/sign-up" element={<SignUp/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default Account;
