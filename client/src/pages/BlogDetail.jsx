// pages/BlogDetail.jsx
// One full blog post. The URL looks like /blog/my-post-title
// useParams() gives us the "my-post-title" part (the slug).

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlog } from "../api";
import usePageTitle from "../hooks/usePageTitle";
import ImageBox from "../components/ImageBox";
import Loader from "../components/Loader";
import NotFound from "./NotFound";
import { formatDate, splitParagraphs } from "../utils";

function BlogDetail() {
  const params = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  usePageTitle(blog ? blog.title : "Blog");

  useEffect(function () {
    async function loadBlog() {
      setLoading(true);

      try {
        const data = await getBlog(params.slug);
        setBlog(data);
      } catch (err) {
        setNotFound(true);
      }

      setLoading(false);
    }

    loadBlog();
  }, [params.slug]);

  if (loading) {
    return <Loader />;
  }

  // Wrong slug: show the same 404 page
  if (notFound) {
    return <NotFound />;
  }

  const paragraphs = splitParagraphs(blog.content);

  return (
    <article className="section">
      <div className="container article">
        <Link to="/blog" className="back-link">Back to all posts</Link>

        <p className="blog-category">{blog.category}</p>
        <h1>{blog.title}</h1>
        <p className="blog-meta">By {blog.author} on {formatDate(blog.date)}</p>

        <ImageBox src={blog.image} alt={blog.title} className="article-image" />

        {paragraphs.map(function (paragraph, index) {
          return <p key={index}>{paragraph}</p>;
        })}
      </div>
    </article>
  );
}

export default BlogDetail;
