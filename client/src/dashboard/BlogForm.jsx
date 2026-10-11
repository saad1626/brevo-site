// dashboard/BlogForm.jsx
// ONE form for both "New post" and "Edit post".
// If the URL has an id (/dashboard/blogs/edit/123) we are editing.
// If not (/dashboard/blogs/new) we are creating.

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBlogs, createBlog, updateBlog } from "../api";
import usePageTitle from "../hooks/usePageTitle";
import PageHeader from "./PageHeader";
import Field from "./Field";
import ImageUpload from "./ImageUpload";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

function BlogForm() {
  const params = useParams();
  const navigate = useNavigate();

  // true when editing, false when creating
  const isEditing = params.id !== undefined;

  usePageTitle(isEditing ? "Edit post" : "New post");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Email Marketing");
  const [author, setAuthor] = useState("Admin");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // When editing, load the post and fill the form
  useEffect(function () {
    if (!isEditing) {
      return;
    }

    async function loadPost() {
      try {
        const blogs = await getBlogs();
        let found = null;

        for (let i = 0; i < blogs.length; i++) {
          if (blogs[i].id === params.id) {
            found = blogs[i];
          }
        }

        if (found) {
          setTitle(found.title);
          setCategory(found.category);
          setAuthor(found.author);
          setImage(found.image);
          setContent(found.content);
        } else {
          setError("This post does not exist. It may have been deleted.");
        }
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    }

    loadPost();
  }, [isEditing, params.id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (title.trim() === "" || content.trim() === "") {
      setError("Title and content are required.");
      return;
    }

    const blog = {
      title: title,
      category: category,
      author: author,
      image: image,
      content: content
    };

    setSaving(true);

    try {
      if (isEditing) {
        await updateBlog(params.id, blog);
      } else {
        await createBlog(blog);
      }

      // Go back to the list after saving
      navigate("/dashboard/blogs");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader
        title={isEditing ? "Edit post" : "New post"}
        action={<Link to="/dashboard/blogs" className="dash-btn dash-btn-light">Cancel</Link>}
      />

      <form className="dash-card" onSubmit={handleSubmit}>
        <Field label="Title" value={title} onChange={setTitle} required />

        <div className="dash-two-columns">
          <Field label="Category" value={category} onChange={setCategory} />
          <Field label="Author" value={author} onChange={setAuthor} />
        </div>

        <ImageUpload label="Cover image" value={image} onChange={setImage} />

        <Field
          label="Content"
          value={content}
          onChange={setContent}
          multiline
          rows={14}
          required
          hint="Leave an empty line between paragraphs."
        />

        <Alert type="error" text={error} />

        <button type="submit" className="dash-btn dash-btn-primary" disabled={saving}>
          {saving ? "Saving..." : isEditing ? "Save changes" : "Publish post"}
        </button>
      </form>
    </>
  );
}

export default BlogForm;
