<?php
// dev-router.php
// ONLY for testing on your own computer with PHP's built-in server.
// (The built-in server ignores .htaccess, so this file does the same job.)
// Hostinger does not use this file. Do not upload it.
//
// Run:  php -S localhost:8000 -t public_html dev-router.php

$url = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$publicFolder = __DIR__ . "/public_html";

// Block the data folder, like .htaccess does
if (strpos($url, "/data/") === 0) {
    http_response_code(403);
    echo "Forbidden";
    return true;
}

// /api/...  ->  api/index.php
if (strpos($url, "/api/") === 0 || $url === "/api") {
    $_GET["path"] = substr($url, 5);
    require $publicFolder . "/api/index.php";
    return true;
}

// Real files (images, CSS, JS): let PHP send them as they are
if ($url !== "/" && file_exists($publicFolder . $url)) {
    return false;
}

// Everything else: the React app
readfile($publicFolder . "/index.html");
return true;
