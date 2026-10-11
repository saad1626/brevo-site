// components/Navbar.jsx
// The menu at the top of every page.
// On small screens the links hide behind a "Menu" button.

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

// The menu items. To add a new page to the menu, add one line here.
const links = [
  { path: "/", label: "Home" },
  { path: "/blog", label: "Blog" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" }
];

function Navbar() {
  // true = mobile menu is open, false = closed
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Logo />

        <button
          className="menu-button"
          onClick={toggleMenu}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {links.map(function (link) {
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
