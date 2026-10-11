// dashboard/SiteSettings.jsx
// Change the site name, logo, emails, phone number and social links.
// After saving, the whole website updates straight away.

import { useState } from "react";
import { updateSettings } from "../api";
import { useSettings } from "../context/SettingsContext";
import usePageTitle from "../hooks/usePageTitle";
import PageHeader from "./PageHeader";
import Field from "./Field";
import ImageUpload from "./ImageUpload";
import Alert from "../components/Alert";

function SiteSettings() {
  const { settings, setSettings } = useSettings();
  usePageTitle("Site settings");

  // Start each input with the value that is saved now
  const [siteName, setSiteName] = useState(settings.siteName);
  const [logo, setLogo] = useState(settings.logo);
  const [email, setEmail] = useState(settings.email);
  const [supportEmail, setSupportEmail] = useState(settings.supportEmail);
  const [phone, setPhone] = useState(settings.phone);
  const [facebook, setFacebook] = useState(settings.facebook);
  const [twitter, setTwitter] = useState(settings.twitter);
  const [youtube, setYoutube] = useState(settings.youtube);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setSuccess("");
    setError("");

    if (siteName.trim() === "") {
      setError("Site name can not be empty.");
      return;
    }

    setSaving(true);

    try {
      const newSettings = await updateSettings({
        siteName: siteName,
        logo: logo,
        email: email,
        supportEmail: supportEmail,
        phone: phone,
        facebook: facebook,
        twitter: twitter,
        youtube: youtube
      });

      // Put the new settings in the context: Navbar, Footer, pages all update
      setSettings(newSettings);
      setSuccess("Settings saved. The website is updated.");
    } catch (err) {
      setError(err.message);
    }

    setSaving(false);
  }

  return (
    <>
      <PageHeader title="Site settings" text="These details appear across the whole website." />

      <form onSubmit={handleSubmit}>
        <div className="dash-card">
          <h2>Brand</h2>
          <Field label="Site name" value={siteName} onChange={setSiteName} required hint="Shown in the navbar, footer and browser tab." />
          <ImageUpload label="Logo" value={logo} onChange={setLogo} />
        </div>

        <div className="dash-card">
          <h2>Contact details</h2>
          <div className="dash-two-columns">
            <Field label="Main email" type="email" value={email} onChange={setEmail} />
            <Field label="Support email" type="email" value={supportEmail} onChange={setSupportEmail} />
          </div>
          <Field label="Phone number" type="tel" value={phone} onChange={setPhone} />
        </div>

        <div className="dash-card">
          <h2>Social media</h2>
          <p className="field-hint">Leave a box empty to hide that icon on the website.</p>
          <Field label="Facebook URL" type="url" value={facebook} onChange={setFacebook} />
          <Field label="Twitter URL" type="url" value={twitter} onChange={setTwitter} />
          <Field label="YouTube URL" type="url" value={youtube} onChange={setYoutube} />
        </div>

        <div className="dash-save-bar">
          <Alert type="success" text={success} />
          <Alert type="error" text={error} />

          <button type="submit" className="dash-btn dash-btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save settings"}
          </button>
        </div>
      </form>
    </>
  );
}

export default SiteSettings;
