import axios from "axios";
import React from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
//in actions wedeal with form requests, in loaders fetching is performed before an action
const newsletterUrl = "https://www.course-api.com/cocktails-newsletter";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await axios.post(newsletterUrl, data);
    console.log(response);
    alert("Subscription Successful!");
    return redirect("/");
  } catch (error) {
    alert(error?.response?.data?.msg);
    return error;
  }
};
const Newsletter = () => {
  const navigate = useNavigation();
  const isSbumitting = navigate.state === "submitting";
  return (
    <Form className="form" method="POST">
      <h4 style={{ textAlign: "center", marginBottom: "2rem" }}>
        our newsletter
      </h4>
      {/* name */}
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          name
        </label>
        <input
          type="text"
          className="form-input"
          name="name"
          id="name"
          required
          defaultValue="john"
        />
      </div>
      {/* last name */}
      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          last name
        </label>
        <input
          type="text"
          className="form-input"
          name="lastName"
          id="lastName"
          required
          defaultValue="smith"
        />
      </div>
      {/* name */}
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          type="email"
          className="form-input"
          name="email"
          id="email"
          required
          defaultValue="test@test.com"
        />
      </div>
      <button
        type="submit"
        className="btn btn-block"
        style={{ marginTop: "0.5rem" }}
        disabled={isSbumitting}
      >
        {isSbumitting ? "submitting" : "submit"}
      </button>
    </Form>
  );
};

export default Newsletter;
