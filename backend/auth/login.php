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
if (!is_dir($user_data_dir)) mkdir($user_data_dir, 0777, true);

http_response_code(422);

try { $data = json_decode(file_get_contents($user_data_file), true); }
catch (Exception $e) {
    echo json_encode(["error" => "User does not exist."]);
    exit;
}

$username_or_email = filter_var($_POST["username-or-email"], FILTER_VALIDATE_EMAIL) ? "email" : "username";

foreach ($data["users"] as $user) {
    if ($_POST["username-or-email"] === $user[$username_or_email]) {
        if (password_verify($_POST["password"], $user["password"])) {

            $_SESSION["user_id"] = $user["id"];
            $_SESSION["user_name"] = $user["username"];

            if (count($_COOKIE) > 0 && isset($_POST["remember-me"])) {
                $rememberme_data_file = "../data/remember-me.json";
                try { $rememberme_data = json_decode(file_get_contents($rememberme_data_file), true); }
                catch (Exception $e) { $rememberme_data = []; }

                $rememberme_cookie_key = generate_uuid_v4();
                $expiry_duration = 60*60*24*7;

                setcookie("LEARNINGPHP_REMEMBERME_COOKIE", $rememberme_cookie_key, $expiry_duration, "/");

                $rememberme_data[$rememberme_cookie_key] = ["user_id" => $user["id"], "expiry_timestamp" => time()+$expiry_duration];
                file_put_contents($rememberme_data_file, json_encode($rememberme_data, JSON_PRETTY_PRINT));
            }

            http_response_code(200);
            echo json_encode(["username" => $user["username"], "message" => "Successfully logged in!"]);
            exit;
        }
        break;
    }
}

echo json_encode(["error" => "Incorrect $username_or_email or password."]);


function generate_uuid_v4() {
    $data = random_bytes(16);
    
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}