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

require __DIR__ . '/../../config/bootstrap.php';
session_start();

require __DIR__ . '/../../repository/RememberMeTokenRepository.php';
http_response_code(response_code: 401);

if (!isset($_SESSION['user'])) {
    echo json_encode(["error" => "User is not logged in."]);
    exit;
}

try {
    if (isset($_COOKIE[$_ENV['REMEMBERME_COOKIE_NAME']]))
        (new RememberMeTokenRepository($pdo))->remove_rememberme();
}
catch (PDOException $e) {
    error_log($e->getMessage());
    
    http_response_code(response_code: 500);
    echo json_encode(["error" => "Sorry! We cannot process your request right now."]);
    exit;
}

session_unset();
session_destroy();
http_response_code(200);
echo json_encode(["message" => "User has been logged out."]);