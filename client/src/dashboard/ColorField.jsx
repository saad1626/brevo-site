// dashboard/ColorField.jsx
// A color picker + a text box showing the color code (like #E67E00).
// You can click the colored square OR type the code.

function ColorField(props) {
  function handleChange(event) {
    props.onChange(event.target.value.toUpperCase());
  }

  return (
    <div className="color-field">
      <input
        type="color"
        value={props.value}
        onChange={handleChange}
        aria-label={props.label}
      />

      <div className="color-field-text">
        <span className="field-label">{props.label}</span>
        <span className="field-hint">{props.hint}</span>
      </div>

      <input
        type="text"
        className="color-code"
        value={props.value}
        onChange={handleChange}
        maxLength={7}
        aria-label={props.label + " code"}
      />
    </div>
  );
}

export default ColorField;
