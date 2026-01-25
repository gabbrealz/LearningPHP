<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") exit;
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    exit;
}

require __DIR__ . '/../../config/bootstrap.php';
require __DIR__ . '/../../repository/UserRepository.php';
session_start();


if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(['error' => 'You are currently not logged in.']);
    exit;
}

try {
    $all_users = (new UserRepository($pdo))->get_all_users($_SESSION['user']);
}
catch (PDOException $e) {
    error_Log($e->getMessage());

    http_response_code(500);
    echo json_encode(['error' => 'Sorry! We cannot process your request right now.']);
    exit;
}

http_response_code(200);
echo json_encode($all_users);