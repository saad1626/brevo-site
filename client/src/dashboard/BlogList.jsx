// dashboard/BlogList.jsx
// A table of all blog posts with Edit and Delete buttons

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs, deleteBlog } from "../api";
import usePageTitle from "../hooks/usePageTitle";
import PageHeader from "./PageHeader";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import { formatDate } from "../utils";

function BlogList() {
  usePageTitle("Blog posts");

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadBlogs() {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  useEffect(function () {
    loadBlogs();
  }, []);

  async function handleDelete(blog) {
    // Always ask before deleting
    const sure = window.confirm('Delete "' + blog.title + '"? This can not be undone.');

    if (!sure) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await deleteBlog(blog.id);
      setSuccess("Post deleted.");
      loadBlogs();
    } catch (err) {
      setError(err.message);
    }
  }

  const newButton = <Link to="/dashboard/blogs/new" className="dash-btn dash-btn-primary">New post</Link>;

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader title="Blog posts" text="Posts here show on the Blog page of the website." action={newButton} />

      <Alert type="success" text={success} />
      <Alert type="error" text={error} />

      {blogs.length === 0 ? (
        <div className="dash-card empty-state">
          <p>No posts yet. Write your first post to fill the Blog page.</p>
          {newButton}
        </div>
      ) : (
        <div className="dash-card table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map(function (blog) {
                return (
                  <tr key={blog.id}>
                    <td>
                      <a href={"/blog/" + blog.slug} target="_blank" rel="noreferrer">{blog.title}</a>
                    </td>
                    <td>{blog.category}</td>
                    <td>{formatDate(blog.date)}</td>
                    <td className="table-actions">
                      <Link to={"/dashboard/blogs/edit/" + blog.id} className="dash-btn dash-btn-light dash-btn-small">
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="dash-btn dash-btn-danger-light dash-btn-small"
                        onClick={function () { handleDelete(blog); }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default BlogList;
