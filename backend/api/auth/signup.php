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

require __DIR__ . '/../../config/bootstrap.php';
session_start();

if (isset($_SESSION["user"])) {
    http_response_code(403);
    return_error('You are already logged in.');
}

require __DIR__ . '/../../repository/UserRepository.php';
http_response_code(422);

validate_signup_form(
    $_POST['username'], $_POST['email'], 
    $_POST['password'], $_POST['confirm-password']
);

try {
    $new_user = new User(0, $_POST['username'], $_POST['email'], $_POST['password'], true);
    (new UserRepository($pdo))->register_user($new_user);
}
catch (PDOException $e) {
    $uniquekey_violation_statuscode = 23505;
    if ($e->getCode() == $uniquekey_violation_statuscode)
        return_error('Email is already registered');

    error_log($e->getMessage());
    http_response_code(response_code: 500);
    return_error('Sorry! We cannot process your request right now.');
}

http_response_code(201);
echo json_encode(['message' => 'User created successfully!']);
exit;


function validate_signup_form(String $username, String $email, String $password, String $confirm_password) {
    if (!preg_match("/^[A-Za-z0-9_]+$/", $username))
        return_error('Username can only have A-Z, 0-9, and underscore.');
    else if (!filter_var($email, FILTER_VALIDATE_EMAIL))
        return_error('Email is invalid.');
    else if ($password !== $confirm_password)
        return_error('Passwords do not match.');
    else if (strlen($password) < 8)
        return_error('Password must be at least 8 characters.');
    else if (!preg_match("/\d/", $password) || !preg_match("/[A-Z]/", $password))
        return_error('Password must have at least 1 digit and 1 upper-case letter.');
}

function return_error(String $message): void {
    echo json_encode(['error' => $message]);
    exit;
}