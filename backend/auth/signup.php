<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") exit;
else if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    http_response_code(405);
    exit;
}

$username_pattern = "/^[A-Za-z0-9_]+$/";
http_response_code(422);

if (!preg_match($username_pattern, $_POST["username"])) {
    echo json_encode(["error" => "Username can only have A-Z, 0-9, and underscore."]);
    exit;
}
else if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "Email is invalid."]);
    exit;
}
else if ($_POST["password"] !== $_POST["confirm-password"]) {
    echo json_encode(["error" => "Passwords do not match."]);
    exit;
}
else if (strlen($_POST["password"]) < 8) {
    echo json_encode(["error" => "Password must be at least 8 characters."]);
    exit;
}
else if (!preg_match("/\d/", $_POST["password"]) || !preg_match("/[A-Z]/", $_POST["password"])) {
    echo json_encode(["error" => "Password must have at least 1 digit and 1 upper-case letter."]);
    exit;
}

$user_data_file = "../data/users.json";
$user_data_dir = dirname($user_data_file);

if (!is_dir($user_data_dir)) mkdir($user_data_dir, 0777, true);

$data = file_exists($user_data_file) ?
    json_decode(file_get_contents($user_data_file), true) ?? ["id_index" => 0, "users" => []]
    : ["id_index" => 0, "users" => []];
    
$data["id_index"] += 1;

foreach ($data["users"] as $id => $user) {
    if ($user["email"] === $_POST["email"]) {
        echo json_encode(["error" => "Email is already registered."]);
        exit;
    }
}

$password_hash = password_hash($_POST["password"], PASSWORD_BCRYPT, ["cost" => 12]);

$data["users"][$data["id_index"]] = [
    "username" => $_POST["username"],
    "email" => $_POST["email"],
    "password" => $password_hash
];

file_put_contents($user_data_file, json_encode($data, JSON_PRETTY_PRINT));
http_response_code(201);
echo json_encode(["message" => "User created successfully!"]);