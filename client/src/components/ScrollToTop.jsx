// components/ScrollToTop.jsx
// When you open a new page, jump to the top of it.
// (Without this, React keeps your old scroll position.)

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const location = useLocation();

  useEffect(function () {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default ScrollToTop;
