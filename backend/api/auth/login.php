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

if (isset($_SESSION["user_id"])) {
    http_response_code(403);
    echo json_encode(["error" => "You are already logged in."]);
    exit;
}

http_response_code(422);

try {
    $get_user_data = $pdo->prepare('SELECT * FROM `User` WHERE email = ?');
    $get_user_data->execute([$_POST['email']]);
    $user_data = $get_user_data->fetch(PDO::FETCH_ASSOC);

    if ($user_data && password_verify($_POST['password'], $user_data['password'])) {
        $_SESSION['user_id'] = $user_data['id'];
        $_SESSION['user_name'] = $user_data['name'];

        if (isset($_POST['remember-me'])) {
            $rememberme_cookie_key = generate_uuid_v4();
            $expiry_timestamp = time() + 60*60*24*7;

            $put_rememberme_data = $pdo->prepare('INSERT INTO `RememberMe` VALUES (:cookie_key, :user_id, :expiry_timestamp);');
            $put_rememberme_data->execute([
                'cookie_key' => $rememberme_cookie_key,
                'user_id' => $user_data['id'],
                'expiry_timestamp' => $expiry_timestamp
            ]);

            setcookie($_ENV['REMEMBERME_COOKIE_NAME'], $rememberme_cookie_key, $expiry_timestamp, "/", "", false, true);
        }

        http_response_code(200);
        echo json_encode(["username" => $user_data["name"], "message" => "Successfully logged in!"]);
        exit;
    }
}
catch (PDOException $e) {
    error_log($e->getMessage());
    echo json_encode(["error" => "Sorry! We cannot process your request right now."]);
    exit;
}

echo json_encode(["error" => "Incorrect email or password."]);


function generate_uuid_v4() {
    $data = random_bytes(16);
    
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}