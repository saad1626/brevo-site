// components/SocialLinks.jsx
// Facebook, Twitter and YouTube buttons. Links are set in the dashboard.
// If a link is empty in the dashboard, that button is hidden.

import { Facebook, Twitter, Youtube } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

function SocialLinks() {
  const { settings } = useSettings();

  const socials = [
    { name: "Facebook", url: settings.facebook, icon: Facebook },
    { name: "Twitter", url: settings.twitter, icon: Twitter },
    { name: "YouTube", url: settings.youtube, icon: Youtube }
  ];

  return (
    <div className="social-links">
      {socials.map(function (social) {
        if (!social.url) {
          return null;
        }

        const Icon = social.icon;

        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            aria-label={social.name}
            className="icon-square"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}

export default SocialLinks;
