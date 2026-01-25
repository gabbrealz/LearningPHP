<?php

$stmt = $pdo->prepare('INSERT INTO `User` (name, email, password_hash, role) VALUES (:name, :email, :password, :role)');
$stmt->execute([
    'name' => 'christian',
    'email' => 'christian@learningphp.com',
    'password'=> password_hash('1234567A', PASSWORD_BCRYPT, ['cost' => 12]),
    'role' => 'admin',
]);

$passwordHash = password_hash('QWERTYUI1', PASSWORD_BCRYPT, ['cost' => 12]);
$params = [
    ['name' => 'alice',   'email' => 'alice@example.com',   'password' => $passwordHash, 'role' => 'employee'],
    ['name' => 'bob',     'email' => 'bob@example.com',     'password' => $passwordHash, 'role' => 'employee'],
    ['name' => 'charlie', 'email' => 'charlie@example.com', 'password' => $passwordHash, 'role' => 'employee'],
    ['name' => 'david',   'email' => 'david@example.com',   'password' => $passwordHash, 'role' => 'employee'],
    ['name' => 'emma',    'email' => 'emma@example.com',    'password' => $passwordHash, 'role' => 'employee'],
    ['name' => 'frank',   'email' => 'frank@example.com',   'password' => $passwordHash, 'role' => 'employee'],
    ['name' => 'grace',   'email' => 'grace@example.com',   'password' => $passwordHash, 'role' => 'employee'],
    ['name' => 'henry',   'email' => 'henry@example.com',   'password' => $passwordHash, 'role' => 'employee'],
    ['name' => 'irene',   'email' => 'irene@example.com',   'password' => $passwordHash, 'role' => 'user'],
    ['name' => 'jack',    'email' => 'jack@example.com',    'password' => $passwordHash, 'role' => 'user'],
    ['name' => 'kate',    'email' => 'kate@example.com',    'password' => $passwordHash, 'role' => 'user'],
    ['name' => 'liam',    'email' => 'liam@example.com',    'password' => $passwordHash, 'role' => 'user'],
    ['name' => 'mia',     'email' => 'mia@example.com',     'password' => $passwordHash, 'role' => 'user'],
    ['name' => 'noah',    'email' => 'noah@example.com',    'password' => $passwordHash, 'role' => 'user'],
    ['name' => 'olivia',  'email' => 'olivia@example.com',  'password' => $passwordHash, 'role' => 'user'],
    ['name' => 'paul',    'email' => 'paul@example.com',    'password' => $passwordHash, 'role' => 'user'],
    ['name' => 'quinn',   'email' => 'quinn@example.com',   'password' => $passwordHash, 'role' => 'user'],
    ['name' => 'rachel',  'email' => 'rachel@example.com',  'password' => $passwordHash, 'role' => 'user'],
    ['name' => 'steve',   'email' => 'steve@example.com',   'password' => $passwordHash, 'role' => 'user'],
    ['name' => 'tina',    'email' => 'tina@example.com',    'password' => $passwordHash, 'role' => 'user'],
];

foreach ($params as $param) {
    $stmt->execute($param);
}