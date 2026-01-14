# WEBPROG - Act. 1 (Finals)

## Description
A progressive project on web programming with PHP. Right now, it works by running
the React + Tailwind CSS frontend separate from the PHP backend. The frontend
communicates with the PHP backend via fetch calls.

There is more content coming soon, but for now there is only auth.

## How to Set Up

### First, get the following if you haven't already:
- npm
- php
- XAMPP

### Second, clone the project and set up the backend:

1. Clone the GitHub repository:
    ```terminal
    git clone https://github.com/gabbrealz/LearningPHP.git
    ```

2. Create a symbolic link in `xampp/htdocs` pointing to `backend` (or copy-paste the `backend` folder in `xampp/htdocs` and rename it to `php-backend`)
    - Linux
        ```bash
        cd "full/path/to/xampp/htdocs"
        ln -s "full/path/to/016_LearningPHP/backend" php-backend
        ```
    - Windows (Run Command Prompt as Administrator)
        ```Command Prompt
        cd "full/path/to/xampp/htdocs"
        mklink /J php-backend "full/path/to/016_LearningPHP/backend"
        ```

## Third, choose which method you want to set up the frontend:

### Option A: Running frontend on XAMPP as well

1. Starting from the `016_LearningPHP` working directory, build the frontend
    ```terminal
    cd frontend
    echo "VITE_BACKEND_BASE_URL=http://localhost/php-backend" > .env
    npm install
    npm run build
    ```

2. Create a symbolic link in `xampp/htdocs` pointing to `frontend/dist` (or copy-paste the `frontend/dist` folder in `xampp/htdocs` and rename it to `webprog-activity`)
    - Linux
        ```bash
        cd "full/path/to/xampp/htdocs"
        ln -s "full/path/to/016_LearningPHP/frontend/dist" webprog-activity
        ```
    - Windows (Run Command Prompt as Administrator)
        ```Command Prompt
        cd "full/path/to/xampp/htdocs"
        mklink /J webprog-activity "full/path/to/016_LearningPHP/frontend/dist"
        ```

### Option B: Running frontend with Vite's development server

1. Starting from the `016_LearningPHP` working directory, run the development server
    ```terminal
    cd frontend
    npm run dev
    ```

## How to Run
1. Open `XAMPP Control Panel`
2. Start Apache
3. Open a browser and paste the URL depending on which option you chose
    - Option A: `http://localhost/webprog-activity`
    - Option B: `http://localhost:5173`