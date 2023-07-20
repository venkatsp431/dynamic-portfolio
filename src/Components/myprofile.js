import React, { useEffect, useState } from "react";
import Base from "./base";
import {
  Button,
  Collapse,
  Container,
  Form,
  TabContainer,
} from "react-bootstrap";

export default function Myprofile() {
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [viewTemplatesOpen, setViewTemplatesOpen] = useState(false);
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordChanged, setPasswordChanged] = useState(false);
  const handleToggleChangePassword = () => {
    setChangePasswordOpen(!changePasswordOpen);
  };
  const [data, setData] = useState([]);
  const handleToggleViewTemplates = () => {
    setViewTemplatesOpen(!viewTemplatesOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const templatesaver = async () => {
      const res = await fetch(
        "https://dynamic-portfolio2.onrender.com/api/user/profile",
        {
          method: "GET",
          headers: {
            "x-auth-token": token,
          },
        }
      );
      const templates = await res.json();
      setData(templates);
    };
    templatesaver();
  }, []);

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPasswordFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch(
      "https://dynamic-portfolio2.onrender.com/api/user/change-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(passwordFields),
      }
    );
    console.log(response);
    if (response.ok) {
      setPasswordChanged(true);
    } else {
      console.error("Password change failed.");
    }

    console.log("Submitting change password form", passwordFields);
  };

  return (
    <div>
      <Base>
        <Container>
          <Button
            variant="primary"
            onClick={handleToggleChangePassword}
            className="w-100 my-2"
            aria-controls="changePasswordCollapse"
            aria-expanded={changePasswordOpen}
          >
            Change Password
          </Button>
          <Collapse in={changePasswordOpen}>
            <div id="changePasswordCollapse">
              {passwordChanged ? (
                <div className="alert alert-success">
                  Password changed successfully.
                </div>
              ) : (
                <Form onSubmit={handleSubmitChangePassword}>
                  <Form.Group>
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      value={passwordFields.currentPassword}
                      onChange={handleChangePassword}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={passwordFields.newPassword}
                      onChange={handleChangePassword}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={passwordFields.confirmPassword}
                      onChange={handleChangePassword}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" className="my-3">
                    Change Password
                  </Button>
                </Form>
              )}
            </div>
          </Collapse>

          <Button
            variant="primary"
            onClick={handleToggleViewTemplates}
            className="w-100 my-2"
            aria-controls="viewTemplatesCollapse"
            aria-expanded={viewTemplatesOpen}
          >
            My Resume
          </Button>
          <Collapse in={viewTemplatesOpen}>
            <div id="viewTemplatesCollapse">
              {data.templates &&
                data.templates.map((url, index) => (
                  <p key={index}>
                    <a href={url} target="_blank">
                      {url}
                    </a>
                  </p>
                ))}
            </div>
          </Collapse>
        </Container>
      </Base>
    </div>
  );
}
