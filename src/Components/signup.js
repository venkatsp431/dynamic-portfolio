import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSignup = async function () {
    const loginVal = { name, email, contact, password };
    const res = await fetch(
      "https://dynamic-portfolio2.onrender.com/api/user/signup",
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
          <h2 className="fw-bold mb-5">Sign up now</h2>

          <MDBInput
            wrapperClass="mb-4"
            className="w-70"
            placeholder="Name"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <MDBInput
            wrapperClass="mb-4"
            className="w-70"
            placeholder="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            placeholder="Contact"
            id="contact"
            type="number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <MDBBtn className="w-100 mb-4" size="md" onClick={handleSignup}>
            Sign up
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Signup;
