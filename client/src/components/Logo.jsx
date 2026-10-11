// components/Logo.jsx
// Shows the uploaded logo. If no logo is uploaded, it shows a simple
// bar chart icon drawn with SVG (it uses the primary color).

import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";

function Logo() {
  const { settings } = useSettings();

  let picture;

  if (settings.logo) {
    picture = <img src={settings.logo} alt={settings.siteName + " logo"} className="logo-img" />;
  } else {
    picture = (
      <svg className="logo-img" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="4" y="18" width="5" height="10" fill="var(--primary)" />
        <rect x="11" y="13" width="5" height="15" fill="var(--primary)" />
        <rect x="18" y="8" width="5" height="20" fill="var(--heading)" />
        <rect x="25" y="4" width="4" height="24" fill="var(--heading)" />
      </svg>
    );
  }

  return (
    <Link to="/" className="logo">
      {picture}
      <span className="logo-text">{settings.siteName}</span>
    </Link>
  );
}

export default Logo;
