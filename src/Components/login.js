import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async function () {
    const loginVal = { email, password };
    const res = await fetch(
      "https://dynamic-portfolio2.onrender.com/api/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginVal),
      }
    );
    const result = await res.json();
    const token = result.token;
    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  };

  return (
    <MDBContainer fluid>
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage:
            "url(https://mdbootstrap.com/img/new/textures/full/171.jpg)",
          height: "300px",
        }}
      ></div>

      <MDBCard
        className="mx-5 mb-5 p-5 shadow-5"
        style={{
          marginTop: "-100px",
          background: "hsla(0, 0%, 100%, 0.8)",
          backdropFilter: "blur(30px)",
        }}
      >
        <MDBCardBody className="p-5 text-center">
          <h2 className="fw-bold mb-5">Login now</h2>

          <MDBInput
            wrapperClass="mb-4"
            className="w-70"
            placeholder="Email"
            id="form1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <MDBInput
            wrapperClass="mb-4"
            placeholder="Password"
            id="form2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="!#" className="mb-3">
            Forgot password?
          </a>

          <MDBBtn className="w-100 my-4" size="md" onClick={handleLogin}>
            Login
          </MDBBtn>
          <p>not yet signed up? Click here</p>
          <MDBBtn
            className="w-50 mb-4"
            size="md"
            onClick={() => navigate("/signup")}
          >
            Signup
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
