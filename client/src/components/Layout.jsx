// components/Layout.jsx
// Every public page = Navbar on top + the page + Footer at the bottom.
// <Outlet /> is the place where React Router puts the current page.

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="page-wrapper">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
