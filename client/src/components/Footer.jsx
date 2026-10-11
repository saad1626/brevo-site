// components/Footer.jsx
// The bottom of every page. Site name, email and phone come from the dashboard.

import { useSettings } from "../context/SettingsContext";

function Footer() {
  const { settings } = useSettings();

  // The current year, so we never need to update it by hand
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {year} {settings.siteName}</p>

        <p className="footer-contact">
          <a href={"mailto:" + settings.email}>{settings.email}</a>
          <span> | </span>
          <a href={"tel:" + settings.phone}>{settings.phone}</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
