<?php
// api/routes/subscribers.php
// Emails from the "Subscribe now" form

if (!defined("APP")) { exit; }

// POST /api/subscribers  (public)
if ($method === "POST" && $id === "") {
    $body = getBody();
    $email = strtolower(getValue($body, "email"));

    if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendError("Please enter a valid email address.", 400);
    }

    $data = readData();

    // Do not save the same email twice
    foreach ($data["subscribers"] as $subscriber) {
        if ($subscriber["email"] === $email) {
            sendJson(["message" => "You are already subscribed."]);
        }
    }

    $data["subscribers"][] = [
        "id" => makeId(),
        "email" => $email,
        "date" => nowDate()
    ];

    writeData($data);
    sendJson(["message" => "Thanks for subscribing!"], 201);
}

// GET /api/subscribers  (admin)
if ($method === "GET" && $id === "") {
    requireAdmin();

    $data = readData();
    sendJson(array_reverse($data["subscribers"]));
}
