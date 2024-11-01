<?php

$host = 'localhost:3306';
$user = 'root';
$password = 'dev';
$database = 'TodoList';

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

header('Content-Type: application/json');

$action = $_GET['action'] ?? '';
$data = json_decode(file_get_contents('php://input'), true);

switch ($action) {
    case 'list':
        $query = "SELECT * FROM tasks ORDER BY limit_date ASC";
        $result = mysqli_query($conn, $query);
        $tasks = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($tasks);
        break;

    case 'create':
        $name = mysqli_real_escape_string($conn, $data['name']);
        $description = mysqli_real_escape_string($conn, $data['description']);
        $status = mysqli_real_escape_string($conn, $data['status']);
        $limit_date = mysqli_real_escape_string($conn, $data['limit_date']);

        $query = "INSERT INTO tasks (name, description, status, limit_date) 
                 VALUES ('$name', '$description', '$status', '$limit_date')";

        mysqli_query($conn, $query);
        echo json_encode(['success' => true]);
        break;

    case 'update':
        $id = mysqli_real_escape_string($conn, $data['id']);
        $name = mysqli_real_escape_string($conn, $data['name']);
        $description = mysqli_real_escape_string($conn, $data['description']);
        $status = mysqli_real_escape_string($conn, $data['status']);
        $limit_date = mysqli_real_escape_string($conn, $data['limit_date']);

        $query = "UPDATE tasks 
                 SET name = '$name', 
                     description = '$description', 
                     status = '$status', 
                     limit_date = '$limit_date'
                 WHERE id = $id";

        mysqli_query($conn, $query);
        echo json_encode(['success' => true]);
        break;

    case 'delete':
        $id = mysqli_real_escape_string($conn, $data['id']);
        $query = "DELETE FROM tasks WHERE id = $id";
        mysqli_query($conn, $query);
        echo json_encode(['success' => true]);
        break;

    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
}

mysqli_close($conn);
exit;