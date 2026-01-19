<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") exit;
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

require(__DIR__ . '/../../config/bootstrap.php');
session_start();

http_response_code(401);

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "User is not logged in."]);
}

try {
    if (isset($_COOKIE[$_ENV['REMEMBERME_COOKIE_NAME']])) {
        $cookie_key = $_COOKIE[$_ENV['REMEMBERME_COOKIE_NAME']];

        $remove_rememberme_data = $pdo->prepare('DELETE FROM `RememberMe` WHERE id = ?');
        $remove_rememberme_data->execute([$cookie_key]);
        
        setcookie($_ENV['REMEMBERME_COOKIE_NAME'], $cookie_key, time() - 3600, "/", "", false, true);
    }
}
catch (PDOException $e) {
    error_log($e->getMessage());
    echo json_encode(["error" => "Sorry! We cannot process your request right now."]);
    exit;
}

session_unset();
session_destroy();
http_response_code(200);
echo json_encode(["message" => "User has been logged out."]);