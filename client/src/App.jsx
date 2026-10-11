// App.jsx
// This file decides which page shows for which URL (the "routes").

import { Routes, Route } from "react-router-dom";
import { useSettings } from "./context/SettingsContext";

import Layout from "./components/Layout";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import Login from "./dashboard/Login";
import DashboardLayout from "./dashboard/DashboardLayout";
import Overview from "./dashboard/Overview";
import SiteSettings from "./dashboard/SiteSettings";
import ColorSettings from "./dashboard/ColorSettings";
import BlogList from "./dashboard/BlogList";
import BlogForm from "./dashboard/BlogForm";
import Messages from "./dashboard/Messages";

function App() {
  const { settings, error } = useSettings();

  // The backend is not reachable
  if (error) {
    return (
      <div className="server-error">
        <h1>Website is not available</h1>
        <p>{error}</p>
      </div>
    );
  }

  // Settings are still loading
  if (!settings) {
    return <Loader />;
  }

  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Public website: every page here gets the Navbar and Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Dashboard */}
        <Route path="/dashboard/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="settings" element={<SiteSettings />} />
          <Route path="colors" element={<ColorSettings />} />
          <Route path="blogs" element={<BlogList />} />
          <Route path="blogs/new" element={<BlogForm />} />
          <Route path="blogs/edit/:id" element={<BlogForm />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
