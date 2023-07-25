import React, { useEffect, useState } from "react";

import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Base({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://dynamic-portfolio2.onrender.com/api/user/profile`,
        {
          method: "GET",
          headers: {
            "x-auth-token": token,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setUser(data.name);
    }

    if (localStorage.getItem("token")) {
      getUser();
      setLoggedIn(true);
      // document.querySelector(".login").textContent = user;
    } else {
      console.log("No token");
      setLoggedIn(false);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <div>
      <Navbar expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand to="/">My Portfolio</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              {loggedIn ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="default"
                    className="text-darker"
                    id="dropdown-basic"
                  >
                    {user}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="text-pad">
                    <Dropdown.Item onClick={() => navigate("/myprofile")}>
                      View Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                // User is logged out
                <Button variant="default" onClick={() => navigate("/login")}>
                  Login
                </Button>
              )}
              {/* <Nav.Link href="#projects" className="login">
                Login
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>{children}</div>
    </div>
  );
}
