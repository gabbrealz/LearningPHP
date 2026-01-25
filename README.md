# WEBPROG - Act. 1 (Finals)

## Description
A progressive project on web programming with PHP. The project uses
Vite React and Tailwind CSS for the frontend, PHP for the backend,
and MySQL database.

There is more content coming soon, but for now there is only auth.

## How to Set Up

### First, get the following if you haven't already:
- npm
- XAMPP

### Second, clone the project and set up the backend:

1. Clone the GitHub repository:
    ```terminal
    git clone https://github.com/gabbrealz/LearningPHP.git
    ```

2. Create the backend's `.env` file:
    ```
    cd backend
    echo REMEMBERME_COOKIE_NAME=LEARNINGPHP_REMEMBERME_COOKIE > .env
    echo DB_HOST=localhost >> .env
    echo DB_PORT=3306 >> .env
    echo DB_NAME=LearningPHP >> .env
    ```

3. Add DB user configuration in the `.env` file. The backend authenticates to your database as `root` to automatically set it up. After setting up, the backend will authenticate as a different user.

    Please edit the final line by including your DB root user's password (leave as is if your root user's password is blank).
    ```
    echo DB_USER=learningphp_admin >> .env
    echo DB_PASS=le4rn1ngphp_4dm1n_p4$$w0rd >> .env
    echo DB_ROOT_PASS= >> .env
    ```
    <b>If you don't want the backend to use root:</b> Scroll down and follow the instructions under `Manual Database Setup` before running Apache.

4. Create a symbolic link in `xampp/htdocs` pointing to `backend/api` using the commands below (or copy-paste the `backend/api` folder in `xampp/htdocs` and rename it to `php-backend`).
    - Linux
        ```bash
        cd "full/path/to/xampp/htdocs"
        ln -s "full/path/to/LearningPHP/backend/api" php-backend
        ```
    - Windows (Run Command Prompt as Administrator)
        ```Command Prompt
        cd "full/path/to/xampp/htdocs"
        mklink /J php-backend "full/path/to/LearningPHP/backend/api"
        ```

### Third, choose which method you want to set up the frontend:

#### Option A: Running frontend on XAMPP as well

1. Create the frontend's `.env` file:
    ```
    cd frontend
    echo VITE_BACKEND_BASE_URL=http://localhost/php-backend > .env
    ```

2. Starting from the `LearningPHP/frontend` working directory, build the frontend
    ```terminal
    npm install
    npm run build
    ```

3. Create a symbolic link in `xampp/htdocs` pointing to `frontend/dist` using the commands below (or copy-paste the `frontend/dist` folder in `xampp/htdocs` and rename it to `webprog-activity`).
    - Linux
        ```bash
        cd "full/path/to/xampp/htdocs"
        ln -s "full/path/to/LearningPHP/frontend/dist" webprog-activity
        ```
    - Windows (Run Command Prompt as Administrator)
        ```Command Prompt
        cd "full/path/to/xampp/htdocs"
        mklink /J webprog-activity "full/path/to/LearningPHP/frontend/dist"
        ```

#### Option B: Running frontend with Vite's development server

1. Create the frontend's .env file:
    ```
    cd frontend
    echo VITE_BACKEND_BASE_URL=http://localhost/php-backend > .env
    ```

2. Starting from the `LearningPHP/frontend` working directory, run the following:
    ```terminal
    npm install
    npm run dev
    ```

## How To Run
1. Open `XAMPP Control Panel`
2. Start XAMPP's Apache module
3. Start XAMPP's MySQL module
4. Wait for the modules to start running
5. Open a browser and paste the URL depending on which option you chose
    - Option A: `http://localhost/webprog-activity`
    - Option B: `http://localhost:5173`

## Manual Database Setup
1. Open `XAMPP Control Panel`
2. Start XAMPP's MySQL module and wait for the module to start running
3. Click `Shell` at the right side of the Control Panel Window
4. Connect to MySQL via the opened terminal. Include `-p` if your database's root user has a password:
    ```
    mysql -u root [-p]
    ```

5. Create the database and database user:
    ```
    CREATE DATABASE LearningPHP;
    CREATE USER 'learningphp_admin'@'%' IDENTIFIED BY 'le4rn1ngphp_4dm1n_p4$$w0rd';
    GRANT ALL PRIVILEGES ON LearningPHP.* TO 'learningphp_admin'@'%';
    FLUSH PRIVILEGES;
    ```

6. Starting from the `LearningPHP` working directory, do these commands:
    - Windows Command Prompt
        ```Command Prompt
        cd backend/config
        mkdir locks
        cd locks
        type NUL > init-db-fromscratch.done
        ```

    - Linux terminal
        ```terminal
        cd backend/config
        mkdir locks
        cd locks
        touch init-db-fromscratch.done
        ```

    The existence of the `init-db-fromscratch.done` file tells the backend that the database and database user already exist, which stops it from trying to authenticate as `root`. However, table creation and seeding will still be handled by the backend through the created user.