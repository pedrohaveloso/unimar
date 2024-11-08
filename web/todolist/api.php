<?php

session_start();

$jsonData = json_decode(file_get_contents('php://input'), true);
$queryData = $_GET;

if (
    empty($_SESSION['token'])
    || empty($_GET['token'])
    || $_SESSION['token'] !== $_GET['token']
) {
    http_response_code(401) && exit;
}

function connectDB(): mysqli
{
    $host = 'localhost:3306';
    $user = 'root';
    $password = '';
    $database = 'TodoList';

    $conn = mysqli_connect($host, $user, $password, $database);

    if (!$conn) {
        exit;
    }

    register_shutdown_function(function () use ($conn): void {
        mysqli_close($conn);
    });

    return $conn;
}

function jsonResponse(array $json, int $httpCode = 200): void
{
    http_response_code($httpCode);
    echo json_encode($json);
    exit;
}

$conn = connectDB();

header('Content-Type: application/json');

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'list': {
        $query = <<<SQL
            SELECT * FROM `Task` ORDER BY `limitDate` ASC;
        SQL;

        $result = mysqli_query($conn, $query);
        $tasks = mysqli_fetch_all($result, MYSQLI_ASSOC);

        jsonResponse($tasks);
    }

    case 'create': {
        $name = mysqli_real_escape_string($conn, $jsonData['name']);
        $description = mysqli_real_escape_string($conn, $jsonData['description']);
        $status = mysqli_real_escape_string($conn, $jsonData['status']);
        $limitDate = mysqli_real_escape_string($conn, $jsonData['limitDate']);

        $query = <<<SQL
            INSERT 
                INTO `Task` (`name`, `description`, `status`, `limitDate`) 
                VALUES ('$name', '$description', '$status', '$limitDate');
        SQL;

        $result = (bool) mysqli_query($conn, $query);

        jsonResponse(['success' => $result]);
    }

    case 'update': {
        $id = mysqli_real_escape_string($conn, $jsonData['id']);
        $name = mysqli_real_escape_string($conn, $jsonData['name']);
        $description = mysqli_real_escape_string($conn, $jsonData['description']);
        $status = mysqli_real_escape_string($conn, $jsonData['status']);
        $limitDate = mysqli_real_escape_string($conn, $jsonData['limitDate']);

        $query = <<<SQL
            UPDATE `Task` 
                SET `name` = '$name', 
                    `description` = '$description', 
                    `status` = '$status', 
                    `limitDate` = '$limitDate'
                WHERE `id` = $id;
        SQL;

        $result = (bool) mysqli_query($conn, $query);

        jsonResponse(['success' => $result]);
    }

    case 'delete': {
        $id = mysqli_real_escape_string($conn, $queryData['id']);

        $query = <<<SQL
            DELETE FROM `Task` WHERE `id` = $id;
        SQL;

        $result = (bool) mysqli_query($conn, $query);

        jsonResponse(['success' => $result]);
    }

    default: {
        jsonResponse(['error' => 'Rota não encontrada'], 400);
    }
}