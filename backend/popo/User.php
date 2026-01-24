<?php

class User {
    private int $id;
    public string $name;
    private string $email;
    private string $password;
    public string $role;

    public function __construct(int $id, string $name, string $email, string $role = 'user', string $password = '', bool $pass_is_plaintext = false) {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->set_password($password, $pass_is_plaintext);
        $this->role = $role;
    }

    public function verify_password(string $password) {
        return password_verify($password, $this->password);
    }

    public function get_id(): int { return $this->id; }
    
    public function get_email(): string { return $this->email; }
    public function set_email(String $email): void { $this->email = $email; }

    public function get_password(): string { return $this->password; }
    public function set_password(String $password, bool $pass_is_plaintext = false): void {
        $this->password = $pass_is_plaintext ? User::hash_password($password) : $password;
    }

    public static function hash_password(String $plaintext_pass): string {
        return password_hash($plaintext_pass, PASSWORD_BCRYPT, ['cost'=> 12]);
    }
}