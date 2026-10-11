// dashboard/PageHeader.jsx
// Title at the top of each dashboard page, with an optional button on the right

function PageHeader(props) {
  return (
    <div className="dash-header">
      <div>
        <h1>{props.title}</h1>
        {props.text && <p>{props.text}</p>}
      </div>

      {props.action}
    </div>
  );
}

export default PageHeader;
