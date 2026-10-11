// dashboard/Messages.jsx
// Messages from the Contact form, and emails from the Subscribe form

import { useEffect, useState } from "react";
import { getMessages, deleteMessage, getSubscribers } from "../api";
import usePageTitle from "../hooks/usePageTitle";
import PageHeader from "./PageHeader";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import { formatDate } from "../utils";

function Messages() {
  usePageTitle("Messages");

  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      const messageData = await getMessages();
      const subscriberData = await getSubscribers();
      setMessages(messageData);
      setSubscribers(subscriberData);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  useEffect(function () {
    loadData();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this message?")) {
      return;
    }

    try {
      await deleteMessage(id);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader title="Messages" text="Sent from the Contact page form." />

      <Alert type="error" text={error} />

      {messages.length === 0 && (
        <div className="dash-card empty-state">
          <p>No messages yet. They will appear here when someone uses the Contact form.</p>
        </div>
      )}

      {messages.map(function (msg) {
        return (
          <div className="dash-card message-card" key={msg.id}>
            <div className="message-top">
              <div>
                <strong>{msg.name || "No name"}</strong>
                {msg.email && <a href={"mailto:" + msg.email}> {msg.email}</a>}
                {msg.phone && <span> | {msg.phone}</span>}
              </div>
              <span className="field-hint">{formatDate(msg.date)}</span>
            </div>

            {msg.subject && <p className="message-subject">{msg.subject}</p>}
            <p className="message-text">{msg.message}</p>

            <button type="button" className="dash-btn dash-btn-danger-light dash-btn-small" onClick={function () { handleDelete(msg.id); }}>
              Delete
            </button>
          </div>
        );
      })}

      <h2 className="dash-section-title">Subscribers ({subscribers.length})</h2>

      <div className="dash-card">
        {subscribers.length === 0 ? (
          <p>No subscribers yet.</p>
        ) : (
          <ul className="subscriber-list">
            {subscribers.map(function (sub) {
              return (
                <li key={sub.id}>
                  <span>{sub.email}</span>
                  <span className="field-hint">{formatDate(sub.date)}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default Messages;
