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

2. Create the backend's .env file:
    ```
    cd backend
    echo "REMEMBERME_COOKIE_NAME=LEARNINGPHP_REMEMBERME_COOKIE" > .env
    echo "DB_HOST=localhost" >> .env
    echo "DB_PORT=3306" >> .env
    echo "DB_NAME=LearningPHP" >> .env
    echo "DB_USER=root" >> .env
    echo "DB_PASS=" >> .env
    ```

3. Create a symbolic link in `xampp/htdocs` pointing to `backend/api` (or copy-paste the `backend/api` folder in `xampp/htdocs` and rename it to `php-backend`)
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

1. Create the frontend's .env file:
    ```
    cd frontend
    echo "VITE_BACKEND_BASE_URL=http://localhost/php-backend" > .env
    ```

#### Option A: Running frontend on XAMPP as well

2. Starting from the `LearningPHP/frontend` working directory, build the frontend
    ```terminal
    npm install
    npm run build
    ```

3. Create a symbolic link in `xampp/htdocs` pointing to `frontend/dist` (or copy-paste the `frontend/dist` folder in `xampp/htdocs` and rename it to `webprog-activity`)
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

1. Starting from the `LearningPHP/frontend` working directory, run the following:
    ```terminal
    npm install
    npm run dev
    ```

## How to Run
1. Open `XAMPP Control Panel`
2. Start XAMPP's Apache module
3. Start XAMPP's MySQL module
4. Open a browser and paste the URL depending on which option you chose
    - Option A: `http://localhost/webprog-activity`
    - Option B: `http://localhost:5173`