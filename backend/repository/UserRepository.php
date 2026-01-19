<?php

require_once(__DIR__ . '/../popo/User.php');

class UserRepository {
    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function register_user(User $user): void {
        $insert_new_user = $this->pdo->prepare('INSERT INTO `User` (name, email, password) VALUES (:name, :email, :password);');
        $insert_new_user->execute([
            'name' => $user->name,
            'email' => $user->get_email(),
            'password' => $user->get_password()
        ]);
    }

    public function get_user_by_id(int $id): mixed {
        $get_user_data = $this->pdo->prepare('SELECT * FROM `User` WHERE id = ?');
        $get_user_data->execute([$id]);

        $data = $get_user_data->fetch(PDO::FETCH_ASSOC);
        return $data ? new User($data['id'], $data['name'], $data['email'], $data['password']) : null;
    }

    public function get_user_by_email(String $email): mixed {
        $get_user_data = $this->pdo->prepare('SELECT * FROM `User` WHERE email = ?');
        $get_user_data->execute([$email]);

        $data = $get_user_data->fetch(PDO::FETCH_ASSOC);
        return $data ? new User($data['id'], $data['name'], $data['email'], $data['password']) : null;
    }

    public function is_email_registered(String $email): bool {
        $check_email = $this->pdo->prepare('SELECT EXISTS (SELECT 1 FROM `User` WHERE email = ?)');
        $check_email->execute([$email]);
        return $check_email->fetch(PDO::FETCH_NUM)[0] ? true : false;
    }
}