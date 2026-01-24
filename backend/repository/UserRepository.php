<?php

require_once(__DIR__ . '/../popo/User.php');

class UserRepository {
    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function register_user(User $user): void {
        $insert_new_user = $this->pdo->prepare('INSERT INTO `User` (name, email, password_hash) VALUES (:name, :email, :password_hash);');
        $insert_new_user->execute([
            'name' => $user->name,
            'email' => $user->get_email(),
            'password_hash' => $user->get_password()
        ]);
    }

    public function get_user_by_id(int $id): mixed {
        $get_user_data = $this->pdo->prepare('SELECT name, email, role FROM `User` WHERE id = ?');
        $get_user_data->execute([$id]);

        $data = $get_user_data->fetch(PDO::FETCH_ASSOC);
        return $data ? new User($id, $data['name'], $data['email'], $data['role']) : null;
    }

    public function get_user_by_email(String $email): mixed {
        $get_user_data = $this->pdo->prepare('SELECT id, name, role, password_hash FROM `User` WHERE email = ?');
        $get_user_data->execute([$email]);

        $data = $get_user_data->fetch(PDO::FETCH_ASSOC);
        return $data ? new User($data['id'], $data['name'], $email, $data['role'], $data['password_hash']) : null;
    }
}