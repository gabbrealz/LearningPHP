<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") exit;
if ($_SERVER['REQUEST_METHOD'] !== "POST") {
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

if (!preg_match("/^[A-Za-z0-9_]+$/", $_POST["username"])) {
    echo json_encode(["error" => "Username can only have A-Z, 0-9, and underscore."]);
    exit;
}
else if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "Email is invalid."]);
    exit;
}
else if ($_POST["password"] !== $_POST["confirm-password"]) {
    echo json_encode(["error" => "Passwords do not match."]);
    exit;
}
else if (strlen($_POST["password"]) < 8) {
    echo json_encode(["error" => "Password must be at least 8 characters."]);
    exit;
}
else if (!preg_match("/\d/", $_POST["password"]) || !preg_match("/[A-Z]/", $_POST["password"])) {
    echo json_encode(["error" => "Password must have at least 1 digit and 1 upper-case letter."]);
    exit;
}

try {
    $check_email = $pdo->prepare('SELECT EXISTS (SELECT 1 FROM `User` WHERE email = ?)');
    $check_email->execute([$_POST['email']]);

    if ($check_email->fetch(PDO::FETCH_NUM)[0]) {
        echo json_encode(["error" => "Email is already registered."]);
        exit;
    }

    $insert_new_user = $pdo->prepare('INSERT INTO `User` (name, email, password) VALUES (:name, :email, :password);');
    $insert_new_user->execute([
        'name' => $_POST['username'],
        'email'=> $_POST['email'],
        'password'=> password_hash($_POST['password'], PASSWORD_BCRYPT, ['cost' => 12])
    ]);
}
catch (PDOException $e) {
    error_log($e->getMessage());
    echo json_encode(["error" => "Sorry! We cannot process your request right now."]);
    exit;
}

http_response_code(201);
echo json_encode(["message" => "User created successfully!"]);