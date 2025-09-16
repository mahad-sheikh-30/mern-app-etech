import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact: React.FC = () => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    comments: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to submit the form.");
        return;
      }

      const res = await axios.post("http://localhost:8080/api/contact", data, {
        headers: {
          "x-auth-token": token || "",
        },
      });

      alert("Form submitted successfully!");
      console.log("Response:", res.data);

      setData({ name: "", phone: "", email: "", comments: "" });
    } catch (err: any) {
      if (err.response) {
        alert(err.response.data.message || "Failed to submit form");
        console.error("Error:", err.response.data);
      } else if (err.request) {
        alert("No response from server. Please check backend.");
      } else {
        alert("Error: " + err.message);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Name:
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Comments:
          <textarea
            id="comments"
            name="comments"
            value={data.comments}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
