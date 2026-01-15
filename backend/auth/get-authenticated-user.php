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

if (count($_COOKIE) > 0) {
    if (isset($_COOKIE["LEARNINGPHP_REMEMBERME_COOKIE"])) {
        $cookie_key = $_COOKIE["LEARNINGPHP_REMEMBERME_COOKIE"];

        $rememberme_data_file = "../data/remember-me.json";
        try { $rememberme_data = json_decode(file_get_contents($rememberme_data_file), true); }
        catch (Exception $e) { $rememberme_data = []; }

        if (isset($rememberme_data[$cookie_key])) {
            $user_rememberme = $rememberme_data[$cookie_key];

            $user_data_file = "../data/users.json";
            try { $user_data = json_decode(file_get_contents($user_data_file), true); }
            catch (Exception $e) { $user_data = ["users" => []]; }
            $users = $user_data["users"];

            if (isset($users[$user_rememberme["user_id"]])) {
                $_SESSION["user_id"] = $user_rememberme["user_id"];
                $_SESSION["user_name"] = $users[$user_rememberme["user_id"]]["user_name"];

                echo json_encode(["authenticated" => true, "username" => $_SESSION["user_name"]]);
                exit;
            }
        }
        else {
            setcookie("LEARNINGPHP_REMEMBER_ME", $cookie_key, time() - 3600, "/");
            // Put code here that erases the cookie in json   
        }
    }
}

echo json_encode(["authenticated" => false]);