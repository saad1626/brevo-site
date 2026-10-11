// components/Alert.jsx
// A colored message box for success or error messages.
// If there is no text, it shows nothing.

function Alert(props) {
  if (!props.text) {
    return null;
  }

  let className = "alert alert-success";

  if (props.type === "error") {
    className = "alert alert-error";
  }

  return (
    <p className={className} role="status">
      {props.text}
    </p>
  );
}

export default Alert;
