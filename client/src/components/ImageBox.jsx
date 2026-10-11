// components/ImageBox.jsx
// Shows an image. If there is no image, or it fails to load,
// it shows a grey box with the description instead.

import { useState } from "react";

function ImageBox(props) {
  const [failed, setFailed] = useState(false);

  let className = "image-box";

  if (props.className) {
    className = className + " " + props.className;
  }

  // No picture, or the picture is broken: show the grey box
  if (!props.src || failed) {
    return (
      <div className={className + " image-placeholder"} role="img" aria-label={props.alt}>
        <span>{props.alt}</span>
      </div>
    );
  }

  return (
    <img
      src={props.src}
      alt={props.alt}
      className={className}
      onError={function () {
        setFailed(true);
      }}
    />
  );
}

export default ImageBox;
