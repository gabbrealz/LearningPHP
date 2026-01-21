<?php

class RememberMeTokenRepository {
    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function get_rememberme_data() {
        $cookie_key = $_COOKIE[$_ENV['REMEMBERME_COOKIE_NAME']];
        
        $get_rememberme_data = $this->pdo->prepare("SELECT * FROM `RememberMeToken` WHERE id = ?");
        $get_rememberme_data->execute([$cookie_key]);

        return $get_rememberme_data->fetch(PDO::FETCH_ASSOC);
    }

    public function add_rememberme(int $user_id): void {
        $rememberme_cookie_key = RememberMeTokenRepository::generate_uuid_v4();
        $expiry_timestamp = time() + 60*60*24*7;

        $put_rememberme_data = $this->pdo->prepare('INSERT INTO `RememberMeToken` VALUES (:cookie_key, :user_id, :expiry_timestamp);');
        $put_rememberme_data->execute([
            'cookie_key' => $rememberme_cookie_key,
            'user_id' => $user_id,
            'expiry_timestamp' => $expiry_timestamp
        ]);

        setcookie($_ENV['REMEMBERME_COOKIE_NAME'], $rememberme_cookie_key, $expiry_timestamp, "/", "", false, true);
    }

    public function remove_rememberme(): void {
        $cookie_key = $_COOKIE[$_ENV['REMEMBERME_COOKIE_NAME']];

        $remove_rememberme_data = $this->pdo->prepare('DELETE FROM `RememberMeToken` WHERE id = ?');
        $remove_rememberme_data->execute([$cookie_key]);
        
        setcookie($_ENV['REMEMBERME_COOKIE_NAME'], $cookie_key, time() - 3600, "/", "", false, true);
    }

    public static function generate_uuid_v4(): string {
        $data = random_bytes(16);
        
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
}