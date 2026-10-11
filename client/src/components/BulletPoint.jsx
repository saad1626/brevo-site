// components/BulletPoint.jsx
// An orange dot, a title and a paragraph.
// Used in the "Designed for beginners" and "Platform includes" sections.

function BulletPoint(props) {
  return (
    <div className="bullet-point">
      <span className="bullet-dot" aria-hidden="true"></span>

      <div>
        <h4>{props.title}</h4>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default BulletPoint;
