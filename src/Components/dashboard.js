import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Card,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Base from "./base";
import temp2Image from "../images/temp2.png";
import temp1Image from "../images/temp1.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Template 1",
    },
    {
      id: 2,
      name: "Template 2",
    },
  ]);
  return (
    <div>
      <Base>
        <div class="article-row1">
          <div class="article-row1-wrapper">
            <h1>THE PORTFOLIO CREATOR ONLINE 2023</h1>
            <p>“Must have tool for every aspiring professional ”</p>
          </div>
        </div>
        <div>
          <Container>
            <Card className="card-templates">
              <Row noGutters>
                <Col md={4}>
                  <Card.Img
                    variant="top"
                    src={temp1Image}
                    style={{
                      borderTopLeftRadius: "0.25rem",
                      borderBottomLeftRadius: "0.25rem",
                    }}
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>myPortfolio Resume/CV</Card.Title>
                    <Card.Text>
                      myPortfolio is a modern personal CV and portfolio HTML
                      template. It's creative, minimal and clean design.
                      iPortfolio can be used for many purposes starting from
                      minimal portfolios, freelancers, graphic designers,
                      illustrators, photographers and ...
                    </Card.Text>
                    <Button
                      variant="outline-primary"
                      onClick={() => navigate(`/myform/1`)}
                    >
                      Create
                    </Button>{" "}
                  </Card.Body>
                </Col>
              </Row>
            </Card>
            <Card className="card-templates">
              <Row noGutters>
                <Col md={4}>
                  <Card.Img
                    variant="top"
                    src={temp2Image}
                    style={{
                      borderTopLeftRadius: "0.25rem",
                      borderBottomLeftRadius: "0.25rem",
                    }}
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>Devfolio Resume/CV</Card.Title>
                    <Card.Text>
                      Devfolio is a modern personal CV and portfolio HTML
                      template. It's creative, minimal and clean design.
                      iPortfolio can be used for many purposes starting from
                      minimal portfolios, freelancers, graphic designers,
                      illustrators, photographers and ...
                    </Card.Text>
                    <Button
                      variant="outline-primary"
                      onClick={() => navigate(`/myform/2`)}
                    >
                      Create
                    </Button>{" "}
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Container>
        </div>
        <footer class="footer">
          <h1 class="newsletter-title">NEWSLETTER</h1>
          <div class="newsletter-box">
            <input type="email" placeholder="Enter email address" />
            <button>Subscribe</button>
          </div>
          <div class="copyright">
            <span class="copyright-padding">
              &copy; 2023, My Portfolio. All rights reserved
            </span>{" "}
            |<a href="#">Contact Us</a> |<a href="#">Privacy Policy</a> |
            <a href="#">CSR Policy</a>
          </div>
        </footer>
      </Base>
    </div>
  );
};

export default Dashboard;
