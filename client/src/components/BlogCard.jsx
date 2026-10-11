// components/BlogCard.jsx
// One post on the Blog page

import { Link } from "react-router-dom";
import ImageBox from "./ImageBox";
import { formatDate, shortText } from "../utils";

function BlogCard(props) {
  const blog = props.blog;
  const link = "/blog/" + blog.slug;

  return (
    <article className="blog-card">
      <Link to={link} tabIndex={-1}>
        <ImageBox src={blog.image} alt={blog.title} className="blog-card-image" />
      </Link>

      <div className="blog-card-body">
        <p className="blog-category">{blog.category}</p>

        <h2 className="blog-card-title">
          <Link to={link}>{blog.title}</Link>
        </h2>

        <p className="blog-meta">
          By {blog.author} on {formatDate(blog.date)}
        </p>

        <p className="blog-excerpt">{shortText(blog.content, 220)}</p>

        <Link to={link} className="read-more">
          Read more
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;
