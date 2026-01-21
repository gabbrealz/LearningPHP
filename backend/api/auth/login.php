<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

require __DIR__ . '/../../config/bootstrap.php';
session_start();

if (isset($_SESSION['user'])) {
    http_response_code(403);
    echo json_encode(["error" => "You are already logged in."]);
    exit;
}

require __DIR__ . '/../../repository/UserRepository.php';
require __DIR__ . '/../../repository/RememberMeTokenRepository.php';
http_response_code(422);

try {
    $user = (new UserRepository($pdo))->get_user_by_email($_POST['email']);

    if ($user?->verify_password($_POST['password'])) {
        $_SESSION['user'] = $user;

        if (isset($_POST['remember-me']))
            (new RememberMeTokenRepository($pdo))->add_rememberme($user->get_id());

        http_response_code(200);
        echo json_encode(["username" => $user->name, "message" => "Successfully logged in!"]);
        exit;
    }
}
catch (PDOException $e) {
    error_log($e->getMessage());

    http_response_code(response_code: 500);
    echo json_encode(["error" => "Sorry! We cannot process your request right now."]);
    exit;
}

echo json_encode(["error" => "Incorrect email or password."]);