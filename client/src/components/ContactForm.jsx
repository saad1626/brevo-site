// components/ContactForm.jsx
// The form on the Contact page. Messages appear in the dashboard.

import { useState } from "react";
import Button from "./Button";
import Alert from "./Alert";
import { sendMessage } from "../api";

function ContactForm() {
  // One state variable per input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    // Stop the browser from reloading the page
    event.preventDefault();

    setSuccess("");
    setError("");

    if (message.trim() === "") {
      setError("Please write a message.");
      return;
    }

    setSending(true);

    try {
      const result = await sendMessage({
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message
      });

      setSuccess(result.message);

      // Empty the form
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setError(err.message);
    }

    setSending(false);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="line-field">
        <span>Your Name</span>
        <input type="text" value={name} onChange={function (e) { setName(e.target.value); }} />
      </label>

      <label className="line-field">
        <span>Email Address</span>
        <input type="email" value={email} onChange={function (e) { setEmail(e.target.value); }} />
      </label>

      <div className="two-columns-small">
        <label className="line-field">
          <span>Phone Number</span>
          <input type="tel" value={phone} onChange={function (e) { setPhone(e.target.value); }} />
        </label>

        <label className="line-field">
          <span>Subject</span>
          <input type="text" value={subject} onChange={function (e) { setSubject(e.target.value); }} />
        </label>
      </div>

      <label className="line-field">
        <span>Message <span className="required">*</span></span>
        <textarea rows="3" value={message} onChange={function (e) { setMessage(e.target.value); }} required />
      </label>

      <Alert type="success" text={success} />
      <Alert type="error" text={error} />

      <Button type="submit" full disabled={sending}>
        {sending ? "Sending..." : "Send a message"}
      </Button>
    </form>
  );
}

export default ContactForm;
