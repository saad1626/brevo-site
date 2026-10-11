<?php
// api/routes/blogs.php
// Create, read, update and delete blog posts

if (!defined("APP")) { exit; }

// "Brevo Free Plan Guide!"  becomes  "brevo-free-plan-guide"
function makeSlug($title) {
    $slug = strtolower($title);

    // Replace everything that is not a letter or number with "-"
    $slug = preg_replace('/[^a-z0-9]+/', "-", $slug);

    // Remove "-" from the start and end
    $slug = trim($slug, "-");

    if ($slug === "") {
        $slug = "post";
    }

    return $slug;
}

// Is another post already using this slug?
function slugIsTaken($slug, $blogs, $currentId) {
    foreach ($blogs as $blog) {
        if ($blog["slug"] === $slug && $blog["id"] !== $currentId) {
            return true;
        }
    }

    return false;
}

// "my-post", then "my-post-2", "my-post-3" ... until it is free
function makeUniqueSlug($title, $blogs, $currentId) {
    $baseSlug = makeSlug($title);
    $slug = $baseSlug;
    $number = 2;

    while (slugIsTaken($slug, $blogs, $currentId)) {
        $slug = $baseSlug . "-" . $number;
        $number = $number + 1;
    }

    return $slug;
}

// Position of a post in the array, or -1 if not found
function findBlogIndex($blogs, $id) {
    for ($i = 0; $i < count($blogs); $i++) {
        if ($blogs[$i]["id"] === $id) {
            return $i;
        }
    }

    return -1;
}

// Check the form. Returns an error message, or "" if all good.
function validateBlog($body) {
    if (getValue($body, "title") === "") {
        return "Title is required.";
    }

    if (getValue($body, "content") === "") {
        return "Content is required.";
    }

    return "";
}

// GET /api/blogs  (public) - newest first
if ($method === "GET" && $id === "") {
    $data = readData();
    sendJson(array_reverse($data["blogs"]));
}

// GET /api/blogs/some-slug  (public) - one post
if ($method === "GET" && $id !== "") {
    $data = readData();

    foreach ($data["blogs"] as $blog) {
        if ($blog["slug"] === $id) {
            sendJson($blog);
        }
    }

    sendError("Blog post not found.", 404);
}

// POST /api/blogs  (admin) - new post
if ($method === "POST" && $id === "") {
    requireAdmin();

    $body = getBody();
    $error = validateBlog($body);

    if ($error !== "") {
        sendError($error, 400);
    }

    $data = readData();

    $category = getValue($body, "category");
    $author = getValue($body, "author");

    $newBlog = [
        "id" => makeId(),
        "title" => getValue($body, "title"),
        "slug" => makeUniqueSlug(getValue($body, "title"), $data["blogs"], null),
        "category" => $category !== "" ? $category : "Email Marketing",
        "author" => $author !== "" ? $author : "Admin",
        "image" => getValue($body, "image"),
        "content" => getValue($body, "content"),
        "date" => nowDate()
    ];

    $data["blogs"][] = $newBlog;
    writeData($data);

    sendJson($newBlog, 201);
}

// PUT /api/blogs/123  (admin) - edit a post
if ($method === "PUT" && $id !== "") {
    requireAdmin();

    $body = getBody();
    $error = validateBlog($body);

    if ($error !== "") {
        sendError($error, 400);
    }

    $data = readData();
    $index = findBlogIndex($data["blogs"], $id);

    if ($index === -1) {
        sendError("Blog post not found.", 404);
    }

    $blog = $data["blogs"][$index];

    $blog["title"] = getValue($body, "title");
    $blog["slug"] = makeUniqueSlug($blog["title"], $data["blogs"], $blog["id"]);

    if (getValue($body, "category") !== "") {
        $blog["category"] = getValue($body, "category");
    }

    if (getValue($body, "author") !== "") {
        $blog["author"] = getValue($body, "author");
    }

    $blog["image"] = getValue($body, "image");
    $blog["content"] = getValue($body, "content");

    // Put the changed post back in the array
    $data["blogs"][$index] = $blog;
    writeData($data);

    sendJson($blog);
}

// DELETE /api/blogs/123  (admin)
if ($method === "DELETE" && $id !== "") {
    requireAdmin();

    $data = readData();
    $index = findBlogIndex($data["blogs"], $id);

    if ($index === -1) {
        sendError("Blog post not found.", 404);
    }

    // Remove 1 item at that position
    array_splice($data["blogs"], $index, 1);
    writeData($data);

    sendJson(["message" => "Blog post deleted."]);
}
