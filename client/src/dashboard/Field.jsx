// dashboard/Field.jsx
// A label + an input box. Used in every dashboard form.
//
//   <Field label="Site name" value={name} onChange={setName} />
//   <Field label="Content" value={text} onChange={setText} multiline />

function Field(props) {
  // When the user types, send the new text to the parent component
  function handleChange(event) {
    props.onChange(event.target.value);
  }

  let input;

  if (props.multiline) {
    input = (
      <textarea
        rows={props.rows || 10}
        value={props.value}
        onChange={handleChange}
        placeholder={props.placeholder}
        required={props.required}
      />
    );
  } else {
    input = (
      <input
        type={props.type || "text"}
        value={props.value}
        onChange={handleChange}
        placeholder={props.placeholder}
        required={props.required}
      />
    );
  }

  return (
    <label className="field">
      <span className="field-label">
        {props.label}
        {props.required && <span className="required"> *</span>}
      </span>

      {input}

      {props.hint && <span className="field-hint">{props.hint}</span>}
    </label>
  );
}

export default Field;
