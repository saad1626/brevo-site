<?php
// api/routes/settings.php
// Site name, logo, email, phone, social links and colors

if (!defined("APP")) { exit; }

// The only text fields the dashboard may change
$textFields = ["siteName", "logo", "email", "supportEmail", "phone", "facebook", "twitter", "youtube"];

// The only color fields the dashboard may change
$colorFields = ["primary", "primaryText", "navbarBg", "navbarText", "footerBg", "footerText", "heading", "text", "lightSection", "darkSection"];

// Checks if a value looks like a color such as #E67E00
function isValidColor($value) {
    return preg_match('/^#[0-9a-fA-F]{6}$/', $value) === 1;
}

// GET /api/settings  (public)
if ($method === "GET" && $id === "") {
    $data = readData();
    sendJson($data["settings"]);
}

// PUT /api/settings  (admin only)
if ($method === "PUT" && $id === "") {
    requireAdmin();

    $data = readData();
    $body = getBody();

    if (isset($body["siteName"]) && trim($body["siteName"]) === "") {
        sendError("Site name can not be empty.", 400);
    }

    // First check every color. If one is wrong, save nothing.
    if (isset($body["colors"]) && is_array($body["colors"])) {
        foreach ($colorFields as $field) {
            if (isset($body["colors"][$field]) && !isValidColor($body["colors"][$field])) {
                sendError("Invalid color for " . $field . ". Use a format like #E67E00.", 400);
            }
        }
    }

    // Copy the allowed text fields
    foreach ($textFields as $field) {
        if (isset($body[$field])) {
            $data["settings"][$field] = trim((string) $body[$field]);
        }
    }

    // Copy the allowed color fields
    if (isset($body["colors"]) && is_array($body["colors"])) {
        foreach ($colorFields as $field) {
            if (isset($body["colors"][$field])) {
                $data["settings"]["colors"][$field] = $body["colors"][$field];
            }
        }
    }

    writeData($data);
    sendJson($data["settings"]);
}
