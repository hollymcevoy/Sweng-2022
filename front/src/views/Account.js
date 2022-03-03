import NavbarComp from "../components/NavbarComp";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default Account;
