// components/Loader.jsx
// Shown while data is loading

function Loader() {
  return (
    <div className="loader" role="status">
      <span className="loader-spinner"></span>
      <span className="visually-hidden">Loading</span>
    </div>
  );
}

export default Loader;
