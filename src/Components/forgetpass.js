import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import Base from "./base";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetTokenSent, setResetTokenSent] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [resetError, setResetError] = useState("");

  const handleForgotPassword = async () => {
    const forgotPasswordData = { email };

    const response = await fetch(
      "https://dynamic-portfolio2.onrender.com/api/user/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forgotPasswordData),
      }
    );

    if (response.ok) {
      setResetTokenSent(true);
    } else {
      setResetError("Failed to send reset token.");
    }
  };

  const handleResetPassword = async () => {
    const resetPasswordData = { resetToken, newPassword };

    const response = await fetch(
      "https://dynamic-portfolio2.onrender.com/api/user/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetPasswordData),
      }
    );

    if (response.ok) {
      setPasswordReset(true);
    } else {
      setResetError("Failed to reset password.");
    }
  };

  return (
    <Base>
      <MDBContainer fluid>
        <MDBCard
          className="mx-5 mb-5 p-5 shadow-5"
          style={{
            marginTop: "-100px",
            background: "hsla(0, 0%, 100%, 0.8)",
            backdropFilter: "blur(30px)",
          }}
        >
          <MDBCardBody className="p-5 text-center">
            <h2 className="fw-bold mb-5">Forgot Password</h2>

            {!resetTokenSent && !passwordReset && (
              <>
                <MDBInput
                  wrapperClass="mb-4"
                  className="w-70"
                  placeholder="Email"
                  id="form1"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <MDBBtn
                  className="w-100 my-4"
                  size="md"
                  onClick={handleForgotPassword}
                >
                  Submit
                </MDBBtn>
                {resetError && (
                  <div className="alert alert-danger">{resetError}</div>
                )}
              </>
            )}

            {resetTokenSent && !passwordReset && (
              <>
                <MDBInput
                  wrapperClass="mb-4"
                  className="w-70"
                  placeholder="Reset Token"
                  id="form1"
                  type="text"
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                />

                <MDBInput
                  wrapperClass="mb-4"
                  className="w-70"
                  placeholder="New Password"
                  id="form1"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <MDBInput
                  wrapperClass="mb-4"
                  className="w-70"
                  placeholder="Confirm Password"
                  id="form1"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <MDBBtn
                  className="w-100 my-4"
                  size="md"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </MDBBtn>
                {resetError && (
                  <div className="alert alert-danger">{resetError}</div>
                )}
              </>
            )}

            {passwordReset && (
              <div className="alert alert-success">
                Password reset successfully.
              </div>
            )}
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </Base>
  );
}

export default ForgotPassword;
