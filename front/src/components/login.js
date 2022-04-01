import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class login extends Component {
  render() {
    return (
      <form>
        <h3>Sign In</h3>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <div>
          <ul className=" navbar-nav ml-auto forgot-password">
            <li className="text-right">
              {" "}
              Forgot <a href="#">password?</a>{" "}
            </li>
          </ul>
        </div>
        <p></p>
        <Link to={"/sign-up"}>
          <button type="submit" className="btn btn-primary btn-block">
            Not a User? Join Now It's Free!
          </button>
        </Link>
      </form>
    );
  }
}
