import React from "react";
import { Navigate } from "react-router-dom";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.auth = props.auth;
    this.state = {
      isLoggedIn: false, // State to manage redirection
      isSignup: false,   // State to toggle between Login and Signup
    };
  }

  handleGoogle = () => {
    this.auth.google().then(() => {
      this.setState({ isLoggedIn: true });
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements["email"].value;
    const password = event.target.elements["password"].value;

    if (this.state.isSignup) {
      // Handle Signup (Create Account)
      this.auth.signup(email, password).then(() => {
        this.setState({ isLoggedIn: true });
      });
    } else {
      // Handle Login
      this.auth.login(email, password).then(() => {
        this.setState({ isLoggedIn: true });
      });
    }
  };

  toggleSignup = () => {
    this.setState({ isSignup: !this.state.isSignup });
  };

  componentDidMount() {
    this.auth.checkLogin().then((loggedIn) => {
      if (loggedIn) {
        this.setState({ isLoggedIn: true });
      }
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Navigate to="/" />;
    }

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="email" placeholder="Email" id="email" />
          <input type="password" name="password" id="password" placeholder="Password" />
          
          <button type="submit">
            {this.state.isSignup ? "Sign Up" : "Login"}
          </button>
          
          <button onClick={this.handleGoogle} type="button">
            Login With Google
          </button>
          
          <a href="/forgot-password">Forgot Password?</a>
          <div>
            {this.state.isSignup ? (
              <p>
                Already have an account?{" "}
                <button type="button" onClick={this.toggleSignup}>Login</button>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <button type="button" onClick={this.toggleSignup}>Sign Up</button>
              </p>
            )}
          </div>
        </form>
      </div>
    );
  }
}
