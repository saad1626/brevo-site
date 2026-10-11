// components/SectionHeading.jsx
// A small label + a big title. Used at the top of many sections.
// props.center = true puts it in the middle.

function SectionHeading(props) {
  let className = "section-heading";

  if (props.center) {
    className = className + " center";
  }

  return (
    <div className={className}>
      {props.label && <p className="section-label">{props.label}</p>}
      <h2>{props.title}</h2>
    </div>
  );
}

export default SectionHeading;
