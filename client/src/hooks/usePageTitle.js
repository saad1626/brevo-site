// hooks/usePageTitle.js
// Changes the text on the browser tab, for example "Blog | Brevo Email Marketing"
// A "hook" is just a function whose name starts with "use".

import { useEffect } from "react";
import { useSettings } from "../context/SettingsContext";

export default function usePageTitle(title) {
  const { settings } = useSettings();

  useEffect(function () {
    document.title = title + " | " + settings.siteName;
  }, [title, settings.siteName]);
}
