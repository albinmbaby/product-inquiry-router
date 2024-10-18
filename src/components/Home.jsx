import React, { useState } from 'react';
import { Form } from "react-router-dom";
import './Home.css';  // Importing the external CSS file


const Home = () => {
    const [submitted, setSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const [errors, setErrors] = useState({});

  // Validation logic moved outside of handleSubmit
  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.product) newErrors.product = "Product is required";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      product: e.target.product.value,
      message: e.target.message.value
    };

    // Validate form data
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      setSubmissionData(formData); // Set the submitted form data
    } else {
      setErrors(validationErrors); // Display validation errors
    }
  };

  return (
    <div className="container">
      <h1>Product Inquiry Form</h1>
      {!submitted ? (
        <Form method="post" action="/contact" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="exampleInputProduct" className="form-label">Product</label>
            <input
              type="text"
              name="product"
              className="form-control"
              placeholder="Enter the product"
            />
            {errors.product && <p style={{ color: "red" }}>{errors.product}</p>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="exampleInputMessage" className="form-label">Message</label>
            <textarea
              className="form-control"
              name="message"
              id="exampleInputMessage"
              rows="4"
              placeholder="Enter your message"
            />
            {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
      ) : (
        <div className="thank-you-message">
          <h3>Thank You!</h3>
          <p>Your message has been submitted successfully.</p>
          <h4>Your Details:</h4>
          <p><strong>Name:</strong> {submissionData.name}</p>
          <p><strong>Email:</strong> {submissionData.email}</p>
          <p><strong>Product:</strong> {submissionData.product}</p>
          <p><strong>Message:</strong> {submissionData.message}</p>
        </div>
      )}
    </div>

  )
}

export default Home

// Action to handle the form submission
export const inquiryAction = async ({ request }) => {
    const data = await request.formData();
    const submission = {
      name: data.get('name'),
      email: data.get('email'),
      product: data.get('product'),
      message: data.get('message'),
    };
  
    // You can process this data further or send it to a backend here
    return submission;
  };
  