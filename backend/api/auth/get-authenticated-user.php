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
require __DIR__ . '/../../popo/User.php';
session_start();

require __DIR__ . '/../../repository/UserRepository.php';
require __DIR__ . '/../../repository/RememberMeTokenRepository.php';
http_response_code(200);

if (isset($_SESSION["user"])) {
    echo json_encode(["authenticated" => true, "user" => $_SESSION["user"]]);
    exit;
}

if (isset($_COOKIE[$_ENV['REMEMBERME_COOKIE_NAME']])) {
    try {
        $rememberme_repo = new RememberMeTokenRepository($pdo);
        $user = $rememberme_repo->get_user_data();

        if ($user) {
            $_SESSION['user'] = $user;
            echo json_encode(["authenticated" => true, "user" => $user->name]);
            exit;
        }
        else $rememberme_repo->remove_rememberme();
    }
    catch (PDOException $e) { error_log($e->getMessage()); }
}

echo json_encode(["authenticated" => false]);