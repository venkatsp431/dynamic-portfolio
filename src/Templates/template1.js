import React, { useEffect, useState } from "react";
import $ from "jquery";
import "ekko-lightbox";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";

export default function Template1() {
  const navigate = useNavigate();
  const { uniqueId } = useParams();
  const [data, setData] = useState(null);
  const [img, setImg] = useState(null);
  console.log(data);
  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const fileResponse = await fetch(
          `https://dynamic-portfolio2.onrender.com/api/template/uploader/${uniqueId}`
        );
        const file = await fileResponse.json();
        console.log(file.fileUrl);
        // const imageElement = document.querySelector(".my-pic");
        setImg(file.fileUrl);
        // imageElement.src = file.fileURL;
        const response = await fetch(
          `https://dynamic-portfolio2.onrender.com/api/template/templateid/${uniqueId}`
        );

        const datas = await response.json();
        setData(datas.data);
        // Set the template data in state

        console.log(datas);
      } catch (error) {
        console.error("Error fetching template data:", error);
      }
    };

    fetchTemplateData();
    // Click event on .port-item
  }, [uniqueId]);
  useEffect(() => {
    var portItems = document.querySelectorAll(".port-item");
    for (var i = 0; i < portItems.length; i++) {
      portItems[i].addEventListener("click", function () {
        var collapses = document.querySelectorAll(".collapse");
        for (var j = 0; j < collapses.length; j++) {
          collapses[j].classList.remove("show");
        }
      });
    }

    // Click event on [data-toggle="lightbox"]
    document.addEventListener("click", function (event) {
      if (event.target.matches('[data-toggle="lightbox"]')) {
        event.preventDefault();
        // Assuming you have included the required ekko-lightbox JavaScript library
        $(event.target).ekkoLightbox();
      }
    });
  }, []);
  const handleDownloadPDF = async () => {
    const currentUrl = window.location.href;

    // Now, make an HTTP request to the backend with the current URL
    // You can use Fetch or any other library to perform the request.
    // Example using Fetch:
    await fetch(
      "https://dynamic-portfolio2.onrender.com/api/template/download-pdf",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: currentUrl }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend if needed
      })
      .catch((error) => {
        // Handle any errors that occur during the request
      });
  };

  // const handleDownloadPDF = () => {
  //   const templateName = `template1/${uniqueId}`;
  //   window.open(
  //     `https://dynamic-portfolio2.onrender.com/api/template/download-pdf?template=${templateName}`,
  //     "_blank"
  //   );
  // };
  // Click event on [data-toggle="lightbox"]
  // document.addEventListener("click", function (event) {
  //   if (event.target.matches('[data-toggle="lightbox"]')) {
  //     event.preventDefault();
  //     // Assuming you have included the required ekko-lightbox JavaScript library
  //     $(event.target).ekkoLightbox();
  //   }
  // });

  return (
    <div>
      {data ? (
        <Container>
          <header id="main-header">
            <div className="row no-gutters">
              <div className="col-lg-4 col-md-5">
                <img src={img} className="my-pic" alt="My Portfolio" />
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="d-flex flex-column">
                  <div className="p-5 bg-dark text-white">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <h1 className="display-4">
                        {data?.personalDetails?.name}
                      </h1>
                      {/* <div className="d-none d-md-block">
                        <a href="http://twitter.com" className="text-white">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </div>
                      <div>
                        <a href="http://facebook.com" className="text-white">
                          <i className="fab fa-facebook"></i>
                        </a>
                      </div>
                      <div>
                        <a href="http://instagram.com" className="text-white">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </div>
                      <div>
                        <a href="http://github.com" className="text-white">
                          <i className="fab fa-github"></i>
                        </a>
                      </div> */}
                    </div>
                  </div>

                  <div className="p-4 bg-black">
                    {data.personalDetails?.professionalSummary}
                  </div>

                  <div>
                    <div className="d-flex flex-row text-white align-items-stretch text-center">
                      <div
                        className="port-item p-4 bg-primary pointer"
                        data-toggle="collapse"
                        data-target="#home"
                      >
                        <i className="fas fa-home fa-2x d-block"></i>
                        <span className="d-none d-sm-block">Home</span>
                      </div>
                      <div
                        className="port-item p-4 bg-success pointer"
                        data-toggle="collapse"
                        data-target="#resume"
                      >
                        <i className="fas fa-graduation-cap fa-2x d-block"></i>
                        <span className="d-none d-sm-block">Resume</span>
                      </div>
                      <div
                        className="port-item p-4 bg-warning pointer"
                        data-toggle="collapse"
                        data-target="#work"
                      >
                        <i className="fas fa-folder-open fa-2x d-block"></i>
                        <span className="d-none d-sm-block">Work</span>
                      </div>
                      <div
                        className="port-item p-4 bg-danger pointer"
                        data-toggle="collapse"
                        data-target="#contact"
                      >
                        <i className="fas fa-envelope fa-2x d-block"></i>
                        <span className="d-none d-sm-block">Contact</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div id="home" className="collapse show">
            <div className="card card-body bg-primary text-white py-5">
              <h2>Welcome To My Page</h2>
              <p className="lead">{data?.personalDetails?.designation}</p>
            </div>

            <div className="card card-body py-5">
              <h3>My Skills</h3>
              <p>{data?.workExperience[0].jobTitle}</p>
              <hr />

              {data.skills.map((skill, index) => (
                <div key={index}>
                  <h4>{skill.skillName}</h4>
                  <div className="progress mb-3">
                    <div
                      className="progress-bar bg-success"
                      style={{
                        width: `${skill.skillPercentage}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="resume" className="collapse">
            <div className="card card-body bg-success text-white py-5">
              <h2>My Resume</h2>
              <p className="lead">
                I have {data.personalDetails?.experience} years of experience
              </p>
            </div>

            <div className="card card-body py-5">
              <h3>Where Have I Worked and studied?</h3>
              <p>
                A highly organized and hard-working individual looking for a
                responsible position
              </p>
              <div className="card-deck">
                {data.educationDetails.map((edu, index) => (
                  <div className="card" key={index}>
                    <div className="card-body">
                      <h4 className="card-title">{edu.qualification}</h4>
                      <p className="card-text">{edu.coursework}</p>
                      <p className="p-2 mb-3 bg-dark text-white">
                        Institute: {edu.institution}
                      </p>
                    </div>
                    <div className="card-footer">
                      <h6 className="text-muted">Dates: {edu.dates}</h6>
                    </div>
                  </div>
                ))}
                {data.workExperience.map((work, index) => (
                  <div className="card" key={index}>
                    <div className="card-body">
                      <h4 className="card-title">{work.jobTitle}</h4>
                      <p className="card-text">{work.responsibility}</p>
                      <p className="p-2 mb-3 bg-dark text-white">
                        Company: {work.company}
                      </p>
                    </div>
                    <div className="card-footer">
                      <h6 className="text-muted">Dates: {work.dates}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="work" className="collapse">
            <div className="card card-body bg-warning text-white py-5">
              <h2>My Projects</h2>
              <p className="lead">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil,
                ut!
              </p>
            </div>

            <div className="card card-body py-5">
              <h3>What Have I Built?</h3>
              <p>Work and Educational Projects</p>
              <div className="row no-gutters">
                {data.projects.map((project, index) => (
                  <div className="col-md-3" key={index}>
                    <a href={project.filePath} data-toggle="lightbox">
                      <Card style={{ width: "18rem" }}>
                        <Card.Img variant="top" src={project.fileName} />
                        <Card.Body>
                          <Card.Title>{project.projectName}</Card.Title>
                          <Card.Text>{project.description}</Card.Text>
                          <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                      </Card>
                    </a>
                  </div>
                ))}
                <div className="col-md-3">
                  <a
                    href="https://unsplash.it/1200/768.jpg?image=253"
                    data-toggle="lightbox"
                  >
                    <img
                      src="https://unsplash.it/600.jpg?image=253"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="col-md-3">
                  <a
                    href="https://unsplash.it/1200/768.jpg?image=254"
                    data-toggle="lightbox"
                  >
                    <img
                      src="https://unsplash.it/600.jpg?image=254"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="col-md-3">
                  <a
                    href="https://unsplash.it/1200/768.jpg?image=255"
                    data-toggle="lightbox"
                  >
                    <img
                      src="https://unsplash.it/600.jpg?image=255"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>

              <div className="row no-gutters">
                <div className="col-md-3">
                  <a
                    href="https://unsplash.it/1200/768.jpg?image=256"
                    data-toggle="lightbox"
                  >
                    <img
                      src="https://unsplash.it/600.jpg?image=256"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="col-md-3">
                  <a
                    href="https://unsplash.it/1200/768.jpg?image=257"
                    data-toggle="lightbox"
                  >
                    <img
                      src="https://unsplash.it/600.jpg?image=257"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="col-md-3">
                  <a
                    href="https://unsplash.it/1200/768.jpg?image=258"
                    data-toggle="lightbox"
                  >
                    <img
                      src="https://unsplash.it/600.jpg?image=258"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="col-md-3">
                  <a
                    href="https://unsplash.it/1200/768.jpg?image=259"
                    data-toggle="lightbox"
                  >
                    <img
                      src="https://unsplash.it/600.jpg?image=259"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div id="contact" className="collapse">
            <div className="card card-body bg-danger text-white py-5">
              <h2>Contact</h2>
              <p className="lead">
                {data.personalDetails?.phone}, {data.personalDetails?.city}
              </p>
            </div>

            <div className="card card-body py-5">
              <h3>Get In Touch</h3>
              <p>My email:{data.personalDetails?.email}</p>
              <p>My mobile:{data.personalDetails?.phone}</p>
              <form className="form-contact">
                <div className="form-group">
                  <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-danger text-white">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-control bg-dark text-white"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-danger text-white">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control bg-dark text-light"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-danger text-white">
                        <i className="fas fa-pencil-alt"></i>
                      </span>
                    </div>
                    <textarea
                      className="form-control bg-dark text-light"
                      placeholder="Name"
                    ></textarea>
                  </div>
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-danger btn-block btn-lg"
                />
              </form>
            </div>
          </div>

          <footer
            id="main-footer"
            className="main-footer p-5 bg-dark text-light"
          >
            <div className="row">
              <div className="col-md-6">
                <button
                  onClick={handleDownloadPDF}
                  className="btn btn-outline-light"
                >
                  <i className="fas fa-cloud"></i> Download Resume
                </button>
              </div>
            </div>
          </footer>
        </Container>
      ) : (
        // Show a loading indicator while fetching the template data
        <div>Loading...</div>
      )}
    </div>
  );
}
