// components/SubscribeForm.jsx
// The "Subscribe Now" box. Emails appear in the dashboard.

import { useState } from "react";
import Button from "./Button";
import Alert from "./Alert";
import { subscribe } from "../api";

function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setSuccess("");
    setError("");

    try {
      const result = await subscribe(email);
      setSuccess(result.message);
      setEmail("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="subscribe-form" onSubmit={handleSubmit}>
      <label htmlFor="subscribe-email" className="visually-hidden">Email address</label>

      <input
        id="subscribe-email"
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={function (e) { setEmail(e.target.value); }}
        required
      />

      <Button type="submit" full>Subscribe now</Button>

      <Alert type="success" text={success} />
      <Alert type="error" text={error} />
    </form>
  );
}

export default SubscribeForm;
