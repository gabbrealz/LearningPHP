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

require(__DIR__ . '/../../config/bootstrap.php');
session_start();

http_response_code(200);

if (isset($_SESSION["user_id"])) {
    echo json_encode(["authenticated" => true, "username" => $_SESSION["user_name"]]);
    exit;
}

if (isset($_COOKIE[$_ENV['REMEMBERME_COOKIE_NAME']])) {
    $cookie_key = $_COOKIE[$_ENV['REMEMBERME_COOKIE_NAME']];
    
    try {
        $get_rememberme_data = $pdo->prepare("SELECT * FROM `RememberMe` WHERE id = ?");
        $get_rememberme_data->execute([$cookie_key]);
        $rememberme_data = $get_rememberme_data->fetch(PDO::FETCH_ASSOC);
    
        if ($rememberme_data) {
            $get_user_data = $pdo->prepare("SELECT * FROM `User` WHERE id = ?");
            $get_user_data->execute([$rememberme_data['user_id']]);
            $user = $get_user_data->fetch(PDO::FETCH_ASSOC);
    
            if ($user) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];

                echo json_encode(["authenticated" => true, "username" => $_SESSION["user_name"]]);
                exit;
            }
        }
        else {
            setcookie($_ENV['REMEMBERME_COOKIE_NAME'], $cookie_key, time() - 3600, "/", "", false, true);
            $remove_rememberme_data = $pdo->prepare("DELETE FROM `RememberMe` WHERE id = ?");
            $remove_rememberme_data->execute([$cookie_key]);
        }
    }
    catch (PDOException $e) { error_log($e->getMessage()); }
}

echo json_encode(["authenticated" => false]);