<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") exit;
else if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    http_response_code(405);
    exit;
}

$username_pattern = "/^[A-Za-z0-9_]+$/";
$email_pattern = "/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/";

http_response_code(422);

if (!preg_match($username_pattern, $_POST["username"])) {
    echo json_encode(["error" => "Username can only have A-Z, 0-9, and underscore."]);
    exit;
}
else if (!preg_match($email_pattern, $_POST["email"])) {
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

$password_hash = password_hash($_POST["password"], PASSWORD_BCRYPT, ["cost" => 12]);
$user_data_file = "user-data.json";

if (file_exists($user_data_file)) {
    $data = json_decode(file_get_contents($user_data_file), true);
    $data["id_index"] += 1;
}
else $data = ["id_index" => 1, "users" => []];

foreach ($data["users"] as $user) {
    if ($user["username"] === $_POST["username"]) {
        echo json_encode(["error" => "Username already exists."]);
        exit;
    }
    if ($user["email" === $_POST["email"]]) {
        echo json_encode(["error" => "Email is already registered."]);
        exit;
    }
}

array_push($data["users"], [
    "id" => $data["id_index"],
    "username" => $_POST["username"],
    "email"=> $_POST["email"],
    "password"=> $password_hash,
]);

file_put_contents($user_data_file, json_encode($data, JSON_PRETTY_PRINT));
http_response_code(201);
echo json_encode(["message" => "User created successfully!"]);