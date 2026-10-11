// components/Button.jsx
// ONE button component for the whole website.
// Its color comes from the CSS variable --primary, which the dashboard controls.
//
// How to use it:
//   <Button to="/contact">Get started</Button>            (a link to a page)
//   <Button onClick={doSomething}>Save</Button>            (a normal button)
//   <Button type="submit">Send</Button>                    (inside a form)
//   <Button variant="dark" to="/about">More detail</Button>

import { Link } from "react-router-dom";

function Button(props) {
  // Pick the CSS class. "primary" is the default.
  let className = "btn btn-primary";

  if (props.variant === "dark") {
    className = "btn btn-dark";
  }

  if (props.variant === "outline") {
    className = "btn btn-outline";
  }

  if (props.full) {
    className = className + " btn-full";
  }

  // If "to" is given, it is a link to another page
  if (props.to) {
    return (
      <Link to={props.to} className={className}>
        {props.children}
      </Link>
    );
  }

  // Otherwise it is a real <button>
  return (
    <button
      type={props.type || "button"}
      className={className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;
