<?php
// api/routes/messages.php
// Messages from the Contact page form

if (!defined("APP")) { exit; }

// POST /api/messages  (public)
if ($method === "POST" && $id === "") {
    $body = getBody();

    $message = getValue($body, "message");
    $email = getValue($body, "email");

    if ($message === "") {
        sendError("Message is required.", 400);
    }

    if ($email !== "" && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendError("Please enter a valid email address.", 400);
    }

    $data = readData();

    $data["messages"][] = [
        "id" => makeId(),
        "name" => getValue($body, "name"),
        "email" => $email,
        "phone" => getValue($body, "phone"),
        "subject" => getValue($body, "subject"),
        "message" => $message,
        "date" => nowDate()
    ];

    writeData($data);
    sendJson(["message" => "Thank you! Your message has been sent."], 201);
}

// GET /api/messages  (admin) - newest first
if ($method === "GET" && $id === "") {
    requireAdmin();

    $data = readData();
    sendJson(array_reverse($data["messages"]));
}

// DELETE /api/messages/123  (admin)
if ($method === "DELETE" && $id !== "") {
    requireAdmin();

    $data = readData();
    $foundIndex = -1;

    for ($i = 0; $i < count($data["messages"]); $i++) {
        if ($data["messages"][$i]["id"] === $id) {
            $foundIndex = $i;
        }
    }

    if ($foundIndex === -1) {
        sendError("Message not found.", 404);
    }

    array_splice($data["messages"], $foundIndex, 1);
    writeData($data);

    sendJson(["message" => "Message deleted."]);
}
