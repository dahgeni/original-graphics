import React, { Component } from "react";
import { TextArea, Dropdown, Form, Message } from "semantic-ui-react";
var mandrill = require('node-mandrill')('lEcov9c39Cj4O26ihmKeKg');

class Contact extends Component {
  state = {
    errors: {},
    showContactForm: false,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    commentTopic: "",
    feedback: ""
  };

  commentTopics = [
    {
      text: "Customer Service",
      value: "Customer Service"
    },
    {
      text: "Product Information",
      value: "Product Information"
    },
    {
      text: "Class Information",
      value: "Class Information"
    },
    {
      text: "Other",
      value: "Other"
    }
  ];

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onDropdownInputChange = (e, data) => {
    this.setState({
      commentTopic: data.value
    });
  };

  formSubmit = async e => {
    e.preventDefault();

    this.setState({
      errors: {}
    })

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      commentTopic,
      feedback
    } = this.state;

    if (firstName === "") {
      this.setState({
        errors: {
          firstName: "First name is required"
        }
      });
      return;
    }

    if (lastName === "") {
      this.setState({
        errors: {
          lastName: "Last name is required"
        }
      });
      return;
    }

    if (email === "") {
      this.setState({
        errors: {
          email: "Email is required"
        }
      });
      return;
    }

    if (phoneNumber === "") {
      this.setState({
        errors: {
          phoneNumber: "Phone number is required"
        }
      });
      return;
    }

    if (commentTopic === '') {
      this.setState({
        errors: {
          commentTopic: "Comment topic is required"
        }
      });
      return;
    }

    if (feedback === "") {
      this.setState({
        errors: {
          feedback: "Feedback is required"
        }
      });
      return;
    }

    this.setState({
      showContactForm: true
    });

    // send email with mandrill
    mandrill('/messages/send', {
      message: {
        to: [{ email: email, name: `${firstName} ${lastName}` }],
        from_email: 'originalgraphics.contact@gmail.com',
        subject: "Response to your Original Graphics Concerns",
        text: "Hello, We have received your feedback and have decided to..."
      }
    }, function (error, response) {
        //uh oh, there was an error
        if (error) console.log(JSON.stringify(error));

        //everything's good, lets see what mandrill said
        else console.log(response);
      });
  
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="column" style={{ padding: "15px 5px 5px 5px" }}>
          <div
            style={{ fontSize: "50px" }}
            className="ui grey center aligned huge header"
          >
            Original Graphics
          </div>

          <div className="ui vertical left aligned segment">
            <div className="ui container">
              <h1 style={{ fontSize: "40px" }} className="ui header">
                Contact Us
                <div className="sub header" style={{ paddingTop: "20px" }}>
                  Questions, need some help or have feedback? Fill out the form
                  below and we'll get back to you as soon as we can.
                </div>
              </h1>

              {Object.keys(errors).map((keyName, i) => {
                return <Message key={i} compact size='large' attached negative content={errors[keyName]} />
              })}

              {this.state.showContactForm ? (
                <Message size="large">
                  Thank you for contacting us! We will get back to you soon.
                </Message>
              ) : (
                <div className="ui message">
                  <Form>
                    <Form.Field>
                      <label>First Name</label>
                      <input
                        onChange={this.onInputChange}
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Last Name</label>
                      <input
                        onChange={this.onInputChange}
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Email</label>
                      <input
                        onChange={this.onInputChange}
                        name="email"
                        type="text"
                        placeholder="Email Address"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Phone Number</label>
                      <input
                        onChange={this.onInputChange}
                        name="phoneNumber"
                        type="tel"
                        placeholder="Phone Number"
                      />
                    </Form.Field>
                    <h1
                      className="ui header"
                      style={{ paddingBottom: "10px", paddingTop: "25px" }}
                    >
                      <div className="sub header">
                        What's on your mind? Choose a topic and add your
                        comments below.
                      </div>
                    </h1>
                    <Dropdown
                      placeholder="Select Topic of Concern"
                      onChange={this.onDropdownInputChange}
                      fluid
                      selection
                      options={this.commentTopics}
                    />
                    <h1
                      className="ui header"
                      style={{ paddingBottom: "10px", paddingTop: "25px" }}
                    >
                      <div className="sub header">
                        Send us your feedback, questions or concerns.
                      </div>
                    </h1>
                    <TextArea
                      onChange={this.onInputChange}
                      name="feedback"
                      rows={5}
                      placeholder="Tell us more"
                    />
                    <div className="ui divider" />
                    <button
                      onClick={this.formSubmit}
                      style={{ paddingTop: "20px" }}
                      className="ui fluid primary huge button"
                    >
                      Submit
                    </button>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
