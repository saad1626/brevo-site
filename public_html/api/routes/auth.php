<?php
// api/routes/auth.php
// Login for the dashboard

// Stop if someone opens this file directly in the browser
if (!defined("APP")) { exit; }

// POST /api/auth/login
if ($method === "POST" && $id === "login") {
    $body = getBody();
    $password = getValue($body, "password");

    if ($password === "") {
        sendError("Password is required.", 400);
    }

    if ($password !== ADMIN_PASSWORD) {
        sendError("Wrong password.", 401);
    }

    sendJson(["token" => makeAdminToken()]);
}

// GET /api/auth/check  (is the saved token still valid?)
if ($method === "GET" && $id === "check") {
    requireAdmin();
    sendJson(["ok" => true]);
}
