// pages/Blog.jsx
// Shows all blog posts. The posts are added from the dashboard.

import { useEffect, useState } from "react";
import { getBlogs } from "../api";
import usePageTitle from "../hooks/usePageTitle";
import PageHero from "../components/PageHero";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

function Blog() {
  usePageTitle("Blog");

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(function () {
    async function loadBlogs() {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    }

    loadBlogs();
  }, []);

  // Decide what to show inside the page
  let content;

  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <Alert type="error" text={error} />;
  } else if (blogs.length === 0) {
    content = <p className="center-text">No posts yet. New articles are on the way.</p>;
  } else {
    content = (
      <div className="blog-grid">
        {blogs.map(function (blog) {
          return <BlogCard key={blog.id} blog={blog} />;
        })}
      </div>
    );
  }

  return (
    <>
      <PageHero title="Blog" />

      <section className="section">
        <div className="container">{content}</div>
      </section>
    </>
  );
}

export default Blog;
