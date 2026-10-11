// api.js
// ALL communication with the backend lives in this one file.
// Pages never call fetch() directly. They call these small functions.
// This way, if the backend URL changes, we only change it here.

// The website and the PHP API are on the same hosting, so "/api" is enough.
const API_URL = "/api";

// One helper that every function below uses
// method: "GET", "POST", "PUT" or "DELETE"
// path:   for example "/blogs"
// body:   the data to send (optional)
async function request(method, path, body) {
  const options = {
    method: method,
    headers: {}
  };

  // If the admin is logged in, send the token with the request
  const token = localStorage.getItem("adminToken");

  // We use our own header name "X-Admin-Token".
  // (Some shared hosting servers remove the normal "Authorization" header.)
  if (token) {
    options.headers["X-Admin-Token"] = token;
  }

  // If we have data to send, turn it into JSON text
  if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const response = await fetch(API_URL + path, options);
  const data = await response.json();

  // response.ok is true for status 200-299
  // For anything else we throw an error with the server's message
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

// ---------- Login ----------
export function login(password) {
  return request("POST", "/auth/login", { password: password });
}

export function checkLogin() {
  return request("GET", "/auth/check");
}

// ---------- Settings ----------
export function getSettings() {
  return request("GET", "/settings");
}

export function updateSettings(newSettings) {
  return request("PUT", "/settings", newSettings);
}

// ---------- Blogs ----------
export function getBlogs() {
  return request("GET", "/blogs");
}

export function getBlog(slug) {
  return request("GET", "/blogs/" + slug);
}

export function createBlog(blog) {
  return request("POST", "/blogs", blog);
}

export function updateBlog(id, blog) {
  return request("PUT", "/blogs/" + id, blog);
}

export function deleteBlog(id) {
  return request("DELETE", "/blogs/" + id);
}

// ---------- Messages and subscribers ----------
export function sendMessage(message) {
  return request("POST", "/messages", message);
}

export function getMessages() {
  return request("GET", "/messages");
}

export function deleteMessage(id) {
  return request("DELETE", "/messages/" + id);
}

export function subscribe(email) {
  return request("POST", "/subscribers", { email: email });
}

export function getSubscribers() {
  return request("GET", "/subscribers");
}

// ---------- Image upload ----------
// Files can not be sent as JSON, so we use FormData instead
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(API_URL + "/upload", {
    method: "POST",
    headers: { "X-Admin-Token": localStorage.getItem("adminToken") },
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Upload failed.");
  }

  return data.url;
}
