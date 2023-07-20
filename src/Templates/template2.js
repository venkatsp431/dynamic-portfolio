import React, { useEffect, useState } from "react";
import "./template2/style.css";
import "./template2/icons.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import countImage from "../images/counters-bg.jpg";
import bannerImage from "../images/banner.png";
import overImage from "../images/overlay-bg.jpg";

export default function Template2() {
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
  const handleDownloadPDF = () => {
    const templateName = `template2/${uniqueId}`;
    window.open(
      `https://dynamic-portfolio2.onrender.com/api/template/download-pdf?template=${templateName}`,
      "_blank"
    );
  };
  const handleContactFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {
      const response = await fetch(
        "https://dynamic-portfolio2.onrender.com/api/template/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        form.reset();
        // Show success message to the user
        console.log("Email sent successfully");
      } else {
        // Handle error response
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  //
  return (
    <div className="template-2">
      <header id="header" class="fixed-top  bg-dark">
        <div class="container d-flex align-items-center justify-content-between">
          <h1 class="logo">
            <a href="index.html">DevFolio</a>
          </h1>

          <a href="index.html" class="logo">
            <img src="" alt="" class="img-fluid" />
          </a>

          <nav id="navbar" class="navbar">
            <ul>
              <li>
                <a class="nav-link scrollto active" href="#hero">
                  Home
                </a>
              </li>
              <li>
                <a class="nav-link scrollto" href="#about">
                  About
                </a>
              </li>
              <li>
                <a class="nav-link scrollto" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a class="nav-link scrollto " href="#work">
                  Work
                </a>
              </li>
              <li>
                <a class="nav-link scrollto " href="#blog">
                  Blog
                </a>
              </li>

              <li>
                <a class="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>

      <section
        id="hero"
        className="hero route bg-image"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div class="overlay-itro"></div>
        <div class="hero-content display-table">
          <div class="table-cell">
            <div class="container">
              <p class="display-6 color-d">Hello, world!</p>
              <h1 class="hero-title mb-4">
                I am {data?.personalDetails?.name}
              </h1>
              <p class="hero-subtitle">{data?.personalDetails?.designation}</p>
            </div>
          </div>
        </div>
      </section>
      <section id="main">
        <section id="about" class="about-mf sect-pt4 route">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <div class="box-shadow-full">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-sm-6 col-md-5">
                          <div class="about-img">
                            <img
                              src={img}
                              class="img-fluid rounded b-shadow-a"
                              alt=""
                            />
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-7">
                          <div class="about-info">
                            <p>
                              <span class="title-s">Name: </span>{" "}
                              <span>{data?.personalDetails?.name}</span>
                            </p>
                            <p>
                              <span class="title-s">Profile: </span>{" "}
                              <span>{data?.personalDetails?.designation}</span>
                            </p>
                            <p>
                              <span class="title-s">Email: </span>{" "}
                              <span>{data?.personalDetails?.email}</span>
                            </p>
                            <p>
                              <span class="title-s">Phone: </span>{" "}
                              <span>{data?.personalDetails?.phone}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="skill-mf">
                        <p class="title-s">Skill</p>
                        {data?.skills.map((skill, index) => (
                          <div key={index}>
                            <span>{skill.skillName}</span>{" "}
                            <span class="pull-right">
                              {skill.skillPercentage}%
                            </span>
                            <div class="progress">
                              <div
                                class="progress-bar"
                                role="progressbar"
                                style={{ width: `${skill.skillPercentage}%` }}
                                aria-valuenow="85"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="about-me pt-4 pt-md-0">
                        <div class="title-box-2">
                          <h5 class="title-left">About me</h5>
                        </div>
                        <p class="lead">
                          {data?.personalDetails.professionalSummary}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" class="services-mf pt-5 route">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <div class="title-box text-center">
                  <h3 class="title-a">Work Experience</h3>
                  <p class="subtitle-a">
                    Experience is the child of thought, and thought is the child
                    of action.
                  </p>
                  <div class="line-mf"></div>
                </div>
              </div>
            </div>
            <div class="row">
              {data?.workExperience.map((work, index) => (
                <div class="col-md-4" key={index}>
                  <div class="service-box">
                    <div class="service-ico">
                      <span class="ico-circle">
                        <i class="bi bi-briefcase"></i>
                      </span>
                    </div>
                    <div class="service-content">
                      <h2 class="s-title">{work.jobTitle}</h2>
                      <p class=" text-center">{work.company}</p>
                      <p class="s-description text-center">
                        {work.responsibility}
                      </p>
                      <p class=" text-center">{work.dates}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div
          className="section-counter paralax-mf bg-image"
          style={{ backgroundImage: `url(${countImage})` }}
        >
          <div class="overlay-mf"></div>
          <div class="container position-relative">
            <div class="row">
              <div class="col-sm-3 col-lg-3">
                <div class="counter-box counter-box pt-4 pt-md-0">
                  <div class="counter-ico">
                    <span class="ico-circle">
                      <i class="bi bi-check"></i>
                    </span>
                  </div>
                  <div class="counter-num">
                    <p
                      data-purecounter-start="0"
                      data-purecounter-end="450"
                      data-purecounter-duration="1"
                      class="counter purecounter"
                    ></p>
                    <span class="counter-text">
                      {data?.projects.length} WORKS COMPLETED
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-sm-3 col-lg-3">
                <div class="counter-box pt-4 pt-md-0">
                  <div class="counter-ico">
                    <span class="ico-circle">
                      <i class="bi bi-journal-richtext"></i>
                    </span>
                  </div>
                  <div class="counter-num">
                    <p
                      data-purecounter-start="0"
                      data-purecounter-end="25"
                      data-purecounter-duration="1"
                      class="counter purecounter"
                    ></p>
                    <span class="counter-text">
                      {data?.personalDetails.experience} YEARS OF EXPERIENCE
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-sm-3 col-lg-3">
                <div class="counter-box pt-4 pt-md-0">
                  <div class="counter-ico">
                    <span class="ico-circle">
                      <i class="bi bi-people"></i>
                    </span>
                  </div>
                  <div class="counter-num">
                    <p
                      data-purecounter-start="0"
                      data-purecounter-end="550"
                      data-purecounter-duration="1"
                      class="counter purecounter"
                    ></p>
                    <span class="counter-text">HAPPY CLIENTS</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-3 col-lg-3">
                <div class="counter-box pt-4 pt-md-0">
                  <div class="counter-ico">
                    <span class="ico-circle">
                      <i class="bi bi-award"></i>
                    </span>
                  </div>
                  <div class="counter-num">
                    <p
                      data-purecounter-start="0"
                      data-purecounter-end="48"
                      data-purecounter-duration="1"
                      class="counter purecounter"
                    ></p>
                    <span class="counter-text">BEST WORKS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="work" class="portfolio-mf sect-pt4 route">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <div class="title-box text-center">
                  <h3 class="title-a">Education</h3>
                  <p class="subtitle-a">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                  <div class="line-mf"></div>
                </div>
              </div>
            </div>
            <div class="row">
              {data?.educationDetails.map((edu, index) => (
                <div class="col-md-4" key={index}>
                  <div class="card card-blog">
                    <div class="card-img">
                      <a href="blog-single.html">
                        <img
                          src="assets/img/post-1.jpg"
                          alt=""
                          class="img-fluid"
                        />
                      </a>
                    </div>
                    <div class="card-body">
                      <div class="card-category-box">
                        <div class="card-category">
                          <h6 class="category">{edu.qualification}</h6>
                        </div>
                      </div>
                      <h3 class="card-title">{edu.institution}</h3>
                      <p class="card-description">{edu.coursework}</p>
                    </div>
                    <div class="card-footer">
                      <div class="post-author">
                        <span class="author">{edu.dates}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="blog" class="blog-mf sect-pt4 route">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <div class="title-box text-center">
                  <h3 class="title-a">Projects</h3>
                  <p class="subtitle-a">My Projects</p>
                  <div class="line-mf"></div>
                </div>
              </div>
            </div>
            <div class="row">
              {data?.projects.map((project, index) => (
                <div class="col-md-4" key={index}>
                  <div class="work-box">
                    <a
                      href="assets/img/work-5.jpg"
                      data-gallery="portfolioGallery"
                      class="portfolio-lightbox"
                    >
                      <div class="work-img">
                        <img
                          src="assets/img/work-5.jpg"
                          alt=""
                          class="img-fluid"
                        />
                      </div>
                    </a>
                    <div class="work-content">
                      <div class="row">
                        <div class="col-sm-12">
                          <h2 class="w-title">{project.projectName}</h2>
                          <div class="w-more">
                            <span class="w-ctegory">
                              {project.technologies}
                            </span>{" "}
                            / <span class="w-date">{project.role}</span>
                          </div>
                          <p>{project.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          class="paralax-mf footer-paralax bg-image sect-mt4 route"
          style={{ backgroundImage: "url(assets/img/overlay-bg.jpg)" }}
        >
          <div class="overlay-mf"></div>
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <div class="contact-mf">
                  <div id="contact" class="box-shadow-full">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="title-box-2">
                          <h5 class="title-left">Send Message Us</h5>
                        </div>
                        <div>
                          <form
                            role="form"
                            onSubmit={handleContactFormSubmit}
                            class="php-email-form"
                          >
                            <div class="row">
                              <div class="col-md-12 mb-3">
                                <div class="form-group">
                                  <input
                                    type="text"
                                    name="name"
                                    class="form-control"
                                    id="name"
                                    placeholder="Your Name"
                                    required
                                  />
                                </div>
                              </div>
                              <div class="col-md-12 mb-3">
                                <div class="form-group">
                                  <input
                                    type="email"
                                    class="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Your Email"
                                    required
                                  />
                                </div>
                              </div>
                              <div class="col-md-12 mb-3">
                                <div class="form-group">
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="subject"
                                    id="subject"
                                    placeholder="Subject"
                                    required
                                  />
                                </div>
                              </div>
                              <div class="col-md-12">
                                <div class="form-group">
                                  <textarea
                                    class="form-control"
                                    name="message"
                                    rows="5"
                                    placeholder="Message"
                                    required
                                  ></textarea>
                                </div>
                              </div>
                              <div class="col-md-12 text-center my-3">
                                <div class="loading">Loading</div>
                                <div class="error-message"></div>
                                <div class="sent-message">
                                  Your message has been sent. Thank you!
                                </div>
                              </div>
                              <div class="col-md-12 text-center">
                                <button
                                  type="submit"
                                  class="button button-a button-big button-rouded"
                                >
                                  Send Message
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="title-box-2 pt-4 pt-md-0">
                          <h5 class="title-left">Get in Touch</h5>
                        </div>
                        <div class="more-info">
                          <p class="lead">
                            {data?.personalDetails.professionalSummary}
                          </p>
                          <ul class="list-ico">
                            <li>
                              <span class="bi bi-geo-alt"></span>{" "}
                              {data?.personalDetails.city}
                            </li>
                            <li>
                              <span class="bi bi-phone"></span>{" "}
                              {data?.personalDetails.phone}
                            </li>
                            <li>
                              <span class="bi bi-envelope"></span>{" "}
                              {data?.personalDetails.email}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <footer>
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="copyright-box">
                <p class="copyright">
                  &copy; Copyright <strong>DevFolio</strong>. All Rights
                  Reserved
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 download">
              <button
                onClick={handleDownloadPDF}
                className="btn btn-outline-light downloader"
              >
                <i className="fas fa-cloud"></i> Download Resume
              </button>
            </div>
          </div>
        </div>
      </footer>

      <div id="preloader"></div>
      <a
        href="#"
        class="back-to-top d-flex align-items-center justify-content-center"
      >
        <i class="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
}
