<?php
// api/helpers.php
// Small functions that every route uses.

// Where our JSON "database" lives
define("DB_FILE", __DIR__ . "/../data/db.json");
define("EXAMPLE_FILE", __DIR__ . "/../data/db.example.json");
define("UPLOADS_FOLDER", __DIR__ . "/../uploads");

// Read all data from db.json and return it as a PHP array
function readData() {
    // First time on a new server: make db.json from the example file
    if (!file_exists(DB_FILE)) {
        copy(EXAMPLE_FILE, DB_FILE);
    }

    $text = file_get_contents(DB_FILE);

    // true = give us arrays instead of objects (easier for beginners)
    return json_decode($text, true);
}

// Save all data back into db.json
function writeData($data) {
    $text = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

    // LOCK_EX stops two people from writing at the same moment
    file_put_contents(DB_FILE, $text, LOCK_EX);
}

// Send data back to the browser as JSON, then stop
function sendJson($data, $status = 200) {
    http_response_code($status);
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

// Shortcut for errors: sendError("Title is required.", 400)
function sendError($message, $status) {
    sendJson(["message" => $message], $status);
}

// Read the JSON that the browser sent (for POST and PUT)
function getBody() {
    $text = file_get_contents("php://input");
    $body = json_decode($text, true);

    if (!is_array($body)) {
        return [];
    }

    return $body;
}

// Get one value from the body, or "" if it is missing
function getValue($body, $key) {
    if (isset($body[$key])) {
        return trim((string) $body[$key]);
    }

    return "";
}

// The token we give after a correct login.
// It is made from the password + secret key, so it changes if you change the password.
function makeAdminToken() {
    return hash("sha256", ADMIN_PASSWORD . SECRET_KEY);
}

// Stop the request if the admin is not logged in
function requireAdmin() {
    $token = "";

    // The React app sends the token in a header called "X-Admin-Token"
    if (isset($_SERVER["HTTP_X_ADMIN_TOKEN"])) {
        $token = $_SERVER["HTTP_X_ADMIN_TOKEN"];
    }

    // hash_equals compares safely
    if ($token === "" || !hash_equals(makeAdminToken(), $token)) {
        sendError("Please log in to the dashboard first.", 401);
    }
}

// Today's date and time, like "2026-07-24T10:00:00.000Z" (same format as before)
function nowDate() {
    return gmdate("Y-m-d\TH:i:s.000\Z");
}

// A simple unique id, based on the time in milliseconds
function makeId() {
    return (string) round(microtime(true) * 1000);
}
