// dashboard/Overview.jsx
// The first dashboard page: quick numbers and shortcuts

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs, getMessages, getSubscribers } from "../api";
import { useSettings } from "../context/SettingsContext";
import usePageTitle from "../hooks/usePageTitle";
import PageHeader from "./PageHeader";

function Overview() {
  const { settings } = useSettings();
  usePageTitle("Dashboard");

  const [blogCount, setBlogCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(function () {
    async function loadCounts() {
      try {
        const blogs = await getBlogs();
        const messages = await getMessages();
        const subscribers = await getSubscribers();

        setBlogCount(blogs.length);
        setMessageCount(messages.length);
        setSubscriberCount(subscribers.length);
      } catch (err) {
        console.log(err.message);
      }
    }

    loadCounts();
  }, []);

  return (
    <>
      <PageHeader title="Overview" text={"Welcome back. Here is what is happening on " + settings.siteName + "."} />

      <div className="stat-grid">
        <Link to="/dashboard/blogs" className="stat-card">
          <span className="stat-number">{blogCount}</span>
          <span>Blog posts</span>
        </Link>

        <Link to="/dashboard/messages" className="stat-card">
          <span className="stat-number">{messageCount}</span>
          <span>Messages</span>
        </Link>

        <Link to="/dashboard/messages" className="stat-card">
          <span className="stat-number">{subscriberCount}</span>
          <span>Subscribers</span>
        </Link>
      </div>

      <div className="dash-card">
        <h2>Quick actions</h2>
        <div className="button-row">
          <Link to="/dashboard/blogs/new" className="dash-btn dash-btn-primary">Write a new post</Link>
          <Link to="/dashboard/settings" className="dash-btn dash-btn-light">Change site name or logo</Link>
          <Link to="/dashboard/colors" className="dash-btn dash-btn-light">Change colors</Link>
        </div>
      </div>
    </>
  );
}

export default Overview;
