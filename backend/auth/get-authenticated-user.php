<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") exit;
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    exit;
}

http_response_code(200);

if (isset($_SESSION["user_id"])) {
    echo json_encode(["authenticated" => true, "username" => $_SESSION["user_name"]]);
    exit;
}

if (isset($_COOKIE["LEARNINGPHP_REMEMBERME_COOKIE"])) {
    $cookie_key = $_COOKIE["LEARNINGPHP_REMEMBERME_COOKIE"];

    $rememberme_data_file = "../data/remember-me.json";
    $rememberme_data = file_exists($rememberme_data_file) ?
        json_decode(file_get_contents($rememberme_data_file), true) ?? []
        : [];

    if (isset($rememberme_data[$cookie_key])) {
        $user_id = $rememberme_data[$cookie_key]["user_id"];

        $user_data_file = "../data/users.json";
        $user_data = file_exists($user_data_file) ?
            json_decode(file_get_contents($user_data_file), true) ?? ["users" => []]
            : ["users" => []];
        $users = $user_data["users"];

        if (isset($users[$user_id])) {
            $_SESSION["user_id"] = $user_id;
            $_SESSION["user_name"] = $users[$user_id]["username"];

            echo json_encode(["authenticated" => true, "username" => $_SESSION["user_name"]]);
            exit;
        }
    }
    else {
        setcookie("LEARNINGPHP_REMEMBERME_COOKIE", $cookie_key, time() - 3600, "/", "", false, true);
        unset($rememberme_data[$cookie_key]);
        file_put_contents($rememberme_data_file, json_encode($rememberme_data, JSON_PRETTY_PRINT));
    }
}

echo json_encode(["authenticated" => false]);