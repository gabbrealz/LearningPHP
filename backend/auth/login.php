<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") exit;
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$email_pattern = "/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/";

$password_hash = password_hash($_POST["password"], PASSWORD_BCRYPT, ["cost" => 12]);
$user_data_file = "user-data.json";
http_response_code(422);

if (file_exists($user_data_file))
    $data = json_decode(file_get_contents($user_data_file), true);
else {
    echo json_encode(["error" => "User does not exist."]);
    exit;
}

$username_or_email = preg_match($email_pattern, $_POST["username-or-email"]) ? "email" : "username";

foreach ($data["users"] as $user) {
    if ($_POST["username-or-email"] === $user[$username_or_email]) {
        if (password_verify($_POST["password"], $user["password"])) {
            $_SESSION["user_id"] = $user["id"];
            http_response_code(200);
            echo json_encode(["message" => "Successfully logged in!"]);
            exit;   
        }
        break;
    }
}

echo json_encode(["error" => "Incorrect username or password."]);