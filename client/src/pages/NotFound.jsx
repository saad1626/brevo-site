// pages/NotFound.jsx
// The 404 page. It shows when the URL does not match any page.

import usePageTitle from "../hooks/usePageTitle";
import Button from "../components/Button";

function NotFound() {
  usePageTitle("Page not found");

  return (
    <section className="section not-found">
      <div className="container">
        <p className="not-found-code">404</p>
        <h1>This page does not exist</h1>
        <p>The link may be old, or the address may have a typo. Check the URL or go back to the home page.</p>

        <div className="button-row center-row">
          <Button to="/">Go to home page</Button>
          <Button to="/blog" variant="dark">Read the blog</Button>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
