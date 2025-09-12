import React, { useState } from "react";
import "./Contact.css";

const Contact: React.FC = () => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    comments: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Contact Data:", data);
    alert(`Name: ${data?.name}
          Phone: ${data?.phone}
          Email: ${data?.email}
          Password: ${data?.comments}`);

    setData({ name: "", phone: "", email: "", comments: "" });
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
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Comments:
          <textarea
            id="comments"
            name="comments"
            onChange={handleChange}
          ></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
