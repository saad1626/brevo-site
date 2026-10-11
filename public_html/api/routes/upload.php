<?php
// api/routes/upload.php
// Upload an image (logo or blog picture). The form field must be "image".

if (!defined("APP")) { exit; }

// POST /api/upload  (admin)
if ($method === "POST" && $id === "") {
    requireAdmin();

    if (!isset($_FILES["image"]) || $_FILES["image"]["error"] !== UPLOAD_ERR_OK) {
        sendError("Please choose an image (max 2 MB).", 400);
    }

    $file = $_FILES["image"];

    // Max 2 MB
    if ($file["size"] > 2 * 1024 * 1024) {
        sendError("The image is too big. Max 2 MB.", 400);
    }

    // Check what the file REALLY is (not just its name)
    $allowed = [
        "image/jpeg" => "jpg",
        "image/png" => "png",
        "image/gif" => "gif",
        "image/webp" => "webp"
    ];

    // The @ hides PHP warnings for files that are not images
    $info = @getimagesize($file["tmp_name"]);

    if ($info === false || !isset($allowed[$info["mime"]])) {
        sendError("Only JPG, PNG, GIF or WebP images are allowed.", 400);
    }

    // Make the uploads folder if it is missing
    if (!is_dir(UPLOADS_FOLDER)) {
        mkdir(UPLOADS_FOLDER, 0755, true);
    }

    // New file name, for example 1712345678900.png
    $fileName = makeId() . "." . $allowed[$info["mime"]];

    if (!move_uploaded_file($file["tmp_name"], UPLOADS_FOLDER . "/" . $fileName)) {
        sendError("Could not save the image. Check folder permissions.", 500);
    }

    sendJson(["url" => "/uploads/" . $fileName]);
}
