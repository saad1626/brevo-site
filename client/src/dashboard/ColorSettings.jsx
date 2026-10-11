// dashboard/ColorSettings.jsx
// Change the website colors.
// The preview on the right updates while you pick colors.
// The real website changes when you press "Save colors".

import { useState } from "react";
import { updateSettings } from "../api";
import { useSettings } from "../context/SettingsContext";
import usePageTitle from "../hooks/usePageTitle";
import PageHeader from "./PageHeader";
import ColorField from "./ColorField";
import Alert from "../components/Alert";

// The original colors. "Reset" puts these back.
const DEFAULT_COLORS = {
  primary: "#E67E00",
  primaryText: "#FFFFFF",
  navbarBg: "#FFFFFF",
  navbarText: "#4B5563",
  footerBg: "#FFFFFF",
  footerText: "#374151",
  heading: "#1F2A44",
  text: "#4B5563",
  lightSection: "#F4F5F8",
  darkSection: "#2B3240"
};

// Every color we can edit, with a name and a short explanation
const COLOR_LIST = [
  { key: "primary", label: "Primary / buttons", hint: "All buttons, links and icons" },
  { key: "primaryText", label: "Button text", hint: "Text on top of buttons" },
  { key: "navbarBg", label: "Navbar background", hint: "Top menu bar" },
  { key: "navbarText", label: "Navbar text", hint: "Menu links" },
  { key: "footerBg", label: "Footer background", hint: "Bottom of every page" },
  { key: "footerText", label: "Footer text", hint: "Copyright and contact line" },
  { key: "heading", label: "Headings", hint: "Titles and the dark button" },
  { key: "text", label: "Body text", hint: "Paragraphs" },
  { key: "lightSection", label: "Light sections", hint: "Grey background sections" },
  { key: "darkSection", label: "Dark sections", hint: "Dark background sections" }
];

// Checks one color code, for example "#E67E00"
function isValidColor(value) {
  return /^#[0-9A-Fa-f]{6}$/.test(value);
}

function ColorSettings() {
  const { settings, setSettings } = useSettings();
  usePageTitle("Colors");

  // We copy the colors with { ...settings.colors } so editing does not change
  // the real settings until we press Save
  const [colors, setColors] = useState({ ...settings.colors });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Changes one color, keeps all the others
  function changeColor(key, value) {
    const updated = { ...colors };
    updated[key] = value;
    setColors(updated);
  }

  function resetColors() {
    setColors({ ...DEFAULT_COLORS });
    setSuccess("");
    setError("");
  }

  async function saveColors() {
    setSuccess("");
    setError("");

    // Check every color before sending
    for (let i = 0; i < COLOR_LIST.length; i++) {
      const item = COLOR_LIST[i];

      if (!isValidColor(colors[item.key])) {
        setError(item.label + " must look like #E67E00.");
        return;
      }
    }

    setSaving(true);

    try {
      const newSettings = await updateSettings({ colors: colors });
      setSettings(newSettings);
      setSuccess("Colors saved. The website is updated.");
    } catch (err) {
      setError(err.message);
    }

    setSaving(false);
  }

  // The preview only shows a color when its code is complete
  function previewColor(key) {
    if (isValidColor(colors[key])) {
      return colors[key];
    }

    return settings.colors[key];
  }

  return (
    <>
      <PageHeader title="Colors" text="Pick colors on the left. Check them in the preview, then save." />

      <div className="color-layout">
        <div className="dash-card">
          {COLOR_LIST.map(function (item) {
            return (
              <ColorField
                key={item.key}
                label={item.label}
                hint={item.hint}
                value={colors[item.key]}
                onChange={function (value) { changeColor(item.key, value); }}
              />
            );
          })}
        </div>

        <div className="color-side">
          {/* A tiny version of the website, painted with the chosen colors */}
          <div className="preview" aria-label="Color preview">
            <div className="preview-nav" style={{ background: previewColor("navbarBg"), color: previewColor("navbarText") }}>
              <strong style={{ color: previewColor("heading") }}>{settings.siteName}</strong>
              <span>Home  Blog  About  Contact</span>
            </div>

            <div className="preview-body" style={{ background: previewColor("lightSection") }}>
              <h3 style={{ color: previewColor("heading") }}>A heading</h3>
              <p style={{ color: previewColor("text") }}>Some normal paragraph text on a light section.</p>
              <span className="preview-btn" style={{ background: previewColor("primary"), color: previewColor("primaryText") }}>
                Primary button
              </span>
              <span className="preview-btn" style={{ background: previewColor("heading"), color: "#FFFFFF" }}>
                Dark button
              </span>
            </div>

            <div className="preview-dark" style={{ background: previewColor("darkSection") }}>
              <span className="preview-dot" style={{ background: previewColor("primary") }}></span>
              Text on a dark section
            </div>

            <div className="preview-footer" style={{ background: previewColor("footerBg"), color: previewColor("footerText") }}>
              © {new Date().getFullYear()} {settings.siteName}
            </div>
          </div>

          <Alert type="success" text={success} />
          <Alert type="error" text={error} />

          <div className="button-row">
            <button type="button" className="dash-btn dash-btn-primary" onClick={saveColors} disabled={saving}>
              {saving ? "Saving..." : "Save colors"}
            </button>

            <button type="button" className="dash-btn dash-btn-light" onClick={resetColors}>
              Reset to default
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ColorSettings;
