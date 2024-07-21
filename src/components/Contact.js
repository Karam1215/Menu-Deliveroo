// src/Contact.js
import React from 'react';
import './styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <div className="contact-details">
        <p>Address: 123 Food Street, Food City, FC 12345</p>
        <p>Phone: +7 (234) 567-8901</p>
        <p>Email: contact@foodmenu.com</p>
      </div>
      <div className="contact-form">
        <h3>Send us a message</h3>
        <form>
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Message:
            <textarea name="message" rows="5" required></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
