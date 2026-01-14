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

if (isset($_SESSION["user_id"])) {
    session_unset();
    session_destroy();
    http_response_code(200);
    echo json_encode(["message" => "User has been logged out."]);
    exit;
}

http_response_code(401);
echo json_encode(["error" => "User is not logged in."]);