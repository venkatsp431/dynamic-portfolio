import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Container, Row, Col, Button } from "react-bootstrap";
import Base from "./base";
import { useNavigate, useParams } from "react-router-dom";

const MyForm = () => {
  let { tempid } = useParams();

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [projectfile, setProfile] = useState([]);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const fileChange = (e) => {
    setProfile.push(e.target.files[0]);
  };
  const initialValues = {
    personalDetails: {
      name: "",
      designation: "",
      experience: "",
      email: "",
      birthday: "",
      phone: "",
      city: "",
      age: "",
      professionalSummary: "",
      file: "",
    },
    educationDetails: [
      {
        qualification: "",
        institution: "",
        dates: "",
        coursework: "",
      },
    ],

    workExperience: [
      {
        jobTitle: "",
        company: "",
        dates: "",
        responsibility: "",
      },
    ],

    projects: [
      {
        projectName: "",
        description: "",
        technologies: "",
        role: "",
        file: [],
      },
    ],
    skills: [{ skillName: "", skillPercentage: "" }],
  };

  const onSubmit = async (values) => {
    try {
      let uniqueId;
      const fileFormData = new FormData();
      fileFormData.append("uploaded_file", selectedFile);

      const fileResponse = await fetch(
        `https://dynamic-portfolio2.onrender.com/api/template/uploader`,
        {
          method: "POST",
          body: fileFormData,
        }
      );

      if (fileResponse.ok) {
        const fileData = await fileResponse.json();
        console.log("File upload success:", fileData);
      } else {
        console.error("File upload failed.");
      }

      const response = await fetch(
        "https://dynamic-portfolio2.onrender.com/api/template/templateUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        uniqueId = data.data.personid;
        const url = {
          url: `http://localhost:3000/template${tempid}/${uniqueId}`,
        };
        console.log(url);
        if (localStorage.getItem("token")) {
          const token = localStorage.getItem("token");

          const storeUrlResponse = await fetch(
            "https://dynamic-portfolio2.onrender.com/api/user/templatesaver",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
              },
              body: JSON.stringify(url),
            }
          );
          if (storeUrlResponse.ok) {
            console.log("URL stored in backend");
          } else {
            console.error("Failed to store URL in backend.");
          }
        }

        navigate(`/template${tempid}/${uniqueId}`);
      } else {
        console.error("Form submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  // const removeProject = (arrayHelpers, index) => {
  //   arrayHelpers.remove(index);
  // };

  return (
    <Base>
      <Container className="form-data">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ values }) => (
            <Form enctype="multipart/form-data">
              <Row>
                <Col>
                  <h2>Personal Details</h2>
                  <Field
                    className="form-control spaced-field"
                    type="text"
                    name="personalDetails.name"
                    placeholder="Name"
                    required
                  />
                  <label className="mx-3">Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="my-3"
                    onChange={handleFileChange}
                    required
                  />
                  <Field
                    className="form-control spaced-field"
                    type="text"
                    name="personalDetails.designation"
                    placeholder="Designation"
                    required
                  />
                  <Field
                    className="form-control spaced-field"
                    type="number"
                    name="personalDetails.experience"
                    placeholder="Experience"
                    required
                  />
                  <Field
                    className="form-control spaced-field"
                    type="email"
                    name="personalDetails.email"
                    placeholder="Email"
                    required
                  />
                  <Field
                    className="form-control spaced-field"
                    type="text"
                    name="personalDetails.birthday"
                    placeholder="Birthday"
                    required
                  />
                  <Field
                    className="form-control spaced-field"
                    type="number"
                    name="personalDetails.phone"
                    placeholder="Phone"
                    required
                  />
                  <Field
                    className="form-control spaced-field"
                    type="text"
                    name="personalDetails.city"
                    placeholder="City"
                    required
                  />
                  <Field
                    className="form-control spaced-field"
                    type="number"
                    name="personalDetails.age"
                    placeholder="Age"
                    required
                  />
                  <Field
                    className="form-control spaced-field"
                    as="textarea"
                    name="personalDetails.professionalSummary"
                    placeholder="Professional Summary"
                    required
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <h2>Education Details</h2>
                  <FieldArray name="educationDetails">
                    {({ push, remove }) => (
                      <>
                        {values.educationDetails.map((_, index) => (
                          <div key={index}>
                            <Field
                              className="form-control spaced-field"
                              type="text"
                              name={`educationDetails[${index}].qualification`}
                              placeholder="Qualification"
                              required
                            />
                            <Field
                              className="form-control spaced-field"
                              type="text"
                              name={`educationDetails[${index}].institution`}
                              placeholder="Institution"
                              required
                            />
                            <Field
                              className="form-control spaced-field"
                              type="text"
                              name={`educationDetails[${index}].dates`}
                              placeholder="Dates"
                              required
                            />
                            <Field
                              className="form-control spaced-field"
                              type="text"
                              name={`educationDetails[${index}].coursework`}
                              placeholder="Coursework"
                              required
                            />
                            <Button
                              variant="danger"
                              onClick={() => remove(index)}
                            >
                              Remove Education
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="primary"
                          className="my-3"
                          onClick={() => push({})}
                        >
                          Add Education
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </Col>
              </Row>

              <Row>
                <Col>
                  <h2>Work Experience</h2>
                  <FieldArray name="workExperience">
                    {({ push, remove }) => (
                      <>
                        {values.workExperience.map((exp, index) => (
                          <div key={index}>
                            <Field
                              className="form-control spaced-field"
                              type="text"
                              name={`workExperience[${index}].jobTitle`}
                              placeholder="Position"
                              required
                            />
                            <Field
                              className="form-control spaced-field"
                              type="text"
                              name={`workExperience[${index}].company`}
                              placeholder="Company"
                              required
                            />
                            <Field
                              className="form-control spaced-field"
                              type="text"
                              name={`workExperience[${index}].dates`}
                              placeholder="Dates"
                              required
                            />
                            <Field
                              className="form-control spaced-field"
                              as="textarea"
                              name={`workExperience[${index}].responsibility`}
                              placeholder="Responsibility"
                              required
                            />
                            <Button
                              variant="danger"
                              onClick={() => remove(index)}
                            >
                              Remove Work Experience
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="primary"
                          className="my-3"
                          onClick={() => push({})}
                        >
                          Add Work Experience
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </Col>
              </Row>
              <FieldArray name="skills">
                {(arrayHelpers) => (
                  <div>
                    <h2>Skills</h2>
                    {arrayHelpers.form.values.skills.map((skill, index) => (
                      <div key={index}>
                        <div className="form-group">
                          <label>Skill Name</label>
                          <div className="row">
                            <div className="col">
                              <Field
                                className="form-control"
                                type="text"
                                name={`skills[${index}].skillName`}
                                placeholder="Skill Name"
                                required
                              />
                            </div>
                            <div className="col">
                              <Field
                                className="form-control"
                                type="number"
                                name={`skills[${index}].skillPercentage`}
                                placeholder="Skill Percentage (Out of 100)"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="danger"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    {arrayHelpers.form.values.skills.length === 0 && (
                      <div>
                        <div className="form-group">
                          <label>Skill Name</label>
                          <div className="row">
                            <div className="col">
                              <Field
                                className="form-control"
                                type="text"
                                name="skills[0].skillName"
                                placeholder="Skill Name"
                              />
                            </div>
                            <div className="col">
                              <Field
                                className="form-control"
                                type="text"
                                name="skills[0].skillPercentage"
                                placeholder="Skill Percentage"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <Button
                      variant="primary"
                      className="my-3"
                      onClick={() => arrayHelpers.push({ name: "" })}
                    >
                      Add Skill
                    </Button>
                  </div>
                )}
              </FieldArray>

              <Row>
                <Col>
                  <h2>Projects</h2>

                  <FieldArray name="projects">
                    {({ push, remove }) => (
                      <div>
                        {values.projects.map((project, index) => (
                          <div key={index}>
                            <h3>Project {index + 1}</h3>
                            <div className="form-group">
                              <label>Project Name</label>
                              <Field
                                type="text"
                                name={`projects[${index}].projectName`}
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Description</label>
                              <Field
                                as="textarea"
                                name={`projects[${index}].description`}
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Technologies</label>
                              <Field
                                type="text"
                                name={`projects[${index}].technologies`}
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Role</label>
                              <Field
                                type="text"
                                name={`projects[${index}].role`}
                                className="form-control"
                                required
                              />
                            </div>

                            <Button type="button" onClick={() => remove(index)}>
                              Remove Project
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          className="my-3"
                          onClick={() =>
                            push({
                              projectName: "",
                              description: "",
                              technologies: "",
                              role: "",
                              fileUploads: [],
                            })
                          }
                        >
                          Add Project
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button type="submit" className="w-100 submit-margin">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Container>
    </Base>
  );
};

export default MyForm;
