<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") exit;
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$user_data_file = "../data/users.json";
$user_data_dir = dirname($user_data_file);
http_response_code(422);

try {
    if (!is_dir($user_data_dir) || !file_exists($user_data_file))
        throw new Exception();
    
    $data = json_decode(file_get_contents($user_data_file), true);

    if (!(is_array($data) && array_key_exists("id_index", $data) && is_int($data["id_index"]) && array_key_exists("users", $data) && is_array($data["users"])))
        throw new Exception();
}
catch (Exception $e) {
    echo json_encode(["error" => "User does not exist."]);
    exit;
}

$email_pattern = "/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/";
$username_or_email = preg_match($email_pattern, $_POST["username-or-email"]) ? "email" : "username";

foreach ($data["users"] as $user) {
    if ($_POST["username-or-email"] === $user[$username_or_email]) {
        if (password_verify($_POST["password"], $user["password"])) {
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["user_name"] = $user["username"];
            http_response_code(200);
            echo json_encode(["username" => $user["username"], "message" => "Successfully logged in!"]);
            exit;   
        }
        break;
    }
}

echo json_encode(["error" => "Incorrect $username_or_email or password."]);