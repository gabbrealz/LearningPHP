# WEBPROG - Act. 1 (Finals)

## Description
A progressive project on web programming with PHP

## How to Run

### First, get the following:
- npm
- php
- XAMPP

### Second, Perform these commands:

1. Clone the GitHub repository:
    ```terminal
    git clone https://github.com/gabbrealz/LearningPHP.git
    ```

1. Starting from the `016_LearningPHP` working directory, build the frontend
    ```terminal
    cd frontend
    echo "VITE_BACKEND_BASE_URL=http://localhost/php-backend" > .env
    npm install
    npm run build
    ```

2. Create symbolic links in `xampp/htdocs` pointing to `backend` and `frontend/build`
    - Linux
        ```bash
        cd "full/path/to/xampp/htdocs"
        ln -s "full/path/to/016_LearningPHP/backend" php-backend
        ln -s "full/path/to/016_LearningPHP/frontend/build" webprog-activity
        ```
    - Windows (Run Command Prompt as Administrator)
        ```Command Prompt
        cd "full/path/to/xampp/htdocs"
        mklink /J php-backend "full/path/to/016_LearningPHP/backend"
        mklink /J webprog-activity "full/path/to/016_LearningPHP/frontend/build"
        ```

3. Run the project
    1. Open `XAMPP Control Panel`
    2. Start Apache
    3. Open a browser and paste this URL: `http://localhost/webprog-activity`