import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlaySpinner from "../components/OverlaySpinner";
import { toast } from "react-toastify";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const signClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (name.trim().length > 2 && password.trim().length > 7 && password === confirmPassword) {
      const emailParts = email.trim().split("@");
      if (emailParts.length === 2 && emailParts[0] !== "" && emailParts[1] !== "") {
        setLoader(true);
        try {
          await axios.post(
            "https://fakestoreapi.com/users",

            {
              email,
              username: name,
              password: password,
              name: {
                firstname: "",
                lastname: ""
              },
              address: {
                city: "",
                street: "",
                number: 0,
                zipcode: "",
                geolocation: {
                  lat: "",
                  long: ""
                }
              },
              phone: ""
            }
          );
          setTimeout(() => {
            toast.success("User was created successfully");
            navigate("/")
          }, 3000);
        }
        catch (error) {
          toast.error("Failed to create user");
          setLoader(false);
        }
      }
      else toast.error("Please enter valid information");
    }
    else toast.error("Please enter valid information");
  };

  return (
    <div className="signup-page">
      <div className="loginform">
        <h2 className="headerTitle">Sign up</h2>
        <div className="signUpPage">
          <Form onSubmit={signClick}>
            <div className="input-field">
              <Form.Label htmlFor="username">User name</Form.Label>
              <Form.Control
                id="c"
                type="text"
                placeholder="Enter user name"
                required
                aria-describedby="usernamehelp"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Text id="usernamehelp">
                Your user name should have minimum three characters
              </Form.Text>
            </div>
            <div className="input-field">
              <Form.Label htmlFor="emailid">Email id</Form.Label>
              <Form.Control
                id="emailid"
                type="email"
                placeholder="name@mail.com"
                required
                aria-describedby="emailhelp"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <Form.Text id="emailhelp">
                Enter a valid email
              </Form.Text>
            </div>
            <div className="input-field">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder="Enter password"
                required
                aria-describedby="passwordhelp"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text id="passwordhelp">
                Password must have minimum 8 characters
              </Form.Text>
            </div>
            <div className="input-field">
              <Form.Label htmlFor="confirmpassword">Password</Form.Label>
              <Form.Control
                id="confirmpassword"
                type="password"
                placeholder="Re-enter password"
                required
                aria-describedby="confirmpasswordhelp"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Form.Text id="confirmpasswordhelp">
                Comfirm password should be same as password
              </Form.Text>
            </div>
            <div>Already a member? <span className="link" onClick={() => navigate("/")}> Login</span></div>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
      {loader && (<OverlaySpinner />)}
    </div>
  );
};

export default SignUp;
