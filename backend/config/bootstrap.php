<?php

require __DIR__ . '/read-env.php';

try {
    $pdo = new PDO("mysql:host={$_ENV['DB_HOST']};port={$_ENV['DB_PORT']}", $_ENV['DB_USER'], $_ENV['DB_PASS']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("CREATE DATABASE IF NOT EXISTS {$_ENV['DB_NAME']};");

    $pdo = new PDO(
        "mysql:host={$_ENV['DB_HOST']};port={$_ENV['DB_PORT']};dbname={$_ENV['DB_NAME']}",
        $_ENV['DB_USER'],
        $_ENV['DB_PASS'],
        [PDO::MYSQL_ATTR_MULTI_STATEMENTS => true]
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $db_init_queries = file_get_contents(__DIR__ . '/db-init.sql');
    $pdo->exec($db_init_queries);
}
catch (PDOException $e) {
    error_log($e->getMessage());
    exit;
}