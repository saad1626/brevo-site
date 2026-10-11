// context/SettingsContext.jsx
// "Context" lets ANY component read the settings without passing props
// through every level. The Navbar, Footer, Contact page etc. all use it.
//
// When the dashboard saves new settings, we update them here,
// and every part of the website changes at the same time.

import { createContext, useContext, useEffect, useState } from "react";
import { getSettings } from "../api";

const SettingsContext = createContext(null);

// Puts each color into a CSS variable on the <html> tag.
// Example: colors.primary = "#E67E00" becomes  --primary: #E67E00
// All our CSS uses var(--primary), so all buttons change together.
export function applyColors(colors) {
  const root = document.documentElement;

  for (const name in colors) {
    root.style.setProperty("--" + name, colors[name]);
  }
}

export function SettingsProvider(props) {
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState("");

  async function loadSettings() {
    try {
      const data = await getSettings();
      setSettings(data);
      setError("");
    } catch (err) {
      setError("Could not connect to the server. Is the backend running?");
    }
  }

  // Load the settings once, when the website opens
  useEffect(function () {
    loadSettings();
  }, []);

  // Every time the settings change, apply the colors again
  useEffect(function () {
    if (settings) {
      applyColors(settings.colors);
    }
  }, [settings]);

  const value = {
    settings: settings,
    setSettings: setSettings,
    error: error,
    reloadSettings: loadSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {props.children}
    </SettingsContext.Provider>
  );
}

// A small shortcut so components can write:  const { settings } = useSettings();
export function useSettings() {
  return useContext(SettingsContext);
}
