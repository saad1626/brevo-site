<?php
// api/index.php
// EVERY /api/... request comes here (see the .htaccess file).
// This file looks at the URL and the method, then runs the right route file.

define("APP", true);

// Never print PHP warnings into our JSON answers (they would break them)
ini_set("display_errors", "0");

require __DIR__ . "/config.php";
require __DIR__ . "/helpers.php";

// Example: URL /api/blogs/my-post  gives  $path = "blogs/my-post"
$path = isset($_GET["path"]) ? trim($_GET["path"], "/") : "";

// Split into parts: ["blogs", "my-post"]
$parts = explode("/", $path);

$resource = $parts[0];                          // "blogs"
$id = isset($parts[1]) ? $parts[1] : "";        // "my-post" (or "" if missing)
$method = $_SERVER["REQUEST_METHOD"];           // "GET", "POST", "PUT" or "DELETE"

// Pick the route file
if ($resource === "auth") {
    require __DIR__ . "/routes/auth.php";
} else if ($resource === "settings") {
    require __DIR__ . "/routes/settings.php";
} else if ($resource === "blogs") {
    require __DIR__ . "/routes/blogs.php";
} else if ($resource === "messages") {
    require __DIR__ . "/routes/messages.php";
} else if ($resource === "subscribers") {
    require __DIR__ . "/routes/subscribers.php";
} else if ($resource === "upload") {
    require __DIR__ . "/routes/upload.php";
}

// If the route file did not send anything, the URL is wrong
sendError("API route not found.", 404);
